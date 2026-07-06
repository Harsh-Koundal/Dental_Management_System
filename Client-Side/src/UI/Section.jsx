import { useInView } from '@/libs/hooks';
import { B } from '@/data/constants';

export const Section = ({ children, id, className = "", style = {} }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`} style={style}>{children}</section>
);

export const Container = ({ children, className = "" }) => (
  <div className={`max-w-[1240px] mx-auto px-6 md:px-12 ${className}`}>{children}</div>
);

export const SectionHead = ({ tag, title, sub, light = false }) => {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className="text-center mb-12"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}
    >
      <span
        className="inline-block rounded-full px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{ background: light ? "rgba(255,255,255,0.12)" : "rgba(243, 113, 33, 0.1)", color: light ? "white" : "#f37121" }}
      >
        {tag}
      </span>
      <h2
        className="font-black mt-4 mb-4 leading-tight tracking-tight"
        style={{ fontSize: "clamp(28px,4vw,42px)", color: light ? "white" : "#1565c0" }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-base leading-relaxed max-w-lg mx-auto opacity-75" style={{ color: light ? "white" : B.muted }}>
          {sub}
        </p>
      )}
    </div>
  );
};
