import React, { useState, useEffect } from "react";
import { Users, Calendar, CalendarCheck, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import {toast} from "react-toastify"


// ─── Custom Bar Tooltip ────────────────────────────────────────────────────────
const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{payload[0].value} patients</p>
      </div>
    );
  }
  return null;
};

// ─── Custom Pie Tooltip ────────────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
        <p className="text-xs text-slate-500 mb-0.5">{payload[0].name}</p>
        <p className="text-sm font-semibold text-slate-900">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

// ─── Custom Donut Label ────────────────────────────────────────────────────────
const DonutLabel = ({ cx, cy, total }) => (
  <>
    <text x={cx} y={cy - 8} textAnchor="middle" fill="#111827" fontSize={26} fontWeight={700}>
      {total}
    </text>
    <text x={cx} y={cy + 16} textAnchor="middle" fill="#9ca3af" fontSize={12}>
      Total
    </text>
  </>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ title, value, icon: Icon, iconBg, iconColor }) => (
  <div className="flex min-w-0 items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className={`grid h-12 w-12 place-items-center rounded-2xl ${iconBg}`}>
      <Icon size={22} color={iconColor} />
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-extrabold leading-none text-slate-900">{value}</p>
    </div>
  </div>
);

// ─── Dashboard Overview ───────────────────────────────────────────────────────
const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
  totalPatients: 0,
  todayAppointments: 0,
  monthAppointments: 0,
  pendingAppointments: 0,
});
  const [appointmentBreakdown, setAppintmentBreakdown] = useState([]);
  const [patientsByMonth, setPatientsByMonth] = useState([]);

  const fetchDahboardData = async()=>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/admin/dashboard/Overview`,{
        withCredentials:true,
      });
      
      console.log(res.data)
      setStats(res.data.data.stats);
      setAppintmentBreakdown(res.data.data.appointmentBreakdown);
      setPatientsByMonth(res.data.data.patientsByMonth);
    }catch(err){
      toast.error("failed to fetch the data");
      console.log(err);
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchDahboardData();
  },[])


  const totalAppointments = appointmentBreakdown.reduce((s, d) => s + d.value, 0);

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center text-slate-500">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-[1440px] space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">Monitor your clinic&apos;s performance and key metrics</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            iconBg="bg-sky-100"
            iconColor="#0c4a6e"
          />
          <StatCard
            title="Today&apos;s Appointments"
            value={stats.todayAppointments}
            icon={CalendarCheck}
            iconBg="bg-emerald-100"
            iconColor="#166534"
          />
          <StatCard
            title="Month Appointments"
            value={stats.monthAppointments}
            icon={Calendar}
            iconBg="bg-violet-100"
            iconColor="#7c3aed"
          />
          <StatCard
            title="Pending Appointments"
            value={stats.pendingAppointments}
            icon={Clock}
            iconBg="bg-amber-100"
            iconColor="#b45309"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Appointments</h3>
            <p className="mt-1 text-sm text-slate-500">Done vs pending</p>

            <div className="mt-6 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                  >
                    {appointmentBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <text x="50%" y="44%" textAnchor="middle" fill="#111827" fontSize={24} fontWeight={700} dominantBaseline="middle">
                    {totalAppointments}
                  </text>
                  <text x="50%" y="57%" textAnchor="middle" fill="#9ca3af" fontSize={11} dominantBaseline="middle">
                    Total
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid gap-3">
              {appointmentBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: item.color }} />
                    <span className="text-sm text-slate-600">Appointments {item.name.toLowerCase()}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Patients by Month</h3>
            <p className="mt-1 text-sm text-slate-500">Monthly appointment volume</p>

            <div className="mt-6 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientsByMonth} barSize={36} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="patients" fill="url(#blueGrad)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardOverview;