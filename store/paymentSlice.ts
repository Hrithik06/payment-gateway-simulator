import { PaymentStatus, Transaction } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const loadHistory = () => {
  try {
    const serializedHistory = localStorage.getItem("transactions");
    if (serializedHistory === null) return undefined; // Let reducers handle initial state
    return JSON.parse(serializedHistory);
  } catch (err) {
    return undefined;
  }
};

interface PaymentState {
  transactionId: string | null;
  status: PaymentStatus;
  attempt: number;
  reason: string | null;
  history: Transaction[];
}

interface Payload {
  amount: string;
  currency: string;
  reason?: string;
}

const persistedHistory = loadHistory();
const initialState = {
  transactionId: null,
  status: "idle",
  attempt: 0,
  reason: null,
  history: persistedHistory || [],
} satisfies PaymentState as PaymentState;

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    submitPayment(state, action: PayloadAction<{ transactionId: string }>) {
      state.transactionId = action.payload.transactionId;
      state.status = "processing";
    },
    paymentSuccess(state, action: PayloadAction<Payload>) {
      if (!state.transactionId) return;
      state.status = "success";
      const { amount, currency } = action.payload;
      state.history = [
        {
          id: state.transactionId,
          amount,
          currency,
          status: "success",
          reason: null,
          timestamp: new Date().toISOString(),
        },
        ...state.history,
      ];

      localStorage.setItem("transactions", JSON.stringify(state.history));
    },
    paymentFailure(state, action: PayloadAction<Payload>) {
      if (!state.transactionId) return;
      const { amount, currency, reason } = action.payload;
      state.status = "failed";
      state.reason = reason ?? "Unknown reason";
      state.attempt += 1;
      if (state.attempt >= 3) state.status = "locked";
      state.history = [
        {
          id: state.transactionId,
          amount,
          currency,
          status: "failed",
          reason: state.reason,
          timestamp: new Date().toISOString(),
        },
        ...state.history,
      ];

      localStorage.setItem("transactions", JSON.stringify(state.history));
    },
    paymentTimeout(state, action: PayloadAction<Payload>) {
      if (!state.transactionId) return;
      const { amount, currency } = action.payload;
      state.status = "timeout";
      state.attempt += 1;
      if (state.attempt >= 3) state.status = "locked";
      state.history = [
        {
          id: state.transactionId,
          amount,
          currency,
          status: "timeout",
          reason: "Request timed out",
          timestamp: new Date().toISOString(),
        },
        ...state.history,
      ];

      localStorage.setItem("transactions", JSON.stringify(state.history));
    },
    resetPayment(state) {
      state.status = "idle";
      state.transactionId = null;
      state.attempt = 0;
      state.reason = null;
    },
  },
});

export const {
  paymentSuccess,
  paymentFailure,
  paymentTimeout,
  submitPayment,
  resetPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
