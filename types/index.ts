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
