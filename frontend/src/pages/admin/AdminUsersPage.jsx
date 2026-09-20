import React, { useState, useEffect } from "react";
import { Users, Search, ShoppingBag, ShieldCheck, Mail, Calendar } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import { Input } from "../../components/common/Input";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([
    {
      id: "cust-101",
      name: "Aria Chen",
      email: "aria.chen@joyory.com",
      createdAt: "2026-05-14",
      ordersCount: 4,
      totalSpend: 4890,
      skinType: "Combination",
      status: "Active"
    },
    {
      id: "cust-102",
      name: "Rohan Verma",
      email: "rohan.v@example.com",
      createdAt: "2026-06-20",
      ordersCount: 2,
      totalSpend: 1980,
      skinType: "Oily",
      status: "Active"
    },
    {
      id: "cust-103",
      name: "Pooja Sharma",
      email: "pooja.sharma@example.com",
      createdAt: "2026-07-02",
      ordersCount: 3,
      totalSpend: 3450,
      skinType: "Sensitive",
      status: "Active"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await apiClient.get("/admin/users");
        if (res && res.data && res.data.length > 0) {
          setUsers(res.data);
        }
      } catch (err) {
        console.warn("Using fallback users list");
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Customer Directory
        </h1>
        <p className="text-xs text-stone-500">
          View registered customer accounts and order history.
        </p>
      </div>

      <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search by customer name or email..."
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
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Skin Profile</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Total Spend</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{user.name}</div>
                      <div className="text-[10px] text-stone-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                      {user.skinType || "Combination"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "May 2026"}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                    {user.ordersCount || 1}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                    ₹{user.totalSpend || 1200}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                      Active
                    </span>
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
