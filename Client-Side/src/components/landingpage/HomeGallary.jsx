import { Section, Container, SectionHead } from '@/UI/Section';
import { GALLERY } from '@/data/constants';
import { useInView } from '@/libs/hooks';

function HomeGallary() {
  return (
    <Section id="gallery" className="bg-[#fff]">
      <Container>
        <SectionHead
          tag="Smile Gallery"
          title="Clinical Transformations"
          sub="Witness the power of precision orthodontics through our real patient results."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY.map((item, i) => {
            const [ref, vis] = useInView(0.1);
            return (
              <div
                key={item.id}
                ref={ref}
                className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(32px)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Case Study #{item.id}</span>
                    <h4 className="text-white font-black text-2xl tracking-tight">{item.title}</h4>
                  </div>
                </div>
                
                {/* Result Tag */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  Post-Treatment Result
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default HomeGallary;
