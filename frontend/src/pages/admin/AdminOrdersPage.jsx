import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, Package, XCircle } from "lucide-react";
import { orderService } from "../../services/orderService";
import { useNotification } from "../../context/NotificationContext";
import { Input } from "../../components/common/Input";

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToast } = useNotification();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err) {
      addToast("Failed to load orders.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      addToast(`Order ${orderId} updated to ${newStatus}`, "success");
      setOrders(prev =>
        prev.map(o => (o.id === orderId || o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      addToast(err.message || "Failed to update status", "error");
    }
  };

  const filteredOrders = orders.filter(o => {
    const id = o.orderId || o.id || "";
    const customer = o.user?.name || o.shippingAddress?.fullName || "";
    return id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Customer Orders
        </h1>
        <p className="text-xs text-stone-500">
          View customer orders and update delivery status.
        </p>
      </div>

      <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search by Order ID or Customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 dark:bg-stone-950/60 text-stone-500 border-b border-stone-200/80 dark:border-stone-800/80">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {filteredOrders.map((order) => (
                <tr key={order.id || order.orderId} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-stone-900 dark:text-stone-100">
                    {order.orderId || order.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-900 dark:text-stone-100">
                      {order.user?.name || order.shippingAddress?.fullName || "Aria Chen"}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {order.shippingAddress?.city || "Bengaluru"}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-stone-600 dark:text-stone-300">
                      {order.items?.length || 1} item(s)
                    </span>
                    <div className="text-[10px] text-stone-400 truncate max-w-[180px]">
                      {order.items?.[0]?.name || "HydraGel Ultra-Light"}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3 px-4 uppercase text-[10px] text-stone-500 font-medium">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : "Demo Paid"}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status || "Confirmed"}
                      onChange={(e) => handleStatusChange(order.id || order.orderId, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:border-[#C26D53]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
