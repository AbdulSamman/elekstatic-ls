"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Mail, Settings, PieChart, Users, Menu, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 200 },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <PieChart size={16} />, href: "#dashboard" },
    { name: "Sales", icon: <Check size={16} />, href: "#sales" },
    { name: "Customers", icon: <Users size={16} />, href: "#customers" },
    { name: "Orders", icon: <Check size={16} />, href: "#orders" },
    { name: "Settings", icon: <Settings size={16} />, href: "#settings" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex mt-16 pb-5">
      {/* Sidebar Menu */}
      <aside
        className={`min-h-screen bg-neutral-900 border-r border-neutral-800 p-4 transition-all duration-300 overflow-hidden ${
          menuOpen ? "w-60" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <Button onClick={() => setMenuOpen(!menuOpen)}>
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
      <div
        className={`flex-1 p-6 transition-all duration-300  
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h1 className="text-3xl font-bold">BOFFMAN LS DASHBOARD</h1>
          <nav className="flex gap-4 ">
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
              <p className="mt-2 text-2xl text-white">320</p>
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
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-10">
          <Button
            size="lg"
            className="flex items-center gap-2 bg-transparent"
            variant="outline"
          >
            <Mail size={16} /> Send Newsletter
          </Button>
          <Button
            size="lg"
            className="flex items-center gap-2 bg-transparent"
            variant="outline"
          >
            <Settings size={16} /> Manage Products
          </Button>
          <Button
            size="lg"
            className="flex items-center gap-2 bg-transparent"
            variant="outline"
          >
            <Users size={16} /> Manage Users
          </Button>
        </div>
      </div>
    </div>
  );
}
