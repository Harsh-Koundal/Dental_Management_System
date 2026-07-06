import React, { useState } from "react";
import { Upload, ImageIcon, ZoomIn, Trash, X, Star } from "lucide-react";
import { currentMonthLabel, fmtDate } from "../helpers";
import { MONTHS } from "../constants";

export default function GallerySection({ images, onDelete, onUpload }) {
  const [filterMonth, setFilterMonth] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const allMonths = [
    "All",
    ...Array.from(new Set(images.map((img) => img.month))).sort((a, b) => {
      const [ma, ya] = a.split(" ");
      const [mb, yb] = b.split(" ");
      return (+yb - +ya) || MONTHS.indexOf(mb) - MONTHS.indexOf(ma);
    }),
  ];

  const curLabel = currentMonthLabel();

  const visible = [...images]
    .filter((img) => filterMonth === "All" || img.month === filterMonth)
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Treatment Gallery</h3>
          <p className="text-xs text-slate-500 mt-0.5">{images.length} image{images.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={onUpload}
          className="flex items-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-teal-100 transition"
        >
          <Upload size={13} />
          Upload Images
        </button>
      </div>

      {allMonths.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allMonths.map((month) => (
            <button
              key={month}
              onClick={() => setFilterMonth(month)}
              className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold border transition-all ${filterMonth === month ? "bg-teal-500 text-white border-teal-500 shadow-sm" : month === curLabel ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
            >
              {month === curLabel && month !== "All" ? `★ ${month}` : month}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-slate-300">
          <ImageIcon size={40} />
          <p className="text-sm font-semibold text-slate-400">No images {filterMonth !== "All" ? `for ${filterMonth}` : "uploaded yet"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((img, index) => {
            const isCurrent = img.month === curLabel;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${isCurrent ? "border-amber-300 shadow-amber-100 shadow-md" : "border-slate-200"}`}
              >
                <div className="aspect-square overflow-hidden bg-slate-100 cursor-zoom-in" onClick={() => setLightbox(img)}>
                  <img src={img.url} alt={img.month} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                {isCurrent && (
                  <div className="absolute top-2 left-2 bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider shadow-sm flex items-center gap-1">
                    <Star size={8} fill="white" />THIS MONTH
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-bold">{img.month}</p>
                      <p className="text-white/70 text-[10px]">{fmtDate(img.uploadedAt)}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setLightbox(img)}
                        className="p-1.5 rounded-xl bg-white/20 hover:bg-white/40 text-white transition backdrop-blur-sm"
                      >
                        <ZoomIn size={13} />
                      </button>
                      <button
                        onClick={() => onDelete(img)}
                        className="p-1.5 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`px-3 py-2 ${isCurrent ? "bg-amber-50" : "bg-white"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 truncate">{img.month}</span>
                    <span className="text-[9px] text-slate-400">{fmtDate(img.uploadedAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg px-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white/70 hover:text-white transition p-2">
              <X size={24} />
            </button>
            <img src={lightbox.url} alt="Expanded" className="w-full rounded-3xl shadow-2xl max-h-[80vh] object-contain" />
            <div className="mt-4 text-center">
              <p className="text-white font-bold">{lightbox.month}</p>
              <p className="text-white/50 text-sm">Uploaded {fmtDate(lightbox.uploadedAt)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
