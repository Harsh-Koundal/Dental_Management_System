import React, { useEffect, useState } from "react";
import { Upload, X, ChevronDown, Trash } from "lucide-react";
import { MONTHS, YEARS } from "../constants";

export default function UploadModal({ onClose, onSave }) {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (rawFiles) => {
    const nextFiles = Array.from(rawFiles).map((file) => ({
      preview: URL.createObjectURL(file),
      month: MONTHS[new Date().getMonth()],
      year: new Date().getFullYear(),
      name: file.name,
    }));
    setFiles((prev) => [...prev, ...nextFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    addFiles(event.dataTransfer.files);
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const removed = prev[index];
      if (removed?.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const updateMeta = (index, key, value) =>
    setFiles((prev) => prev.map((file, idx) => (idx === index ? { ...file, [key]: value } : file)));

  const handleSave = () => {
    if (!files.length) return;
    const images = files.map((file) => ({
      url: file.preview,
      month: `${file.month} ${file.year}`,
      uploadedAt: new Date(),
    }));
    onSave(images);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-white">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Upload Images</h2>
            <p className="text-xs text-slate-500 mt-0.5">Attach treatment progress photos with month labels</p>
          </div>
          <button onClick={onClose} className="rounded-2xl p-2 hover:bg-slate-100 transition">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <label
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-10 ${dragOver ? "border-teal-400 bg-teal-50 scale-[1.01]" : "border-slate-200 bg-slate-50 hover:border-teal-300 hover:bg-teal-50/50"}`}
          >
            <div className="h-14 w-14 rounded-2xl bg-teal-100 flex items-center justify-center">
              <Upload size={24} className="text-teal-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">Drop images here</p>
              <p className="text-xs text-slate-400 mt-0.5">or click to browse — PNG, JPG, WEBP</p>
            </div>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(event) => addFiles(event.target.files)} />
          </label>

          {files.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{files.length} image{files.length > 1 ? "s" : ""} queued</p>
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                    <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate mb-2">{file.name}</p>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select
                          value={file.month}
                          onChange={(event) => updateMeta(index, "month", event.target.value)}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-400 pr-7"
                        >
                          {MONTHS.map((month) => <option key={month}>{month}</option>)}
                        </select>
                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select
                          value={file.year}
                          onChange={(event) => updateMeta(index, "year", parseInt(event.target.value, 10))}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-400 pr-7"
                        >
                          {YEARS.map((year) => <option key={year}>{year}</option>)}
                        </select>
                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFile(index)} className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition flex-shrink-0">
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-slate-100 bg-slate-50/60">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!files.length}
            className={`rounded-2xl px-5 py-2.5 text-sm font-bold text-white transition flex items-center gap-2 ${files.length ? "bg-teal-500 hover:bg-teal-600 shadow-md shadow-teal-200" : "bg-slate-300 cursor-not-allowed"}`}
          >
            <Upload size={14} />
            Save {files.length > 0 ? `${files.length} Image${files.length > 1 ? "s" : ""}` : "Images"}
          </button>
        </div>
      </div>
    </div>
  );
}
