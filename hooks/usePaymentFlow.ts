"use client";
import { useAppDispatch } from "@/store/hooks";
import {
  paymentFailure,
  paymentSuccess,
  paymentTimeout,
  submitPayment,
} from "@/store/paymentSlice";
import { PaymentFormInputs } from "@/types";

export const usePaymentFlow = () => {
  const dispatch = useAppDispatch();

  const processPayment = async (data: PaymentFormInputs) => {
    const transactionId = crypto.randomUUID();
    const lastFourDigits = data.cardNumber.replace(/\s/g, "").slice(-4);
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), 6000);

    dispatch(submitPayment({ transactionId, lastFourDigits }));

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, ...data }),
        signal: controller.signal,
      });

      const result = await response.json();

      if (result.status === "success") {
        dispatch(
          paymentSuccess({ amount: data.amount, currency: data.currency }),
        );
      }
      if (result.status === "failed") {
        dispatch(
          paymentFailure({
            amount: data.amount,
            currency: data.currency,
            reason: result.reason,
          }),
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        dispatch(
          paymentTimeout({ amount: data.amount, currency: data.currency }),
        );
      }
    } finally {
      clearTimeout(timerId);
    }
  };

  return { processPayment };
};
