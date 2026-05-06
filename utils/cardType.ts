import { CardType } from "@/types";
export const getCardType = (cardNumber: string): CardType => {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.startsWith("34") || digits.startsWith("37")) return "amex";
  if (digits.startsWith("4")) return "visa";
  if (digits.startsWith("5") || digits.startsWith("2")) return "mastercard";
  if (digits.startsWith("6")) return "discover";
  return "unknown";
};
