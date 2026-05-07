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

    dispatch(
      submitPayment({
        transactionId,
        lastFourDigits,
        currency: data.currency,
        amount: data.amount,
      }),
    );
    runPayment(transactionId, data.amount, data.currency);
  };
  const runPayment = async (
    txnId: string,
    amount: string,
    currency: string,
  ) => {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnId, amount, currency }),
        signal: controller.signal,
      });

      const result = await response.json();

      if (result.status === "success") {
        dispatch(paymentSuccess({ amount, currency }));
      }
      if (result.status === "failed") {
        dispatch(
          paymentFailure({
            amount,
            currency,
            reason: result.reason,
          }),
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        dispatch(paymentTimeout({ amount, currency }));
      }
    } finally {
      clearTimeout(timerId);
    }
  };
  return { processPayment };
};
