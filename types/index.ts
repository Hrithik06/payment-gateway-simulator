export type PaymentStatus =
  | "idle"
  | "processing"
  | "success"
  | "failed"
  | "timeout"
  | "locked";

export type Transaction = {
  id: string;
  amount: string;
  currency: string;
  status: "success" | "failed" | "timeout";
  reason: string | null;
  timestamp: string;
};
export type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";
export type PaymentFormInputs = {
  amount: string;
  currency: string;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
};
