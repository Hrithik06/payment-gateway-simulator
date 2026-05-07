import { CardType } from "@/types";

// export const formatCardNumber = (value: string): string => {
//   const digits = value.replace(/\D/g, "");
//   return (
//     digits
//       .match(/.{1,4}/g)
//       ?.join(" ")
//       .substring(0, 19) || ""
//   );
// };
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);

  return digits.match(/.{1,4}/g)?.join(" ") || "";
};
// export const formatExpiryDate = (value: string): string => {
//   const clean = value.replace(/\D/g, "");
//   return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
// };

export const formatExpiryDate = (value: string): string => {
  const clean = value.replace(/\D/g, "");

  if (clean.length <= 2) return clean;

  return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
};

export const formatCVV = (value: string, cardType: CardType): string => {
  return value.replace(/\D/g, "").substring(0, cardType === "amex" ? 4 : 3);
};

export const formatRawAmount = (value: string): string => {
  return value.replace(/[^\d.]/g, "").replace(/(\..*?)\..*/g, "$1");
};
export const formatAmount = (value: string, currency: string): string => {
  const number = parseFloat(value);
  if (isNaN(number)) return value;
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const stripAmountFormatting = (value: string): string => {
  return value.replace(/,/g, "");
};
