// Comprehensive End-to-End Verification Test Script
// Tests: MongoDB Sync, User Data Isolation, Admin CRUD, Outcome Loop, Journey Events

const API_BASE = "http://localhost:5000/api";

async function post(url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function get(url, token) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${url}`, { headers });
  return await res.json();
}

async function put(url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${url}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function del(url, token) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${url}`, { method: "DELETE", headers });
  return await res.json();
}

async function runTests() {
  console.log("=================================================");
  console.log("  STARTING COMPLETE HACKATHON VERIFICATION SUITE ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, desc) {
    if (condition) {
      console.log(`[PASS] ${desc}`);
      passed++;
    } else {
      console.error(`[FAIL] ${desc}`);
      failed++;
    }
  }

  try {
    // 1. Health Check
    const health = await get("/health");
    assert(health.status === "ok", "API Health check is healthy and operational");

    // 2. Demo Admin Login
    const adminLogin = await post("/auth/login", {
      email: "admin@joyory.com",
      password: "Admin@Joyory2026"
    });
    assert(adminLogin.success && adminLogin.data.token, "Demo Admin login successful");
    const adminToken = adminLogin.data.token;

    // 3. Demo Customer Login (Aria Chen)
    const ariaLogin = await post("/auth/login", {
      email: "aria.chen@joyory.com",
      password: "Customer@Joyory2026"
    });
    assert(ariaLogin.success && ariaLogin.data.user.name === "Aria Chen", "Demo Customer Aria Chen login successful");
    const ariaToken = ariaLogin.data.token;

    // 4. Register NEW Customer A
    const custAEmail = `cust_a_${Date.now()}@example.com`;
    const regA = await post("/auth/register", {
      name: "Customer A",
      email: custAEmail,
      password: "Password@123",
      confirmPassword: "Password@123"
    });
    assert(regA.success && regA.data.user.name === "Customer A", "New Customer A registered independently in MongoDB");
    const tokenA = regA.data.token;

    // 5. Register NEW Customer B
    const custBEmail = `cust_b_${Date.now()}@example.com`;
    const regB = await post("/auth/register", {
      name: "Customer B",
      email: custBEmail,
      password: "Password@123",
      confirmPassword: "Password@123"
    });
    assert(regB.success && regB.data.user.name === "Customer B", "New Customer B registered independently in MongoDB");
    const tokenB = regB.data.token;

    // 6. Verify Customer A starts with clean data
    const wishA_initial = await get("/wishlist", tokenA);
    const cartA_initial = await get("/cart", tokenA);
    const ordersA_initial = await get("/orders", tokenA);
    const journeyA_initial = await get("/journey", tokenA);

    assert(wishA_initial.data.length === 0, "Customer A starts with EMPTY wishlist (no Aria Chen leak)");
    assert(cartA_initial.data.items.length === 0, "Customer A starts with EMPTY cart (no Aria Chen leak)");
    assert(ordersA_initial.data.length === 0, "Customer A starts with ZERO orders (no Aria Chen leak)");
    assert(journeyA_initial.data.length === 0, "Customer A starts with EMPTY journey (no Aria Chen leak)");

    // 7. Get catalog products from MongoDB
    const catalog = await get("/products");
    assert(catalog.success && catalog.count >= 38, `Catalog loads ${catalog.count} products from MongoDB`);
    const prod1 = catalog.data[0];
    const prod2 = catalog.data[1];

    // 8. Customer A adds Product 1 to Wishlist
    const addWishA = await post("/wishlist/toggle", { productId: prod1._id }, tokenA);
    assert(addWishA.success && addWishA.data.length === 1, "Customer A saved Product 1 to Wishlist in MongoDB");

    // 9. Verify Customer B Wishlist ISOLATION
    const wishB = await get("/wishlist", tokenB);
    assert(wishB.data.length === 0, "Customer B CANNOT see Customer A's wishlist items (100% isolated)");

    // 10. Customer A adds Product 1 to Cart and Places Order
    await post("/cart", { productId: prod1._id, quantity: 1 }, tokenA);
    const orderPayload = {
      items: [{ productId: prod1._id, quantity: 1 }],
      shippingAddress: {
        fullName: "Customer A",
        phone: "9876543210",
        address: "742 Evergreen Terrace",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001"
      },
      paymentMethod: "cod"
    };
    const orderA = await post("/orders", orderPayload, tokenA);
    assert(orderA.success && orderA.data.orderId, `Customer A placed order ${orderA.data.orderId} in MongoDB`);

    // 11. Verify Customer A Cart was cleared after order creation
    const cartA_afterOrder = await get("/cart", tokenA);
    assert(cartA_afterOrder.data.items.length === 0, "Customer A cart was automatically cleared after checkout");

    // 12. Verify Customer B Orders ISOLATION
    const ordersB = await get("/orders", tokenB);
    assert(ordersB.data.length === 0, "Customer B CANNOT see Customer A's orders (100% isolated)");

    // 13. Verify Customer A sees their own order
    const ordersA = await get("/orders", tokenA);
    assert(ordersA.data.length === 1 && ordersA.data[0].orderId === orderA.data.orderId, "Customer A sees ONLY their own order");

    // 14. Verify PURCHASE event logged in Customer A's Journey
    const journeyA_afterOrder = await get("/journey", tokenA);
    assert(journeyA_afterOrder.data.some(ev => ev.type === "PURCHASE"), "Customer A Journey recorded real PURCHASE event");

    // 15. Admin updates Customer A's Order Status in MongoDB
    const updateStatus = await put(`/orders/${orderA.data.orderId}/status`, { status: "Shipped" }, adminToken);
    assert(updateStatus.success && updateStatus.data.status === "Shipped", "Admin updated order status to 'Shipped' in MongoDB");

    // 16. Customer A fetches order and sees updated status
    const ordersA_afterAdminUpdate = await get("/orders", tokenA);
    assert(ordersA_afterAdminUpdate.data[0].status === "Shipped", "Customer A immediately sees 'Shipped' status from MongoDB");

    // 17. Customer A submits Outcome Feedback for the purchased product
    const outcomeList = await get("/beauty-outcomes", tokenA);
    assert(outcomeList.data.length > 0, "Beauty Outcome record created automatically for Customer A");
    const outcomeId = outcomeList.data[0]._id;

    const feedbackRes = await put(`/beauty-outcomes/${outcomeId}/feedback`, {
      feedback: {
        textureFeel: "Feels lighter than expected",
        overallRating: 5,
        comments: "Absorbs instantly and keeps skin balanced all day."
      }
    }, tokenA);
    assert(feedbackRes.success, "Customer A submitted Experience Feedback stored in MongoDB");

    // 18. Verify FEEDBACK event in Customer A Journey
    const journeyA_afterFeedback = await get("/journey", tokenA);
    assert(journeyA_afterFeedback.data.some(ev => ev.type === "FEEDBACK"), "Feedback automatically added to Beauty Journey timeline");

    // 19. Admin creates a new product in MongoDB
    const newProductPayload = {
      name: "Squalane Moisture Burst Barrier Cream",
      brand: "Joyory Labs",
      category: "Skincare",
      subcategory: "Moisturizer",
      price: 699,
      mrp: 849,
      stock: 40,
      texture: "Water Gel",
      finish: "Natural",
      skinTypes: ["Dry", "Sensitive"],
      description: "Olive-derived squalane restorative cream.",
      images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"]
    };
    const prodCreated = await post("/products", newProductPayload, adminToken);
    assert(prodCreated.success && prodCreated.data._id, "Admin created new product in MongoDB");
    const newProdId = prodCreated.data._id;

    // 20. Customer views Discover and finds the new product
    const prodCheckCustomer = await get(`/products/${newProdId}`);
    assert(prodCheckCustomer.success && prodCheckCustomer.data.price === 699, "Customer side immediately sees new product from MongoDB");

    // 21. Admin updates price & stock of the new product
    await put(`/products/${newProdId}`, { price: 649, stock: 35 }, adminToken);
    const prodUpdatedCheck = await get(`/products/${newProdId}`);
    assert(prodUpdatedCheck.data.price === 649 && prodUpdatedCheck.data.stock === 35, "Customer sees updated price (₹649) and stock (35) synced from MongoDB");

    // 22. Clean up test product
    await del(`/products/${newProdId}`, adminToken);
    const prodAfterDelete = await get("/products");
    assert(prodAfterDelete.count === catalog.count, "Admin deleted test product, catalog restored to exact 38 products");

    // 23. Admin Overview Dashboard Stats
    const stats = await get("/admin/stats", adminToken);
    assert(stats.data.totalProducts === 38, `Admin Stats Total Products: ${stats.data.totalProducts} (Real from MongoDB)`);
    assert(stats.data.totalCustomers >= 3, `Admin Stats Total Customers: ${stats.data.totalCustomers} (Real from MongoDB)`);
    assert(stats.data.totalOrders >= 2, `Admin Stats Total Orders: ${stats.data.totalOrders} (Real from MongoDB)`);

    console.log("\n=================================================");
    console.log(`  ALL TESTS COMPLETED: ${passed} PASSED, ${failed} FAILED `);
    console.log("=================================================\n");

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error("[TEST RUNNER ERROR]:", err);
    process.exit(1);
  }
}

runTests();
