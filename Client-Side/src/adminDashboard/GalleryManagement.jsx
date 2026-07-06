import { useState } from "react";
import { Search, Upload, ImageIcon } from "lucide-react";
import GalleryCard from "./components/GalleryCard";
import UploadModal from "./components/GalleryUpload";

// ─── Seed images (Unsplash placeholders) ──────────────────────────────────────
const SEED = [
  { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", title: "Mountain Sunrise", active: true, createdAt: Date.now() - 6e5 },
  { id: 2, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", title: "Forest Canopy", active: true, createdAt: Date.now() - 5e5 },
  { id: 3, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", title: "Golden Hour", active: false, createdAt: Date.now() - 4e5 },
  { id: 4, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80", title: "Autumn Path", active: true, createdAt: Date.now() - 3e5 },
  { id: 5, src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80", title: "Waterfall", active: true, createdAt: Date.now() - 2e5 },
  { id: 6, src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80", title: "Lake Reflection", active: false, createdAt: Date.now() - 1e5 },
];

// ─── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ onUpload }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
        <ImageIcon size={36} className="text-slate-400" />
      </div>
      <p className="text-lg font-bold text-slate-700 mb-1">No images yet</p>
      <p className="text-sm text-slate-400 mb-6">Upload your first image to get started</p>
      <button
        onClick={onUpload}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-200"
      >
        <Upload size={16} /> Upload Image
      </button>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar({ images }) {
  const total = images.length;
  const active = images.filter(i => i.active).length;
  const inactive = total - active;
  return (
    <div className="flex items-center gap-5 text-sm">
      <span className="text-slate-400">
        <span className="font-bold text-slate-700">{total}</span> total
      </span>
      <span className="w-px h-4 bg-slate-200"/>
      <span className="text-slate-400">
        <span className="font-bold text-emerald-600">{active}</span> active
      </span>
      <span className="w-px h-4 bg-slate-200"/>
      <span className="text-slate-400">
        <span className="font-bold text-slate-500">{inactive}</span> inactive
      </span>
    </div>
  );
}

// ─── GalleryPage ───────────────────────────────────────────────────────────────
let nextId = SEED.length + 1;

export default function GalleryManagement() {
  const [images, setImages] = useState(SEED);
  const [showUpload, setShowUpload] = useState(false);
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function handleSave({ src, title }) {
    setImages(prev => [
      { id: nextId++, src, title, active: true, createdAt: Date.now() },
      ...prev,
    ]);
    showToast("Image uploaded successfully");
  }

  function handleDelete(id) {
    setImages(prev => prev.filter(img => img.id !== id));
    showToast("Image deleted");
  }

  function handleEdit(id, title) {
    setImages(prev => prev.map(img => img.id === id ? { ...img, title } : img));
    showToast("Title updated");
  }

  function handleToggle(id) {
    setImages(prev => prev.map(img => img.id === id ? { ...img, active: !img.active } : img));
  }

  // Sort newest first, then filter
  const displayed = images
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter(img => {
      if (filter === "active") return img.active;
      if (filter === "inactive") return !img.active;
      return true;
    })
    .filter(img =>
      !search.trim() || img.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-[1440px]">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Gallery Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">Upload, organise and publish your media assets</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 active:scale-95 transition-all shadow-lg shadow-indigo-200"
          >
            <Upload size={16} /> Upload Image
          </button>
        </div>

        {/* ── Toolbar ── */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm mb-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <StatsBar images={images} />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search titles…"
                  className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 w-56 transition"
                />
              </div>

              <div className="flex items-center gap-1 rounded-xl bg-slate-200/60 p-1 text-xs font-semibold">
                {[["all","All"],["active","Active"],["inactive","Inactive"]].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFilter(val)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${filter === val ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Gallery Grid ── */}
        {displayed.length === 0 && images.length === 0 ? (
          <EmptyState onUpload={() => setShowUpload(true)} />
        ) : displayed.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            No images match your filter.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayed.map((img) => (
              <GalleryCard
                key={img.id}
                image={img}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── Upload Modal ── */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSave={handleSave}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fade-in bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl shadow-xl whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}