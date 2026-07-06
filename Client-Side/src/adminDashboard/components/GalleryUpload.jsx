import { useState, useRef } from "react";

const UploadIcon = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-slate-400">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function UploadModal({ onClose, onSave }) {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleSave() {
    if (!preview) { setError("Please select an image first."); return; }
    onSave({ src: preview, title: title.trim() });
    onClose();
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-[modalIn_.25s_cubic-bezier(.32,.72,0,1)]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Upload Image</h2>
            <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, WEBP · max 10 MB</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Drop zone / Preview */}
          <div
            onClick={() => !preview && inputRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden
              ${preview ? "border-transparent cursor-default" : "cursor-pointer"}
              ${dragging ? "border-indigo-400 bg-indigo-50 scale-[1.01]" : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"}
            `}
            style={{ minHeight: 200 }}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
                <button
                  onClick={() => { setPreview(null); inputRef.current.value = ""; }}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  <CloseIcon />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-12">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center">
                  <UploadIcon />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-600">Drop image here or <span className="text-indigo-500">browse</span></p>
                  <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files[0])}
          />

          {/* Title field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
              Title <span className="font-normal normal-case tracking-normal text-slate-300">(optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSave()}
              placeholder="e.g. Summer Campaign 2025"
              maxLength={60}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-indigo-500 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-200"
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}