export const initialPatients = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "+1 (555) 234-5678", activeTreatment: "Teeth Whitening", status: "Active", avatar: null, currentMonthProgress: 75, dob: "1990-04-12", notes: "Sensitive gums, use gentle whitening formula." },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", phone: "+1 (555) 876-5432", activeTreatment: "Dental Implants", status: "Active", avatar: null, currentMonthProgress: 40, dob: "1985-11-03", notes: "Post-op check every 3 months." },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", phone: "+1 (555) 345-6789", activeTreatment: "Invisalign", status: "Completed", avatar: null, currentMonthProgress: 100, dob: "1998-07-22", notes: "Retainer required nightly." },
  { id: 4, name: "Robert Martinez", email: "robert.m@email.com", phone: "+1 (555) 654-3210", activeTreatment: "Root Canal", status: "Missed", avatar: null, currentMonthProgress: 20, dob: "1976-01-30", notes: "Needs reminder calls." },
  { id: 5, name: "Aisha Patel", email: "aisha.p@email.com", phone: "+1 (555) 789-0123", activeTreatment: "Veneers", status: "Active", avatar: null, currentMonthProgress: 60, dob: "1993-09-15", notes: "Upper arch only." },
  { id: 6, name: "James Wilson", email: "j.wilson@email.com", phone: "+1 (555) 012-3456", activeTreatment: "Gum Contouring", status: "Completed", avatar: null, currentMonthProgress: 100, dob: "1982-06-08", notes: "Follow-up aesthetic review pending." },
];

export const treatmentOptions = [
  "Teeth Whitening",
  "Dental Implants",
  "Invisalign",
  "Root Canal",
  "Veneers",
  "Gum Contouring",
];

export const MONTHS = [
  "January","February","March","April","May","June","July","August","September","October","November","December",
];

export const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);
