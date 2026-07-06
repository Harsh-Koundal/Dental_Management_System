import { Check, X } from "lucide-react";
import { Section, Container, SectionHead } from "@/UI/Section";
import { B, COMPARISON } from "@/data/constants";
import { useInView } from "@/libs/hooks";

export default function ComparisonSection() {
  const [ref, vis] = useInView(0.1);

  return (
    <Section id="comparison" className="bg-white">
      <Container>
        <SectionHead
          tag="Treatment Comparison"
          title="Clear Aligners vs Braces"
          sub="Comparing orthodontic options to help you make the best choice for your smile journey."
        />

        {/* Comparison Table */}
        <div
          ref={ref}
          className="rounded-3xl shadow-lg overflow-hidden border"
          style={{
            borderColor: B.border,
            backgroundColor: "white",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(32px)",
          }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-3 text-white pt-6 sm:pt-10 pb-6 sm:pb-8 px-2 sm:px-6 md:px-12 items-end gap-2 sm:gap-4"
            style={{ backgroundColor: B.navy }}
          >
            <div className="col-span-1 flex flex-col justify-end">
              <span className="text-cyan-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-2 block hidden sm:block">
                Comparison
              </span>
              <h3 className="font-black text-sm sm:text-2xl md:text-3xl uppercase tracking-tight">
                Features
              </h3>
            </div>

            {COMPARISON.treatmentTypes.map((type, idx) => (
              <div
                key={type.id}
                className={`col-span-1 flex flex-col items-center gap-2 sm:gap-3 h-full justify-end`}
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 overflow-hidden shadow-xl"
                  style={{ borderColor: type.accentColor }}
                >
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-black text-[10px] sm:text-sm md:text-lg uppercase tracking-wide text-white text-center leading-tight">
                  {type.name}
                </span>
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y" style={{ borderColor: B.border }}>
            {COMPARISON.features.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 items-stretch gap-0"
                style={{ backgroundColor: idx % 2 === 0 ? "white" : "#f9fafb" }}
              >
                {/* Feature Label */}
                <div
                  className="col-span-1 py-3 sm:py-6 px-2 sm:px-6 md:px-12 flex items-center border-r"
                  style={{ borderColor: B.border }}
                >
                  <span
                    className="font-bold text-[10px] sm:text-base md:text-lg uppercase tracking-wide"
                    style={{ color: B.navy }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Treatment columns */}
                {item.values.map((value, colIdx) => (
                  <div
                    key={colIdx}
                    className={`col-span-1 flex justify-center items-center py-3 sm:py-6 px-2 sm:px-6 ${
                      colIdx > 0 ? "border-l" : ""
                    }`}
                    style={{ borderColor: B.border }}
                  >
                    {typeof value === "boolean" ? (
                      <div
                        className="p-1.5 sm:p-2 rounded-full shadow-lg"
                        style={{
                          backgroundColor: value ? "#10b981" : "#ef4444",
                          boxShadow: `0 4px 6px ${value ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                        }}
                      >
                        {value ? (
                          <Check className="w-3 h-3 sm:w-5 sm:h-5 text-white stroke-[3]" />
                        ) : (
                          <X className="w-3 h-3 sm:w-5 sm:h-5 text-white stroke-[3]" />
                        )}
                      </div>
                    ) : (
                      <span
                        className="font-bold text-[10px] sm:text-sm md:text-base uppercase tracking-wide text-center"
                        style={{ color: B.blue }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
