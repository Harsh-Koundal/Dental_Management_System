import { Link } from "react-router-dom";
import { B } from "@/data/constants";
import { Section, Container, SectionHead } from "@/UI/Section";
import { CheckCircle } from "lucide-react";
import HomeOurTreatments from "@/components/landingpage/OurTreatments";

const Treatments = () => {
  return (
    <div className="pt-24 min-h-screen bg-[#f8fbfe]">
      <HomeOurTreatments />
      <Section className="bg-white">
        <Container>
          <SectionHead
            tag="Why Precision Matters"
            title="Specialist Selection"
            sub="Correct diagnosis is the foundation of a successful orthodontic journey."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Expert MDS Specialist",
              "Digital 3D Planning",
              "Predictable Outcomes",
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-brand hover:text-white transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand mb-6 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-all">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-xl font-black mb-4 tracking-tight uppercase group-hover:text-white">
                  {item}
                </h4>
                <p className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                  We ensures medical standard safety and surgical grade results
                  for every patient Case.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Treatments;
