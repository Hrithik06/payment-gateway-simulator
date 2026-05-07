import { Payload, PaymentState, Transaction } from "@/types";
import { loadHistory } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const persistedHistory = loadHistory();
const initialState = {
  transactionId: null,
  currency: "INR",
  amount: null,
  lastFourDigits: null,
  status: "idle",
  attempt: 0,
  reason: null,
  history: persistedHistory || [],
} satisfies PaymentState as PaymentState;

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    submitPayment(
      state,
      action: PayloadAction<{
        transactionId: string;
        lastFourDigits: string;
        currency: string;
        amount: string;
      }>,
    ) {
      state.transactionId = action.payload.transactionId;
      state.lastFourDigits = action.payload.lastFourDigits;
      state.status = "processing";
      state.currency = action.payload.currency;
      state.amount = action.payload.amount;
    },
    paymentSuccess(state, action: PayloadAction<Payload>) {
      if (!state.transactionId) return;
      state.status = "success";
      const { amount, currency } = action.payload;
      const transaction: Transaction = {
        id: state.transactionId,
        amount,
        currency,
        status: "success",
        reason: null,
        timestamp: new Date().toISOString(),
      };

      state.history = [transaction, ...state.history];

      localStorage.setItem("transactions", JSON.stringify(state.history));
    },
    paymentFailure(state, action: PayloadAction<Payload>) {
      if (!state.transactionId) return;
      const { amount, currency, reason } = action.payload;
      state.status = "failed";
      state.reason = reason ?? "Unknown reason";
      state.attempt += 1;
      if (state.attempt >= 3) state.status = "locked";
      const transaction: Transaction = {
        id: state.transactionId,
        amount,
        currency,
        status: "failed",
        reason: state.reason,
        timestamp: new Date().toISOString(),
      };

      state.history = [transaction, ...state.history];

      localStorage.setItem("transactions", JSON.stringify(state.history));
    },
    paymentTimeout(state, action: PayloadAction<Payload>) {
      if (!state.transactionId) return;
      const { amount, currency } = action.payload;
      state.status = "timeout";
      state.attempt += 1;
      if (state.attempt >= 3) state.status = "locked";
      const transaction: Transaction = {
        id: state.transactionId,
        amount,
        currency,
        status: "timeout",
        reason: "Request timed out",
        timestamp: new Date().toISOString(),
      };
      state.history = [transaction, ...state.history];

      localStorage.setItem("transactions", JSON.stringify(state.history));
    },
    retryPayment(state) {
      state.status = "processing";
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
  retryPayment,
  resetPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
