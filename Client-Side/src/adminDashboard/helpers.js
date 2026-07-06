import { MONTHS } from "./constants";

export const currentMonthLabel = () => {
  const d = new Date();
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const fmtDate = (value) => new Date(value).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
