// Mock orders with feedback hooks for continuous learning loop

export const initialOrders = [
  {
    id: "JOY-10492",
    orderId: "JOY-10492",
    userId: "cust-101",
    user: {
      id: "cust-101",
      name: "Aria Chen",
      email: "aria.chen@joyory.com"
    },
    date: "16 Sep 2026",
    orderDate: "16 Sep 2026",
    status: "Delivered",
    deliveredDate: "18 Sep 2026",
    totalAmount: 699,
    product: {
      id: "prod-4",
      name: "Invisible Water SPF 50+ Sun Gel",
      brand: "Joyory Labs",
      image: "https://images.unsplash.com/photo-1567928815117-69b56f8f0729?w=600&auto=format&fit=crop&q=80",
      price: 699,
      size: "50ml",
      texture: "Water-gel"
    },
    items: [
      {
        productId: "prod-4",
        id: "prod-4",
        name: "Invisible Water SPF 50+ Sun Gel",
        brand: "Joyory Labs",
        image: "https://images.unsplash.com/photo-1567928815117-69b56f8f0729?w=600&auto=format&fit=crop&q=80",
        price: 699,
        quantity: 1,
        size: "50ml",
        texture: "Water-gel"
      }
    ],
    hasFeedback: false
  },
  {
    id: "JOY-1023",
    orderId: "JOY-1023",
    userId: "cust-101",
    user: {
      id: "cust-101",
      name: "Aria Chen",
      email: "aria.chen@joyory.com"
    },
    date: "10 Sep 2026",
    orderDate: "10 Sep 2026",
    status: "Delivered",
    deliveredDate: "12 Sep 2026",
    totalAmount: 649,
    product: {
      id: "prod-1",
      name: "HydraGel Ultra-Light Moisturizer",
      brand: "Joyory Labs",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      price: 649,
      size: "50ml",
      texture: "Gel"
    },
    items: [
      {
        productId: "prod-1",
        id: "prod-1",
        name: "HydraGel Ultra-Light Moisturizer",
        brand: "Joyory Labs",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
        price: 649,
        quantity: 1,
        size: "50ml",
        texture: "Gel"
      }
    ],
    hasFeedback: true,
    feedbackGiven: {
      rating: 4,
      texture: "Slightly Heavy",
      fragrance: "None",
      application: "Fast absorbing",
      comment: "Feels slightly heavy during peak afternoon heat. Good hydration, but looking for an even lighter formulation."
    }
  },
  {
    id: "JOY-09874",
    orderId: "JOY-09874",
    userId: "cust-101",
    user: {
      id: "cust-101",
      name: "Aria Chen",
      email: "aria.chen@joyory.com"
    },
    date: "28 Aug 2026",
    orderDate: "28 Aug 2026",
    status: "Delivered",
    deliveredDate: "31 Aug 2026",
    totalAmount: 499,
    product: {
      id: "prod-8",
      name: "Amino Acid Gentle Foaming Cleanser",
      brand: "Joyory Labs",
      image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?w=600&auto=format&fit=crop&q=80",
      price: 499,
      size: "150ml",
      texture: "Foaming Gel"
    },
    items: [
      {
        productId: "prod-8",
        id: "prod-8",
        name: "Amino Acid Gentle Foaming Cleanser",
        brand: "Joyory Labs",
        image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?w=600&auto=format&fit=crop&q=80",
        price: 499,
        quantity: 1,
        size: "150ml",
        texture: "Foaming Gel"
      }
    ],
    hasFeedback: true,
    feedbackGiven: {
      rating: 5,
      texture: "Gentle cloud",
      fragrance: "Clean green tea",
      application: "Mild & non-stripping",
      comment: "Leaves skin soft without that tight squeaky feeling. Holy grail cleanser for my oily T-zone."
    }
  }
];
