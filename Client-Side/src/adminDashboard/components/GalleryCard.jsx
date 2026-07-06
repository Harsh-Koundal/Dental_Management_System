import { useState } from "react";

// ─── Icons ─────────────────────────────────────────────────────────────────────
const EditIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const ToggleIcon = ({ active }) => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    {active
      ? <><path d="M17 12H7"/><circle cx="7" cy="12" r="3"/><rect x="4" y="9" width="16" height="6" rx="3" strokeWidth="2"/></>
      : <><path d="M7 12h10"/><circle cx="17" cy="12" r="3"/><rect x="4" y="9" width="16" height="6" rx="3" strokeWidth="2"/></>
    }
  </svg>
);

// ─── Confirm Delete Dialog ─────────────────────────────────────────────────────
function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm">
      <div className="mx-4 rounded-xl bg-white p-5 shadow-2xl text-center">
        <p className="text-sm font-semibold text-slate-800 mb-1">Delete image?</p>
        <p className="text-xs text-slate-500 mb-4">This action cannot be undone.</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Inline Edit ───────────────────────────────────────────────────────────────
function InlineEdit({ value, onSave, onCancel }) {
  const [val, setVal] = useState(value);
  return (
    <div className="flex gap-1.5 items-center w-full">
      <input
        autoFocus
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") onSave(val); if (e.key === "Escape") onCancel(); }}
        className="flex-1 min-w-0 rounded-lg border border-indigo-300 bg-white px-2.5 py-1 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Image title…"
      />
      <button onClick={() => onSave(val)} className="shrink-0 rounded-lg bg-indigo-500 px-2.5 py-1 text-xs font-bold text-white hover:bg-indigo-600 transition-colors">✓</button>
      <button onClick={onCancel} className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors">✕</button>
    </div>
  );
}

// ─── GalleryCard ───────────────────────────────────────────────────────────────
export default function GalleryCard({ image, onDelete, onEdit, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setConfirming(false); }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={image.src}
          alt={image.title || "Gallery image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm
            ${image.active
              ? "bg-emerald-500/90 text-white"
              : "bg-slate-700/80 text-slate-200"
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${image.active ? "bg-white" : "bg-slate-400"}`}/>
            {image.active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Hover action strip */}
        <div className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 ${hovered && !confirming ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <ActionBtn title="Edit title" onClick={() => setEditing(true)} color="bg-white/20 hover:bg-white/40 text-white">
            <EditIcon />
          </ActionBtn>
          <ActionBtn title={image.active ? "Set Inactive" : "Set Active"} onClick={() => onToggle(image.id)} color="bg-white/20 hover:bg-amber-400/80 text-white">
            <ToggleIcon active={image.active} />
          </ActionBtn>
          <ActionBtn title="Delete" onClick={() => setConfirming(true)} color="bg-white/20 hover:bg-red-500/80 text-white">
            <TrashIcon />
          </ActionBtn>
        </div>

        {/* Confirm delete overlay */}
        {confirming && (
          <ConfirmDialog
            onConfirm={() => onDelete(image.id)}
            onCancel={() => setConfirming(false)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-3.5 py-3 min-h-[52px] flex items-center">
        {editing ? (
          <InlineEdit
            value={image.title}
            onSave={val => { onEdit(image.id, val); setEditing(false); }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <p
            className="text-sm font-semibold text-slate-700 truncate cursor-pointer hover:text-indigo-600 transition-colors"
            title={image.title || "Untitled"}
            onClick={() => setEditing(true)}
          >
            {image.title || <span className="text-slate-400 font-normal italic">Untitled</span>}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Helper ────────────────────────────────────────────────────────────────────
function ActionBtn({ children, onClick, title, color }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${color}`}
    >
      {children}
    </button>
  );
}