/* ─── BRAND COLORS ───────── */
export const B = {
  navy: "#0a3d7c",
  blue: "#1565c0",
  cyan: "#24b7d2",
  orange: "#f37121",
  white: "#ffffff",
  offWhite: "#f4f8fd",
  light: "#e0f7fa",
  text: "#1a1a2e",
  muted: "#5a6a85",
  border: "#d0dff5",
};

/* ─── CLINICAL CASES BY TREATMENT ───────────────────────────────────────────── */
export const METAL_BRACES_CASES = [
  {
    image: "/images/Dental Crowding + Gingivitis-image.png",
    title: "Crowding + Coil Spring",
    desc: "This shows braces with a coil spring used to treat crowded teeth. The gums look red, which may indicate gingivitis (gum inflammation) caused by difficulty cleaning around braces.",
  },
  {
    image: "/images/Severe Crowding + Plaque Risk-image.png",
    title: "Severe Crowding",
    desc: "Lower teeth braces showing severe crowding. Overlapping teeth increase risk of plaque buildup, cavities, and gum disease.",
  },
  {
    image: "/images/Malocclusion (Misaligned Teeth)-image.png",
    title: "Malocclusion Correction",
    desc: "Top view of braces correcting malocclusion (misaligned teeth). The goal is to bring teeth into proper alignment and improve bite.",
  },
];

export const CERAMIC_BRACES_CASES = [
  {
    image: "/images/Space Loss -Future Crowding-image.png",
    title: "Space Maintenance",
    desc: "Ceramic braces used with a lingual arch appliance to maintain space in teeth and prevent future crowding.",
  },
  {
    image: "/images/Tooth Spacing _Alignment Issue-image.png",
    title: "Spacing & Alignment",
    desc: "Ceramic braces with springs to fix spacing issues and achieve proper tooth alignment with aesthetic appeal.",
  },
  {
    image: "/images/Malocclusion (Misaligned Teeth)-image.png",
    title: "Aesthetic Correction",
    desc: "Clear ceramic braces correcting misaligned teeth while maintaining a natural appearance.",
  },
];

export const ALIGNERS_CASES = [
  {
    image: "/images/Narrow Upper Jaw (Maxillary Constriction)-image.png",
    title: "Jaw Expansion",
    desc: "Clear aligners combined with expansion appliances to treat a narrow upper jaw and correct crossbite.",
  },
  {
    image: "/images/Tooth Spacing _Alignment Issue-image.png",
    title: "Invisible Alignment",
    desc: "Clear aligners are virtually invisible while fixing spacing issues and aligning teeth effectively.",
  },
  {
    image: "/images/Dental Crowding + Gingivitis-image.png",
    title: "Mild Crowding Solution",
    desc: "Clear aligners used to treat mild crowding with better oral hygiene compared to traditional braces.",
  },
];

export const RETAINERS_CASES = [
  {
    image: "/images/Space Loss -Future Crowding-image.png",
    title: "Lingual Arch Retainer",
    desc: "Custom lingual arch retainer maintains the lower teeth position and prevents future crowding.",
  },
  {
    image: "/images/Malocclusion (Misaligned Teeth)-image.png",
    title: "Bite Retention",
    desc: "Fixed retainer keeps corrected bite in optimal position after treatment completion.",
  },
  {
    image: "/images/Severe Crowding + Plaque Risk-image.png",
    title: "Relapse Prevention",
    desc: "Combined fixed and removable retainers prevent teeth from shifting back to original positions.",
  },
];

export const TREATMENTS = [
  {
    id: "metal",
    icon: "🦷",
    title: "Metal Braces",
    image: "/images/metal-braces.jpg",
    detailImage: "/images/metal.jpg",
    desc: "Traditional, reliable and cost-effective. Best for complex cases with precise control.",
    duration: "18–24 months",
    tag: "Most Popular",
    fullDesc:
      "Metal braces are the most common type of orthodontic treatment. They are made of high-quality stainless steel and are more comfortable today than ever before. With metal braces, you can choose the color of your elastics for a unique and colorful smile.",
    clinicalCases: METAL_BRACES_CASES,
    benefits: [
      {
        title: "Maximum Effectiveness",
        desc: "Best for complex cases requiring precise tooth control and movement. Handles severe crowding, overbite, underbite, and spacing issues with excellent results.",
      },
      {
        title: "Cost-Effective",
        desc: "Most affordable orthodontic option. Provides excellent value without compromising on quality or treatment outcomes.",
      },
      {
        title: "Durable & Reliable",
        desc: "High-grade stainless steel brackets withstand daily wear. Proven track record with thousands of successful treatments.",
      },
      {
        title: "Customizable Style",
        desc: "Choose colored elastics to match your personality. Make your treatment a fun, expressive experience.",
      },
    ],
  },
  {
    id: "ceramic",
    icon: "✨",
    title: "Ceramic Braces",
    image: "/images/ceramic-braces.jpg",
    detailImage: "/images/ceramic-braces.jpg",
    desc: "Tooth-coloured brackets that blend naturally. Effective treatment with a discreet look.",
    duration: "18–24 months",
    tag: "Aesthetic Choice",
    fullDesc:
      "Ceramic braces are made of clear materials and are therefore less visible on your teeth than metal braces. For this reason, ceramic braces are used mainly on older teenagers and adult patients who have aesthetic concerns.",
    clinicalCases: CERAMIC_BRACES_CASES,
    benefits: [
      {
        title: "Nearly Invisible",
        desc: "Tooth-colored brackets blend seamlessly with your natural teeth. Perfect for professionals and those concerned about appearance.",
      },
      {
        title: "Effective Treatment",
        desc: "Equally effective as metal braces for most cases. Delivers same precision control and reliable results.",
      },
      {
        title: "Comfortable Fit",
        desc: "Smooth ceramic material causes less irritation to lips and gums. Comfortable to wear daily for extended orthodontic care.",
      },
      {
        title: "Professional Look",
        desc: "Maintain your confident appearance throughout treatment. Ideal for adults in professional environments.",
      },
    ],
  },
  {
    id: "aligners",
    icon: "🔵",
    title: "Clear Aligners",
    image: "/images/clear-braces.jpg",
    detailImage: "/images/hero-section-image3.png",
    desc: "Removable, virtually invisible trays. Ideal for mild to moderate corrections.",
    duration: "12–18 months",
    tag: "Most Discreet",
    fullDesc:
      "Clear aligners are a series of invisible, removable, and comfortable acrylic trays that straighten your teeth like braces. Not only are the aligners invisible, they are removable, so you can eat and drink what you want while in treatment, plus brushing and flossing are less of a hassle.",
    clinicalCases: ALIGNERS_CASES,
    benefits: [
      {
        title: "Virtually Invisible",
        desc: "Transparent aligners are practically undetectable. Straighten your teeth without anyone knowing you're in treatment.",
      },
      {
        title: "Removable for Freedom",
        desc: "Take them out to eat, drink, and clean your teeth. No dietary restrictions or complicated cleaning routines.",
      },
      {
        title: "Faster Results",
        desc: "Modern aligner technology delivers results in 12-18 months. Shorter treatment time compared to traditional braces.",
      },
      {
        title: "Comfortable & Convenient",
        desc: "No sharp brackets or wires. Smooth acrylic trays provide maximum comfort while you go about your daily life.",
      },
    ],
  },

  {
    id: "retainers",
    icon: "🔄",
    title: "Retainers",
    image: "/images/Malocclusion (Misaligned Teeth)-image.png",
    detailImage: "/images/Malocclusion (Misaligned Teeth)-image.png",
    desc: "Post-treatment retention appliances to keep your new smile in place.",
    duration: "Ongoing",
    tag: "Maintenance",
    fullDesc:
      "Retainers are custom-made devices, usually made of wires or clear plastic, that hold teeth in position after surgery or any method of realigning teeth. Once your braces are removed, your teeth can shift back to their original position. Retainers are used to prevent this from happening.",
    clinicalCases: RETAINERS_CASES,
    benefits: [
      {
        title: "Prevent Relapse",
        desc: "Stop teeth from shifting back to their original positions. Protect your beautiful smile investment long-term.",
      },
      {
        title: "Fixed or Removable Options",
        desc: "Choose between fixed bonded retainers or removable Essix retainers based on your lifestyle and preferences.",
      },
      {
        title: "Permanent Results",
        desc: "Proper retainer use ensures your straighter smile lasts a lifetime. Maintain your investment with years of wear.",
      },
      {
        title: "Simple Maintenance",
        desc: "Retainers require minimal upkeep. Just clean daily and wear as directed for effortless long-term wear.",
      },
    ],
  },
];

/* ─── CLINICAL CASES (FOR HOMEPAGE) ───────────────────────────────────────────── */
export const CLINICAL_CASES = [
  {
    image: "/images/Dental Crowding + Gingivitis-image.png",
    title: "Crowding + Coil Spring",
    desc: "This shows braces with a coil spring used to treat crowded teeth. The gums look red, which may indicate gingivitis (gum inflammation) caused by difficulty cleaning around braces.",
  },
  {
    image: "/images/Narrow Upper Jaw (Maxillary Constriction)-image.png",
    title: "Palatal Expander",
    desc: "This image shows a palatal expander, used to treat a narrow upper jaw. It helps widen the jaw and correct problems like crossbite.",
  },
  {
    image: "/images/Malocclusion (Misaligned Teeth)-image.png",
    title: "Malocclusion Correction",
    desc: "Top view of braces correcting malocclusion (misaligned teeth). The goal is to bring teeth into proper alignment and improve bite.",
  },
  {
    image: "/images/Space Loss -Future Crowding-image.png",
    title: "Lingual Arch Appliance",
    desc: "This shows a lingual arch appliance, used to maintain space in the lower teeth. It prevents future crowding when permanent teeth are coming in.",
  },
  {
    image: "/images/Tooth Spacing _Alignment Issue-image.png",
    title: "Spacing & Springs",
    desc: "Braces with a spring mechanism used to fix spacing issues or gaps between teeth. It helps in closing or creating space for proper alignment.",
  },
  {
    image: "/images/Severe Crowding + Plaque Risk-image.png",
    title: "Severe Crowding",
    desc: "Lower teeth braces showing severe crowding. Overlapping teeth increase risk of plaque buildup, cavities, and gum disease.",
  },
];

/* ─── PROCESS ───────────────────────────────────────────── */
export const PROCESS = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Book your first visit. We assess your teeth, take X-rays and discuss your goals.",
  },
  {
    step: "02",
    title: "Treatment Plan",
    desc: "Receive a personalised plan with timeline, options and transparent pricing.",
  },
  {
    step: "03",
    title: "Begin Treatment",
    desc: "Braces or aligners are fitted. Your smile journey officially starts!",
  },
  {
    step: "04",
    title: "Monthly Check-ups",
    desc: "Regular adjustments every 4–6 weeks. We track your progress with photos.",
  },
  {
    step: "05",
    title: "Reveal Your Smile",
    desc: "Braces off! Retainers fitted. Welcome to your new, confident smile.",
  },
];

/* ─── FAQS ───────────────────────────────────────────── */
export const FAQS = [
  {
    q: "At what age should my child see an orthodontist?",
    a: "Children should have their first orthodontic evaluation by age 7. Early assessment helps identify issues before they become complex.",
  },
  {
    q: "Does orthodontic treatment hurt?",
    a: "You may feel mild pressure for 2–3 days after each adjustment, but it's manageable with OTC pain relief. This fades quickly as your teeth adapt.",
  },
  {
    q: "How long does braces treatment take?",
    a: "Most treatments take 12–24 months depending on the complexity of the case. We give you a realistic timeline at your consultation.",
  },
  {
    q: "Can adults get braces?",
    a: "Absolutely! Nearly 30% of our patients are adults. It's never too late to get a beautiful, healthy smile.",
  },
  {
    q: "What foods should I avoid with braces?",
    a: "Avoid hard, sticky, and chewy foods like popcorn, hard candy, and chewing gum. Soft foods are best during treatment.",
  },
  {
    q: "How much does treatment cost?",
    a: "Costs vary by treatment type and complexity. We offer transparent pricing and flexible EMI options. Contact us for a personalised quote.",
  },
];

/* ─── STATS ───────────────────────────────────────────── */
export const STATS = [
  { value: "500+", label: "Smiles Transformed" },
  { value: "2+", label: "Years of Excellence" },
  { value: "MDS", label: "Orthodontics Specialist" },
  { value: "100%", label: "Personalised Care" },
];

export const TESTIMONIALS = [
  {
    name: "Priya Mahapatra",
    loc: "Balasore",
    stars: 5,
    text: "Dr. Panda is incredibly skilled and patient. My ceramic braces treatment was smooth and the results exceeded my expectations!",
    treatment: "Ceramic Braces",
    months: 18,
    avatar: "PM",
  },
  {
    name: "Rajan Swain",
    loc: "Bhadrak",
    stars: 5,
    text: "My daughter's treatment was handled with such expertise and care. The monthly progress photos really helped us track the journey.",
    treatment: "Metal Braces",
    months: 24,
    avatar: "RS",
  },
  {
    name: "Anusha Behera",
    loc: "Balasore",
    stars: 5,
    text: "Clear aligners changed my life. Barely visible, very comfortable. I can't stop smiling now. Highly recommend Dr. Abinash Panda!",
    treatment: "Clear Aligners",
    months: 14,
    avatar: "AB",
  },
];

export const GALLERY = [
  {
    id: 1,
    title: "Smile Correction 1",
    img: "/images/1.jpeg",
  },
  {
    id: 2,
    title: "Smile Correction 2",
    img: "/images/2.png",
  },
  {
    id: 3,
    title: "Smile Correction 3",
    img: "/images/3.jpeg",
  },
  {
    id: 4,
    title: "Smile Correction 4",
    img: "/images/1.jpeg",
  },
  {
    id: 5,
    title: "Smile Correction 5",
    img: "/images/3.jpeg",
  },
  {
    id: 6,
    title: "Smile Correction 6",
    img: "/images/1.jpeg",
  },
];

export const COMPARISON = {
  treatmentTypes: [
    {
      id: "aligners",
      name: "Clear Aligners",
      accentColor: "#24b7d2",
      image: "/images/clear-braces.jpg",
    },
    {
      id: "braces",
      name: "Braces",
      accentColor: "#f37121",
      image: "/images/braces.jpeg",
    },
  ],
  features: [
    { label: "Virtually Invisible", values: [true, false] },
    { label: "Removable", values: [true, false] },
    { label: "Comfort", values: [true, false] },
    { label: "Special Diet", values: [false, true] },
    { label: "Ease of Cleaning", values: [true, false] },
    { label: "Complex Cases", values: [false, true] },
    { label: "Treatment Duration", values: ["12-18 months", "18-24 months"] },
    { label: "Cost", values: ["Higher", "Lower"] },
  ],
};

export const NAV_LINKS = [
  { name: "Treatments", path: "/treatments", hasDropdown: true },
  { name: "Process", path: "/process" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export const TREATMENT_OPTIONS = [
  {
    id: "metal",
    name: "Metal Braces",
    icon: "🦷",
    description: "Traditional & Cost-Effective",
  },
  {
    id: "ceramic",
    name: "Ceramic Braces",
    icon: "✨",
    description: "Aesthetic & Discreet",
  },
  {
    id: "aligners",
    name: "Clear Aligners",
    icon: "🔵",
    description: "Removable & Invisible",
  },
  {
    id: "retainers",
    name: "Retainers",
    icon: "🔄",
    description: "Maintenance & Retention",
  },
];
