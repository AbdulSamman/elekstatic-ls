// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Check, Settings, PieChart, Users, Menu, X } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useState, useContext } from "react";
// import { AppContext } from "../../AppContext";

// const data = [
//   { name: "Jan", sales: 400 },
//   { name: "Feb", sales: 300 },
//   { name: "Mar", sales: 300 },
//   { name: "Apr", sales: 200 },
// ];

// export default function Dashboard({
//   totalUsersCount,
// }: {
//   totalUsersCount: number;
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { fillDashboard } = useContext(AppContext);

//   const menuItems = [
//     { name: "Dashboard", icon: <PieChart size={16} />, href: "#dashboard" },
//     { name: "Sales", icon: <Check size={16} />, href: "#sales" },
//     { name: "Customers", icon: <Users size={16} />, href: "#customers" },
//     { name: "Orders", icon: <Check size={16} />, href: "#orders" },
//     { name: "Settings", icon: <Settings size={16} />, href: "#settings" },
//   ];

//   const handleMenuToggle = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-950 text-neutral-100 flex mt-16 pb-8 relative">
//       {/* Mobile Overlay */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           bg-neutral-900 border-r border-neutral-800 p-4
//           transition-all duration-300 overflow-hidden
//           min-h-screen
//           md:static
//           ${menuOpen ? "md:w-50" : "md:w-14"}
//           fixed md:relative
//           top-16 left-0 z-40
//           w-64
//           ${menuOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         <div className="flex flex-col items-start">
//           {/* Sidebar Toggle – Desktop */}
//           <div className="flex justify-between items-start mb-6">
//             <Button
//               onClick={handleMenuToggle}
//               className="bg-transparent p-0 hidden md:flex"
//               style={{ padding: 0 }}
//             >
//               {menuOpen ? <X size={24} /> : <Menu size={24} />}
//             </Button>
//           </div>

//           {menuOpen && (
//             <h2 className="text-xl font-semibold py-4">Navigation</h2>
//           )}

//           <nav className="flex flex-col gap-4">
//             {menuItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2 hover:text-white transition"
//               >
//                 {item.icon}
//                 {menuOpen && <span>{item.name}</span>}
//               </a>
//             ))}
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6 transition-all duration-300">
//         {/* Header */}
//         <header className="flex items-center justify-between mb-10 flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             {/* Mobile Menu Button */}
//             <Button
//               onClick={() => setMenuOpen(true)}
//               className="md:hidden bg-transparent p-0"
//             >
//               <Menu size={28} />
//             </Button>

//             <h1 className="text-3xl font-bold">BOFFMAN LS DASHBOARD</h1>
//           </div>

//           <nav className="flex gap-4">
//             <Button variant="outline" className="bg-transparent">
//               <Users size={16} /> Users
//             </Button>
//             <Button variant="outline" className="bg-transparent">
//               <Settings size={16} /> Settings
//             </Button>
//           </nav>
//         </header>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//           <Card className="bg-neutral-900 border-neutral-800">
//             <CardContent className="p-6">
//               <h3 className="font-semibold text-lg text-white flex items-center gap-2">
//                 <PieChart size={16} /> Sales
//               </h3>
//               <p className="mt-2 text-2xl text-white">$12,430</p>
//               <p className="text-sm text-neutral-400">Total sales this month</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-neutral-900 border-neutral-800">
//             <CardContent className="p-6">
//               <h3 className="font-semibold text-lg text-white flex items-center gap-2">
//                 <Users size={16} /> Customers
//               </h3>
//               <p className="mt-2 text-2xl text-white">{totalUsersCount}</p>
//               <p className="text-sm text-neutral-400">Active customers</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-neutral-900 border-neutral-800">
//             <CardContent className="p-6">
//               <h3 className="font-semibold text-lg text-white flex items-center gap-2">
//                 <Check size={16} /> Orders
//               </h3>
//               <p className="mt-2 text-2xl text-orange-500">
//                 {fillDashboard.length}
//               </p>
//               <p className="text-sm text-neutral-400">Pending orders</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sales Chart */}
//         <Card className="bg-neutral-900 border-neutral-800 mb-10" id="sales">
//           <CardContent className="p-6">
//             <h3 className="font-semibold text-lg text-white mb-4">
//               Monthly Sales
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={data}>
//                 <XAxis dataKey="name" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#3B82F6"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Orders List */}
//         {fillDashboard.length === 0 ? (
//           <div className="text-center text-neutral-400">No orders yet.</div>
//         ) : (
//           fillDashboard.map((order: any) => (
//             <div
//               key={order?.documentId}
//               className="mb-4 p-4 border rounded bg-neutral-900/20"
//             >
//               <div>
//                 <strong>User:</strong> {order?.userName} ({order.email})
//               </div>
//               <div>
//                 <strong>Status:</strong> {order?.orderStatus}
//               </div>
//               <div>
//                 <strong>Orders:</strong>
//               </div>

//               <ul className="ml-4 mt-2">
//                 {order.items?.map((productItem: any, idx: number) => (
//                   <li
//                     key={idx}
//                     className="mb-3 p-2 border rounded bg-neutral-800/40"
//                   >
//                     <div className="flex items-center gap-4">
//                       {productItem?.product?.banner?.url && (
//                         <img
//                           src={productItem?.product?.banner?.url}
//                           alt={productItem?.product?.title}
//                           className="w-20 h-20 object-contain rounded"
//                         />
//                       )}
//                       <div>
//                         <h2 className="text-xl text-slate-700">
//                           {productItem?.product?.title}
//                         </h2>
//                         <span>
//                           <div className="flex items-center justify-start gap-4">
//                             <strong className="text-orange-600">
//                               Quanty:{" "}
//                             </strong>{" "}
//                             <span className="text-slate-600">
//                               {productItem?.qty}x
//                             </span>
//                           </div>
//                         </span>
//                         <span>{productItem?.totalPrice?.toFixed(2)} €</span>
//                         {productItem?.product?.lieferStatus === "Sofort" ? (
//                           <div className="flex items-center justify-start gap-2 pt-2">
//                             <div className="w-2 h-2 bg-green-800 rounded-full"></div>
//                             <span className="text-green-800 text-sm py-2">
//                               Auf Lager
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-start">
//                             <div className="flex items-center justify-start gap-2 pt-2">
//                               <div className="w-2 h-2 bg-red-800 rounded-full"></div>
//                               <span className="text-red-800 text-xs">
//                                 Vorbestellung:
//                               </span>
//                             </div>
//                             <span className="text-red-800 text-xs py-2 px-4">
//                               Lieferzeit kann 14 bis 28 Arbeitstage dauern
//                             </span>
//                           </div>
//                         )}
//                         <div className="mt-1">
//                           {productItem?.product?.lieferStatus ===
//                             "Vorbestellung" && (
//                             <strong className="text-green-300">
//                               Selected Options:
//                             </strong>
//                           )}
//                           <ul className="mt-1">
//                             {productItem.selectedOptions?.map(
//                               (option: any, oIdx: number) => (
//                                 <li
//                                   key={oIdx}
//                                   className="text-sm text-slate-600 flex gap-2"
//                                 >
//                                   <p className="text-neutral-600 w-20">
//                                     {option?.title}:
//                                   </p>{" "}
//                                   {option?.label}
//                                 </li>
//                               ),
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Check,
//   Settings,
//   PieChart,
//   Users,
//   Menu,
//   X,
//   MapPin,
//   Package,
//   CreditCard,
//   Clock,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useState, useContext } from "react";
// import { AppContext } from "../../AppContext";

// const data = [
//   { name: "Jan", sales: 400 },
//   { name: "Feb", sales: 300 },
//   { name: "Mar", sales: 600 },
//   { name: "Apr", sales: 800 },
// ];

// export default function Dashboard({
//   totalUsersCount,
// }: {
//   totalUsersCount: number;
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { fillDashboard } = useContext(AppContext);

//   return (
//     <div className="min-h-screen bg-[#050505] text-neutral-100 flex mt-16 pb-20 relative font-sans">
//       {/* Sidebar - Dezent & Dunkel */}
//       <aside
//         className={`bg-black/50 backdrop-blur-xl border-r border-white/5 p-4 transition-all duration-300 ${menuOpen ? "w-64" : "w-20"} hidden md:flex flex-col gap-8`}
//       >
//         <div className="flex justify-center py-4">
//           <Button
//             onClick={() => setMenuOpen(!menuOpen)}
//             variant="ghost"
//             className="text-cyan-500 hover:bg-cyan-500/10"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </Button>
//         </div>
//         <nav className="flex flex-col gap-6">
//           {[
//             { icon: <PieChart size={20} />, label: "Stats" },
//             { icon: <Package size={20} />, label: "Orders" },
//             { icon: <Users size={20} />, label: "Clients" },
//             { icon: <Settings size={20} />, label: "System" },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-4 px-2 cursor-pointer hover:text-cyan-400 transition-colors group"
//             >
//               <div className="p-2 rounded-lg group-hover:bg-cyan-500/10">
//                 {item.icon}
//               </div>
//               {menuOpen && (
//                 <span className="text-sm font-bold uppercase tracking-widest">
//                   {item.label}
//                 </span>
//               )}
//             </div>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
//         {/* Header mit Neon-Effekt */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
//           <div>
//             <h1 className="text-4xl font-black tracking-tighter text-white  italic">
//               SnB{" "}
//               <span
//                 className="text-cyan-500 animate-pulse shadow-cyan-500/50"
//                 style={{ textShadow: "0 0 20px rgba(0, 191, 255, 0.6)" }}
//               >
//                 AUDIO
//               </span>
//               <span className="block text-[10px] tracking-[0.5em] text-neutral-500 mt-1 font-black">
//                 Loudspeaker Systems Dashboard
//               </span>
//             </h1>
//           </div>
//           <div className="flex gap-3">
//             <div className="bg-neutral-900 border border-white/5 px-4 py-2 rounded-full flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
//               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
//                 System Online
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Top Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//           {[
//             {
//               label: "Revenue",
//               val: "€14.280",
//               color: "text-white",
//               icon: <CreditCard size={18} />,
//             },
//             {
//               label: "Customers",
//               val: totalUsersCount,
//               color: "text-white",
//               icon: <Users size={18} />,
//             },
//             {
//               label: "Active Orders",
//               val: fillDashboard.length,
//               color: "text-cyan-500",
//               icon: <Clock size={18} />,
//             },
//           ].map((stat, i) => (
//             <Card
//               key={i}
//               className="bg-neutral-900/40 border-white/5 backdrop-blur-md"
//             >
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-center mb-2 text-neutral-500">
//                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">
//                     {stat.label}
//                   </span>
//                   {stat.icon}
//                 </div>
//                 <p
//                   className={`text-3xl font-black tracking-tighter ${stat.color}`}
//                 >
//                   {stat.val}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Order Section */}
//         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-600 mb-6 flex items-center gap-2">
//           <div className="h-px w-8 bg-neutral-800"></div> Recent Manufacturing
//           Orders
//         </h2>

//         <div className="space-y-6">
//           {fillDashboard.length === 0 ? (
//             <div className="p-20 text-center border border-dashed border-white/10 rounded-3xl text-neutral-600 uppercase font-bold tracking-widest">
//               No active data streams
//             </div>
//           ) : (
//             fillDashboard.map((order: any) => (
//               <div
//                 key={order?.documentId}
//                 className="group relative bg-neutral-900/20 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
//               >
//                 {/* Order Top Bar */}
//                 <div className="p-6 flex flex-wrap justify-between items-start gap-6 border-b border-white/5 bg-white/2">
//                   <div className="flex gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
//                       <Users size={20} />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-white tracking-tight">
//                         {order?.userName}
//                       </h3>
//                       <p className="text-xs text-neutral-500 font-medium">
//                         {order.email}
//                       </p>
//                     </div>
//                   </div>

//                   {/* ADDRESS BLOCK */}
//                   <div className="flex gap-3 bg-black/40 p-3 rounded-xl border border-white/5 max-w-xs">
//                     <MapPin size={16} className="text-cyan-500 shrink-0 mt-1" />
//                     <div className="text-[11px] leading-relaxed text-neutral-300 italic">
//                       <p className="font-bold text-white not-italic uppercase tracking-widest mb-1 text-[9px]">
//                         Shipping Address
//                       </p>
//                       {order.address ? (
//                         <>
//                           {order.address.line1}, {order.address.postal_code}{" "}
//                           {order.address.city}
//                           <br />
//                           {order.address.country}
//                         </>
//                       ) : (
//                         <span className="text-red-500/50 uppercase">
//                           No address data available
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="text-right">
//                     <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
//                       {order?.orderStatus || "Pending"}
//                     </span>
//                     <p className="text-2xl font-black text-white mt-2 tracking-tighter">
//                       €{order.totalPrice?.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Items Area */}
//                 <div className="p-6 bg-black/20">
//                   <div className="grid grid-cols-1 gap-4">
//                     {order.items?.map((productItem: any, idx: number) => (
//                       <div
//                         key={idx}
//                         className="flex items-center gap-6 p-4 rounded-xl bg-neutral-800/20 border border-white/5 hover:bg-neutral-800/40 transition-all"
//                       >
//                         {productItem?.product?.banner?.url && (
//                           <img
//                             src={productItem?.product?.banner?.url}
//                             alt=""
//                             className="w-24 h-24 object-cover rounded-lg bg-black p-2 border border-white/5"
//                           />
//                         )}

//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <h4 className="text-md font-bold text-white uppercase tracking-tight">
//                               {productItem?.product?.title}
//                             </h4>
//                             <span className="text-cyan-500 font-black text-sm">
//                               x{productItem?.qty}
//                             </span>
//                           </div>

//                           {/* Options Grid */}
//                           <div className="mt-2 flex flex-wrap gap-2">
//                             {productItem.selectedOptions?.map(
//                               (opt: any, oIdx: number) => (
//                                 <div
//                                   key={oIdx}
//                                   className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[9px] uppercase font-bold text-neutral-400"
//                                 >
//                                   <span className="text-neutral-600 mr-1">
//                                     {opt?.title}:
//                                   </span>{" "}
//                                   {opt?.label}
//                                 </div>
//                               ),
//                             )}
//                           </div>

//                           {/* Lieferstatus Badge */}
//                           <div className="mt-4">
//                             {productItem?.product?.lieferStatus === "Sofort" ? (
//                               <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
//                                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>{" "}
//                                 In Stock
//                               </div>
//                             ) : (
//                               <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
//                                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>{" "}
//                                 Manufacturing: 14-28 Days
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  Settings,
  PieChart,
  Users,
  Menu,
  X,
  MapPin,
  Package,
  CreditCard,
  Clock,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useContext, useMemo } from "react";
import { AppContext } from "../../AppContext";

export default function Dashboard({
  totalUsersCount,
}: {
  totalUsersCount: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { fillDashboard } = useContext(AppContext);
  console.log("fill", fillDashboard);

  // 1. SORTIERUNG: Neueste zuerst
  const sortedOrders = useMemo(() => {
    return [...fillDashboard].sort((a, b) => {
      const dateA = new Date(
        a.createdAt || a.attributes?.createdAt || 0,
      ).getTime();
      const dateB = new Date(
        b.createdAt || b.attributes?.createdAt || 0,
      ).getTime();
      return dateB - dateA;
    });
  }, [fillDashboard]);
  // 2. REVENUE BERECHNUNG: Summe aller Orders
  const totalRevenue = fillDashboard.reduce((acc: number, order: any) => {
    return acc + (Number(order.totalPrice) || 0);
  }, 0);

  const formattedRevenue = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(totalRevenue);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex mt-16  relative font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-black/50 backdrop-blur-xl border-r border-white/5 p-4 transition-all duration-300 ${menuOpen ? "w-64" : "w-20"} hidden md:flex flex-col gap-8`}
      >
        <div className="flex justify-start py-4 pl-2 items-center">
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            variant="ghost"
            className="text-cyan-500 hover:bg-cyan-500/10"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <nav className="flex flex-col gap-6">
          {[
            { icon: <PieChart size={20} />, label: "Stats" },
            { icon: <Package size={20} />, label: "Orders" },
            { icon: <Users size={20} />, label: "Clients" },
            { icon: <Settings size={20} />, label: "System" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-2 cursor-pointer hover:text-cyan-400 transition-colors group"
            >
              <div className="p-2 rounded-lg group-hover:bg-cyan-500/10">
                {item.icon}
              </div>
              {menuOpen && (
                <span className="text-sm font-bold uppercase tracking-widest">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full mb-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white italic">
              SnB{" "}
              <span
                className="text-cyan-500 animate-pulse shadow-cyan-500/50"
                style={{ textShadow: "0 0 20px rgba(0, 191, 255, 0.6)" }}
              >
                AUDIO
              </span>
              <span className="block text-[10px] tracking-[0.5em] text-neutral-500 mt-1 font-black">
                Loudspeaker Systems Dashboard
              </span>
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-neutral-900 border border-white/5 px-4 py-2 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                System Online
              </span>
            </div>
          </div>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Revenue",
              val: formattedRevenue,
              color: "text-white",
              icon: <CreditCard size={18} />,
            },
            {
              label: "Customers",
              val: totalUsersCount,
              color: "text-white",
              icon: <Users size={18} />,
            },
            {
              label: "Active Orders",
              val: fillDashboard.length,
              color: "text-cyan-500",
              icon: <Clock size={18} />,
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-neutral-900/40 border-white/5 backdrop-blur-md"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2 text-neutral-500">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                  {stat.icon}
                </div>
                <p
                  className={`text-3xl font-black tracking-tighter ${stat.color}`}
                >
                  {stat.val}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {sortedOrders.length === 0 ? (
            <div className="p-20 text-center border border-dashed border-white/10 rounded-3xl text-neutral-600 uppercase font-bold tracking-widest">
              No active data streams
            </div>
          ) : (
            sortedOrders.map((order: any) => (
              <div
                key={order?.documentId}
                className="group relative bg-neutral-900/20 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
              >
                {/* Order Top Bar */}
                <div className="p-6 flex flex-wrap justify-between items-start gap-6 border-b border-white/5 bg-white/2">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {order?.userName}
                      </h3>
                      {/* EMAIL WIEDER DA */}
                      <p className="text-xs text-neutral-500 font-medium">
                        {order.email}
                      </p>
                      {/* DATUM ZUSÄTZLICH */}
                      <div className="flex items-center gap-2 text-neutral-500 mt-1">
                        <Calendar size={10} className="text-cyan-500/50" />
                        <p className="text-[12px] font-bold uppercase tracking-wider text-neutral-400">
                          {(() => {
                            // 1. Prüfe Order Datum, 2. Prüfe Produkt Datum (Fallback)
                            const rawDate =
                              order.createdAt ||
                              order.items?.[0]?.product?.createdAt;

                            if (!rawDate) return "Datum ausstehend";

                            return (
                              new Date(rawDate).toLocaleString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Europe/Berlin",
                              }) + " Uhr"
                            );
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ADDRESS BLOCK */}
                  <div className="flex gap-3 bg-black/40 p-3 rounded-xl border border-white/5 max-w-xs">
                    <MapPin size={16} className="text-cyan-500 shrink-0 mt-1" />
                    <div className="text-[11px] leading-relaxed text-neutral-300 italic">
                      <p className="font-bold text-white not-italic uppercase tracking-widest mb-1 text-[9px]">
                        Shipping Address
                      </p>
                      {order.address ? (
                        <>
                          <span className="text-cyan-500 font-black not-italic block mb-1 uppercase tracking-tight">
                            {order.address.name || "Kein Empfänger"}
                          </span>
                          {order.address.line1}, {order.address.postal_code}{" "}
                          {order.address.city}
                          <br />
                          {order.address.country}
                        </>
                      ) : (
                        <span className="text-red-500/50 uppercase">
                          No address data available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
                      {order?.orderStatus || "Pending"}
                    </span>
                    <p className="text-2xl font-black text-white mt-2 tracking-tighter">
                      €{order.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items Area */}
                <div className="p-6 bg-black/20">
                  <div className="grid grid-cols-1 gap-4">
                    {order.items?.map((productItem: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-6 p-4 rounded-xl bg-neutral-800/20 border border-white/5 hover:bg-neutral-800/40 transition-all"
                      >
                        {productItem?.product?.banner?.url && (
                          <img
                            src={productItem?.product?.banner?.url}
                            alt=""
                            className="w-24 h-24 object-cover rounded-lg bg-black p-2 border border-white/5"
                          />
                        )}

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-md font-bold text-white uppercase tracking-tight">
                              {productItem?.product?.title}
                            </h4>
                            <span className="text-cyan-500 font-black text-sm">
                              x{productItem?.qty}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {productItem.selectedOptions?.map(
                              (opt: any, oIdx: number) => (
                                <div
                                  key={oIdx}
                                  className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[9px] uppercase font-bold text-neutral-400"
                                >
                                  <span className="text-neutral-600 mr-1">
                                    {opt?.title}:
                                  </span>{" "}
                                  {opt?.label}
                                </div>
                              ),
                            )}
                          </div>

                          <div className="mt-4">
                            {productItem?.product?.lieferStatus === "Sofort" ? (
                              <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>{" "}
                                In Stock
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>{" "}
                                Manufacturing: 14-28 Days
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
