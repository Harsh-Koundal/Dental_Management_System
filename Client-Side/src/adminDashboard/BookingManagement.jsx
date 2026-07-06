import React, { useState, useMemo } from "react";
import { Calendar, Clock, CheckCircle, AlertTriangle, X, Star } from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────────
const TODAY = new Date();
const fmt = (d) => d.toISOString().split("T")[0];

const TREATMENTS = [
  "Teeth Cleaning", "Root Canal", "Orthodontics", "Whitening",
  "Filling", "Extraction", "Implant", "Crown", "Scaling",
];
const NAMES = [
  "Aisha Khan", "Rahul Mehta", "Priya Sharma", "James Okonkwo",
  "Sofia Martinez", "Lena Fischer", "David Nguyen", "Amara Diallo",
  "Ethan Brooks", "Nadia Petrov", "Carlos Rivera", "Yuki Tanaka",
  "Fatima Al-Amin", "Marcus Johnson", "Elena Popov", "Arjun Patel",
];
const HOURS = [
  "09:00","09:30","10:00","10:15","10:45","11:00","11:30","12:00",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30",
];

function rndDate(offset) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + offset);
  return fmt(d);
}

function genBookings() {
  const offsets = [-5,-3,-2,-1,0,0,0,1,2,3,4,5,6,7,8,9];
  return NAMES.map((name, i) => {
    const dateStr = rndDate(offsets[i]);
    const d = new Date(dateStr);
    const past = d < TODAY && fmt(d) !== fmt(TODAY);
    return {
      id: i + 1,
      name,
      email: name.toLowerCase().replace(" ", ".") + "@email.com",
      date: dateStr,
      time: HOURS[i % HOURS.length],
      treatment: TREATMENTS[i % TREATMENTS.length],
      status: past ? "missed" : i % 5 === 3 ? "completed" : "upcoming",
      phone: `+91 98${String(i).padStart(2, "0")} 000${i + 1}0`,
      notes: i % 3 === 0 ? "Patient requested morning slot. Allergic to penicillin." : "",
    };
  });
}

const INIT_BOOKINGS = genBookings();

// ─── Helpers ───────────────────────────────────────────────────────────────────
function isToday(dateStr) { return dateStr === fmt(TODAY); }

function formatDate(ds) {
  if (isToday(ds)) return "Today";
  const d = new Date(ds + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Icons (inline SVG) ────────────────────────────────────────────────────────
const Icons = {
  Search: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Eye: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
    </svg>
  ),
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, bg }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          {label}
        </p>
        <p className="text-2xl font-extrabold leading-none text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    upcoming: { cls: "bg-blue-100 text-blue-800", icon: <Clock size={12} /> },
    completed: { cls: "bg-green-100 text-green-800", icon: <CheckCircle size={12} /> },
    missed: { cls: "bg-red-100 text-red-800", icon: <X size={12} /> },
  };
  const { cls, icon } = map[status] || map.upcoming;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${cls}`}>
      {icon} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ActionBtn({ title, onClick, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="w-8 h-8 rounded-lg border-none cursor-pointer grid place-items-center bg-transparent text-slate-500 transition-all duration-150 hover:bg-blue-50 hover:text-blue-600"
    >
      {children}
    </button>
  );
}

function DrawerRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function DrawerLabel({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
      {children}
    </p>
  );
}

// ─── Side Drawer ───────────────────────────────────────────────────────────────
function Drawer({ booking, onClose, onSave, onCancel }) {
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState(booking.notes);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm animate-fade-in"
      />
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-200 flex justify-between items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Booking #{booking.id}
            </p>
            <h2 className="text-xl font-extrabold">{booking.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-xl text-slate-500 p-1 rounded-lg"
          >✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4.5">
          {/* Info block */}
          <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-2">
            <DrawerRow label="Email" value={booking.email} />
            <DrawerRow label="Phone" value={booking.phone} />
            <DrawerRow label="Treatment" value={booking.treatment} />
          </div>

          {/* Status */}
          <div>
            <DrawerLabel>Status</DrawerLabel>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full mt-1.5 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 outline-none">
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <DrawerLabel>Date</DrawerLabel>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full mt-1.5 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 outline-none" />
            </div>
            <div>
              <DrawerLabel>Time</DrawerLabel>
              <select value={time} onChange={e => setTime(e.target.value)} className="w-full mt-1.5 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 outline-none">
                {HOURS.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <DrawerLabel>Notes</DrawerLabel>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="w-full mt-1.5 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 outline-none resize-vertical"
            />
          </div>

          {/* Today badge */}
          {isToday(booking.date) && (
            <div className="bg-yellow-100 rounded-lg p-2.5 text-sm text-amber-800 font-medium flex items-center gap-2">
              <Star size={14} className="text-amber-600" /> This is a today's appointment
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-2.5">
          <button
            onClick={() => onSave({ ...booking, date, time, status, notes })}
            className="flex-1 py-2.5 px-4.5 bg-blue-600 text-white border-none rounded-xl font-semibold text-sm cursor-pointer font-inherit"
          >
            Save Changes
          </button>
          <button
            onClick={() => onCancel(booking.id)}
            className="py-2.5 px-4 bg-red-100 text-red-700 border-none rounded-xl font-semibold text-sm cursor-pointer font-inherit"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message }) {
  return (
    <div className="fixed bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-5.5 py-2.5 rounded-xl text-sm font-semibold shadow-2xl z-100 pointer-events-none">
      {message}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingManagement() {
  const [bookings, setBookings] = useState(INIT_BOOKINGS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [customDate, setCustomDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  const stats = useMemo(() => ({
    today: bookings.filter(b => isToday(b.date)).length,
    upcoming: bookings.filter(b => b.status === "upcoming").length,
    completed: bookings.filter(b => b.status === "completed").length,
    missed: bookings.filter(b => b.status === "missed").length,
  }), [bookings]);

  const filtered = useMemo(() => {
    const weekStart = new Date(TODAY);
    weekStart.setDate(TODAY.getDate() - TODAY.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return bookings.filter(b => {
      const q = search.toLowerCase();
      if (q && !b.name.toLowerCase().includes(q) && !b.email.toLowerCase().includes(q)) return false;
      if (filterStatus !== "all" && b.status !== filterStatus) return false;
      const d = new Date(b.date);
      if (filterDate === "today" && !isToday(b.date)) return false;
      if (filterDate === "week" && (d < weekStart || d > weekEnd)) return false;
      if (filterDate === "custom" && customDate && b.date !== customDate) return false;
      return true;
    }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [bookings, search, filterStatus, filterDate, customDate]);

  function handleSave(updated) {
    setBookings(bs => bs.map(b => b.id === updated.id ? updated : b));
    setSelected(null);
    showToast("Booking updated successfully");
  }

  function handleCancel(id) {
    setBookings(bs => bs.filter(b => b.id !== id));
    setSelected(null);
    showToast("Booking cancelled");
  }

  function markComplete(id) {
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status: "completed" } : b));
    showToast("Marked as completed");
  }

  const TH = ["Patient", "Date", "Time", "Treatment", "Status", "Actions"];

  return (
    <>

      <div className="min-h-screen bg-gray-50 p-7 px-6 font-sans">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-5.5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Booking Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track, manage and update all patient appointments</p>
        </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <StatCard label="Today's" value={stats.today} icon={<Calendar size={24} />} bg="bg-blue-100" />
            <StatCard label="Upcoming" value={stats.upcoming} icon={<Clock size={24} />} bg="bg-green-100" />
            <StatCard label="Completed" value={stats.completed} icon={<CheckCircle size={24} />} bg="bg-emerald-100" />
            <StatCard label="Missed" value={stats.missed} icon={<AlertTriangle size={24} />} bg="bg-red-100" />
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-3xl p-4 flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-40">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Icons.Search />
              </span>
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 bg-white outline-none"
              />
            </div>

            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 bg-white outline-none flex-shrink-0 w-36">
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
            </select>

            <select value={filterDate} onChange={e => setFilterDate(e.target.value)} className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 bg-white outline-none flex-shrink-0 w-35">
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="custom">Custom Date</option>
            </select>

            {filterDate === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={e => setCustomDate(e.target.value)}
                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-inherit text-gray-900 bg-white outline-none flex-shrink-0 w-40"
              />
            )}

            <span className="ml-auto text-sm text-gray-500 font-medium">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Table Head */}
            <div className="grid grid-cols-[2fr_1.1fr_0.8fr_1.4fr_1fr_1.3fr] px-5 py-3.5 border-b-2 border-gray-200">
              {TH.map(h => (
                <p key={h} className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {h}
                </p>
              ))}
            </div>

            {/* Table Body */}
            <div className="max-h-120 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="p-12 text-center text-gray-500 text-sm">
                  No bookings found
                </div>
              )}

              {filtered.map(b => {
                const today = isToday(b.date);
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className={`grid grid-cols-[2fr_1.1fr_0.8fr_1.4fr_1fr_1.3fr] px-5 py-3.5 items-center border-b border-gray-200 cursor-pointer transition-colors duration-150 ${today ? 'bg-yellow-50 hover:bg-yellow-100' : 'hover:bg-gray-50'}`}
                  >
                    {/* Patient */}
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{b.name}</p>
                      <p className="text-xs text-gray-500">{b.email}</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{formatDate(b.date)}</span>
                      {today && (
                        <span className="text-xs font-bold bg-yellow-200 text-yellow-800 rounded px-1.5 py-0.5">
                          TODAY
                        </span>
                      )}
                    </div>

                    {/* Time */}
                    <p className="text-sm font-medium text-slate-600">{b.time}</p>

                    {/* Treatment */}
                    <p className="text-sm font-medium">{b.treatment}</p>

                    {/* Status */}
                    <div onClick={e => e.stopPropagation()}>
                      <Badge status={b.status} />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <ActionBtn title="View" onClick={() => setSelected(b)}><Icons.Eye /></ActionBtn>
                      <ActionBtn title="Edit" onClick={() => setSelected(b)}><Icons.Edit /></ActionBtn>
                      {b.status === "upcoming" && (
                        <ActionBtn title="Mark as completed" onClick={() => markComplete(b.id)}><Icons.Check /></ActionBtn>
                      )}
                      <ActionBtn title="Cancel booking" onClick={() => handleCancel(b.id)}><Icons.X /></ActionBtn>
                      <ActionBtn title="Reschedule" onClick={() => setSelected(b)}><Icons.Refresh /></ActionBtn>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Side Drawer */}
      {selected && (
        <Drawer
          booking={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} />}
    </>
  );
}