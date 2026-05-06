"use client";

import { useForm, useWatch } from "react-hook-form";
import { PaymentFormInputs } from "@/types";

import CardInput from "./CardInput";
import CardPreview from "./CardPreview";

import { getCardType } from "@/utils/cardType";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export default function PaymentForm() {
  const form = useForm<PaymentFormInputs>({
    mode: "onChange",
  });

  const { processPayment } = usePaymentFlow();

  const status = useAppSelector((state) => state.payment.status);

  const {
    handleSubmit,
    reset,
    formState: { isValid },
    control,
  } = form;

  const watchedValues = useWatch({ control });

  const cardType = getCardType(watchedValues.cardNumber || "");

  const onSubmit = async (data: PaymentFormInputs) => {
    await processPayment(data);
  };

  useEffect(() => {
    if (status === "success") {
      reset();
    }
  }, [status, reset]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardInput form={form} cardType={cardType} />

        <button type="submit" disabled={!isValid || status === "processing"}>
          Pay Now
        </button>
      </form>
      <CardPreview
        cardNumber={watchedValues.cardNumber || "0000 0000 0000 0000"}
        cardHolderName={watchedValues.cardHolderName || "John Doe"}
        expiryDate={watchedValues.expiryDate || "01/99"}
        cardType={cardType}
      />
    </div>
  );
}
