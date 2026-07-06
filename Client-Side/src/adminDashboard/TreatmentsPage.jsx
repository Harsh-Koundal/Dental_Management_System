import React, { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, X, Upload, CheckCircle, XCircle, LayoutGrid, Eye, Users } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold leading-none text-slate-900">{value}</p>
    </div>
  </div>
);

// ─── Treatment Card ───────────────────────────────────────────────────────────
const TreatmentCard = ({ treatment, onEdit, onDelete }) => (
  <div className="group relative flex flex-col rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5 duration-200">
    {/* Image area */}
    <div className="h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
      {treatment.image ? (
        <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-300">
          <LayoutGrid size={36} />
          <span className="text-xs">No Image</span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-5 gap-2">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-slate-900 leading-snug">{treatment.name}</h4>
        <span
          className={`shrink-0 mt-0.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${treatment.active
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
            }`}
        >
          {treatment.active ? "Active" : "Inactive"}
        </span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">{treatment.description}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
        <button
          onClick={() => onEdit(treatment)}
          className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition"
        >
          <Pencil size={12} />
          Edit
        </button>
        <button
          onClick={() => onDelete(treatment._id)}
          className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
        >
          <Trash2 size={12} />
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const TreatmentModal = ({ treatment, onClose, onSave }) => {
  const [form, setForm] = useState(
    treatment || { name: "", description: "", image: null, active: true }
  );
  const [preview, setPreview] = useState(treatment?.image || null);

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const url = URL.createObjectURL(file);

  setPreview(url);

  setForm((f) => ({
    ...f,
    image: file,
  }));
};

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">
            {treatment ? "Edit Treatment" : "Add New Treatment"}
          </h2>
          <button onClick={onClose} className="rounded-xl p-1.5 hover:bg-slate-100 transition">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
              Treatment Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Teeth Whitening"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
              Treatment Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of the treatment..."
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="flex gap-4">
            <label className="cursor-pointer flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition shrink-0">
              <Upload size={15} />
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            <div className="flex-1 min-h-[80px] rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-slate-400">Uploaded image will appear here</span>
              )}
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${form.active ? "bg-emerald-500" : "bg-slate-300"
                }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${form.active ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </button>
            <span className="text-sm text-slate-600">
              Mark as <span className="font-semibold">{form.active ? "Active" : "Inactive"}</span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-2xl bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition"
          >
            {treatment ? "Save Changes" : "+ Add Treatment"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Treatments Page ──────────────────────────────────────────────────────────
const TreatmentsPage = () => {
  const [treatments, setTreatments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [modal, setModal] = useState(null); // null | "add" | treatment object
  const [loading, setLoading] = useState(true);


  const fetchTreatments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/admin/treatment`, {
        withCredentials: true,
      });

      console.log(res.data)
      setTreatments(res.data.treatments);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch treatments");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTreatments();
  }, []);

  const filtered = treatments.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "active") return matchSearch && t.active;
    if (filter === "inactive") return matchSearch && !t.active;
    return matchSearch;
  });

  const totalActive = treatments.filter((t) => t.active).length;
  const totalInactive = treatments.filter((t) => !t.active).length;

  const handleSave = async (form) => {
    try {
      const formData = new FormData();

      formData.append("name",form.name);
      formData.append("description",form.description);
      formData.append("active",form.active);

      if (form.image instanceof File) {
  formData.append("image", form.image);
}

      if (modal === "add") {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/admin/treatment/create`,formData
          , {
            withCredentials: true,
            headers:{
              "Content-Type":"multipart/form-data",
            }
          });

        setTreatments((prev) => [
          res.data.treatment,
          ...prev,
        ]);
        toast.success("Treatment added");

      } else {
        const res = await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/treatment/update/${modal._id}`,
          formData,
          {
            withCredentials: true,
            headers:{
              "Content-Type":"multipart/form-data"
          }
        }
        );

        setTreatments((prev) =>
          prev.map((t) =>
            t._id === modal._id
              ? res.data.treatment
              : t
          )
        );

        toast.success("Treatment updated");
      }
      setModal(null);
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    }
  }

 const handleDelete = async (id) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/treatment/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    setTreatments((prev) =>
      prev.filter((t) => t._id !== id)
    );

    toast.success("Treatment deleted");
  } catch (error) {
    console.log(error);

    toast.error("Failed to delete");
  }
};
  if (loading) {
    return <div className="flex h-72 items-center justify-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-[1440px] space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Treatments</h1>
          <p className="text-sm text-slate-500">Manage all clinic treatments and services</p>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2">
          <StatCard label="Total Treatments" value={treatments.length} icon={<Users size={20} className="text-sky-600" />} />
          <StatCard label="Active Treatments" value={totalActive} icon={<CheckCircle size={20} className="text-emerald-600" />} />
          <StatCard label="Inactive Treatments" value={totalInactive} icon={<XCircle size={20} className="text-amber-600" />} />
          <StatCard label="Showing Results" value={filtered.length} icon={<Eye size={20} className="text-violet-600" />} />
        </div>

        {/* Controls */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Treatment"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              {[
                { key: "all", label: "Total Treatments" },
                { key: "active", label: "Active" },
                { key: "inactive", label: "Inactive" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${filter === key
                      ? "bg-sky-500 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Add Button */}
            <button
              onClick={() => setModal("add")}
              className="ml-auto flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-sky-600 transition shadow-sm"
            >
              <Plus size={14} />
              Add New Treatment
            </button>
          </div>
        </div>

        {/* Treatment Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-slate-300 bg-white py-20 text-slate-400">
            <XCircle size={36} />
            <p className="text-sm font-medium">No treatments found</p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
            {filtered.map((t) => (
              <TreatmentCard key={t._id} treatment={t} onEdit={(t) => setModal(t)} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal !== null && (
        <TreatmentModal
          treatment={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TreatmentsPage;