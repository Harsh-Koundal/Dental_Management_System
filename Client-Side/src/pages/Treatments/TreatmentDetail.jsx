import { useParams, Link, useNavigate } from "react-router-dom";
import { TREATMENTS, B } from "@/data/constants";
import { Section, Container } from "@/UI/Section";
import { Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const TreatmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const treatment = TREATMENTS.find((t) => t.id === id);

  if (!treatment) {
    return (
      <div className="pt-12 min-h-screen bg-[#f8fbfe] flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-4">
              Treatment Not Found
            </h1>
            <Link
              to="/treatments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-black rounded-xl hover:bg-opacity-90 transition-all"
            >
              <ArrowLeft size={20} />
              Back to Treatments
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbfe]">
      {/* Header Section */}
      <Section className="bg-white border-b border-slate-100">
        <Container>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 mb-8 text-brand hover:bg-brand/10 rounded-lg transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest mb-6">
                {treatment.tag}
              </span>
              <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none">
                {treatment.title}
              </h1>
              <p className="text-xl font-medium text-slate-600 mb-8 leading-relaxed italic border-l-4 border-brand pl-6">
                {treatment.desc}
              </p>
              <p className="text-lg text-slate-500 mb-10 leading-loose">
                {treatment.fullDesc}
              </p>

              {/* Duration & CTA Box */}
              <div className="p-8 rounded-[2.5rem] bg-brand text-white shadow-2xl flex items-center justify-between group">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">
                    Estimated Duration
                  </p>
                  <div className="flex items-center gap-3 text-2xl font-black tracking-tight">
                    <Clock size={28} /> {treatment.duration}
                  </div>
                </div>
                <Link
                  to="/appointment"
                  className="bg-white text-brand px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={treatment.detailImage}
                className="w-full h-full object-cover"
                alt={treatment.title}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <div className="text-white font-black text-3xl drop-shadow-lg">
                  100% Guaranteed
                  <br />
                  Clinical Precision
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-white">
        <Container>
          <div className="mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest mb-4">
              Key Features
            </span>
            <h2 className="text-5xl font-black text-slate-900 mb-4">
              Why Choose {treatment.title}?
            </h2>
            <p className="text-slate-600 font-medium text-lg max-w-3xl">
              Discover the unique advantages and benefits that make this
              treatment the right choice for your orthodontic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.benefits?.map((benefit, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand mb-6 flex items-center justify-center">
                  <CheckCircle size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-lg font-black mb-3 tracking-tight text-slate-900">
                  {benefit.title}
                </h4>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Clinical Case Studies */}
      <Section style={{ background: B.offWhite }}>
        <Container>
          <div className="mb-16">
            <div className="bg-brand inline-block rounded-full px-4 md:px-5 py-1 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white mb-4 md:mb-6">
              Clinical Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a3d7c] mb-4 tracking-tight">
              Case Visualizations
            </h2>
            <p className="text-slate-600 font-medium text-lg max-w-3xl">
              Explore real-world orthodontic scenarios and the appliances we use
              to achieve precision alignment for treatments like{" "}
              {treatment.title}.
            </p>
          </div>

          {/* Case Study Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatment.clinicalCases.map((caseItem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-[#0a3d7c] font-black text-xl mb-3 tracking-tight">
                    {caseItem.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {caseItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white border-t border-slate-100">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-slate-600 font-medium text-lg mb-8 max-w-2xl mx-auto">
              Schedule your free consultation today and discover how{" "}
              {treatment.title} can give you the confident smile you deserve.
            </p>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-brand text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
              Book Your Appointment
              <ArrowRight size={20} />
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default TreatmentDetail;
