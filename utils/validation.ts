import { CardType } from "@/types";

const isCardExpired = (month: string, year: string): boolean => {
  const fullYear = parseInt("20" + year, 10);
  const expMonth = parseInt(month, 10);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return (
    fullYear < currentYear ||
    (fullYear === currentYear && expMonth < currentMonth)
  );
};

export const cardHolderNameRules = {
  required: "Name is required",
  minLength: { value: 2, message: "Name is too short" },
  pattern: {
    value: /^[a-zA-Z\s'\-.]+$/,
    message:
      "Name can only contain letters, spaces, hyphens, apostrophes, and dots",
  },
};

export const getCardNumberRules = (cardType: CardType) => ({
  required: "Card number is required",
  minLength: {
    value: cardType === "amex" ? 17 : 19, // 15+2 spaces vs 16+3 spaces
    message: "Enter a valid card number",
  },
});

export const getCvvRules = (cardType: CardType) => ({
  required: "CVV is required",
  minLength: {
    value: cardType === "amex" ? 4 : 3,
    message: "Invalid CVV",
  },
  maxLength: {
    value: cardType === "amex" ? 4 : 3,
    message: "Invalid CVV",
  },
});

export const amountRules = {
  required: "Amount is required",
};

export const currencyRules = {
  required: "Currency is required",
};

export const expiryDateRules = {
  required: "Expiry Date is required",
  validate: (value: string) => {
    if (value.length < 5) return "Enter a valid expiry date";
    const [month, year] = value.split("/");
    const expMonth = parseInt(month, 10);
    if (expMonth < 1 || expMonth > 12) return "Invalid month";
    return !isCardExpired(month, year) || "Card is expired";
  },
};
