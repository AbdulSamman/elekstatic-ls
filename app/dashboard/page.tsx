"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Settings, PieChart, Users, Menu, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useContext } from "react";
import { AppContext } from "../AppContext";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 300 },
  { name: "Apr", sales: 200 },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { fillDashbaord } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", icon: <PieChart size={16} />, href: "#dashboard" },
    { name: "Sales", icon: <Check size={16} />, href: "#sales" },
    { name: "Customers", icon: <Users size={16} />, href: "#customers" },
    { name: "Orders", icon: <Check size={16} />, href: "#orders" },
    { name: "Settings", icon: <Settings size={16} />, href: "#settings" },
  ];

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex mt-16 pb-8 relative">
      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-neutral-900 border-r border-neutral-800 p-4
          transition-all duration-300 overflow-hidden
          min-h-screen

          /* Desktop – UNVERÄNDERT */
          md:static
          ${menuOpen ? "md:w-50" : "md:w-14"}

          /* Mobile ONLY */
          fixed md:relative
          top-16 left-0 z-40
          w-64
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col items-start">
          {/* Sidebar Toggle – Desktop */}
          <div className="flex justify-between items-start mb-6">
            <Button
              onClick={handleMenuToggle}
              className="bg-transparent p-0 hidden md:flex"
              style={{ padding: 0 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {menuOpen && (
            <h2 className="text-xl font-semibold py-4">Navigation</h2>
          )}

          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {item.icon}
                {menuOpen && <span>{item.name}</span>}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMenuOpen(true)}
              className="md:hidden bg-transparent p-0"
            >
              <Menu size={28} />
            </Button>

            <h1 className="text-3xl font-bold">BOFFMAN LS DASHBOARD</h1>
          </div>

          <nav className="flex gap-4">
            <Button variant="outline" className="bg-transparent">
              <Users size={16} /> Users
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Settings size={16} /> Settings
            </Button>
          </nav>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                <PieChart size={16} /> Sales
              </h3>
              <p className="mt-2 text-2xl text-white">$12,430</p>
              <p className="text-sm text-neutral-400">Total sales this month</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                <Users size={16} /> Customers
              </h3>
              <p className="mt-2 text-2xl text-white">1,240</p>
              <p className="text-sm text-neutral-400">Active customers</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                <Check size={16} /> Orders
              </h3>
              <p className="mt-2 text-2xl text-orange-500">
                {fillDashbaord.length}
              </p>
              <p className="text-sm text-neutral-400">Pending orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        <Card className="bg-neutral-900 border-neutral-800 mb-10" id="sales">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-white mb-4">
              Monthly Sales
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders List */}
        {fillDashbaord.length === 0 ? (
          <div className="text-center text-neutral-400">No orders yet.</div>
        ) : (
          fillDashbaord.map((order: any, i: number) => (
            <div key={i} className="mb-4 p-4 border rounded bg-neutral-900/20">
              <div>
                <strong>User:</strong> {order.userName} ({order.email})
              </div>
              <div>
                <strong>Status:</strong> {order.orderStatus}
              </div>
              <div>
                <strong>Orders:</strong>
              </div>

              <ul className="ml-4 mt-2">
                {order.items?.map((productItem: any, idx: number) => (
                  <li
                    key={idx}
                    className="mb-3 p-2 border rounded bg-neutral-800/40"
                  >
                    <div className="flex items-center gap-4">
                      {productItem.product.banner?.url && (
                        <img
                          src={productItem.product.banner.url}
                          alt={productItem.product.title}
                          className="w-20 h-20 object-contain rounded"
                        />
                      )}
                      <div>
                        <h2 className="text-xl text-slate-700">
                          {productItem.product.title}
                        </h2>
                        <span>
                          <div className="flex items-center justify-start gap-4">
                            <strong className="text-orange-600">
                              Quanty:{" "}
                            </strong>{" "}
                            <span className="text-slate-600">
                              {productItem.qty}x
                            </span>
                          </div>
                        </span>
                        {productItem?.product?.lieferStatus === "Sofort" ? (
                          <div className="flex items-center justify-start gap-2 pt-2">
                            <div className="w-2 h-2 bg-green-800 rounded-full"></div>
                            <span className="text-green-800 text-xs py-2">
                              Auf Lagerd
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start">
                            <div className="flex items-center justify-start gap-2 pt-2">
                              <div className="w-2 h-2 bg-red-800 rounded-full"></div>
                              <span className="text-red-800 text-xs">
                                Vorbestellung:
                              </span>
                            </div>
                            <span className="text-red-800 text-xs py-2 px-4">
                              Lieferzeit kann 14 bis 28 Arbeitstage dauern
                            </span>
                          </div>
                        )}
                        <div className="mt-1">
                          {productItem?.product?.lieferStatus ===
                            "Vorbestellung" && (
                            <strong className="text-green-300">
                              Selected Options:
                            </strong>
                          )}
                          <ul className="mt-1">
                            {productItem.selectedOptions?.map(
                              (option: any, oIdx: number) => (
                                <li
                                  key={oIdx}
                                  className="text-sm text-slate-600 flex gap-2"
                                >
                                  <p className="text-neutral-600 w-20">
                                    {option.title}:
                                  </p>{" "}
                                  {option.label}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
