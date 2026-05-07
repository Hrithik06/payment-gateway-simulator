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
    formState: { isValid, isDirty },
    control,
    setValue,
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
    <div className="flex flex-col lg:flex-row lg:justify-center gap-8 items-center">
      <div className="order-1 lg:order-2 w-full max-w-sm">
        <CardPreview
          cardNumber={watchedValues.cardNumber || ""}
          cardHolderName={watchedValues.cardHolderName || ""}
          expiryDate={watchedValues.expiryDate || ""}
          cardType={cardType}
        />
      </div>
      <div className="order-2 lg:order-1 w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-2xl border border-zinc-800 p-6"
        >
          <CardInput
            form={form}
            cardType={cardType}
            currency={watchedValues.currency || "INR"}
            setValue={setValue}
          />

          <button
            type="submit"
            disabled={!isDirty || !isValid || status === "processing"}
            className="mx-auto w-10/12 rounded-lg bg-white px-10 py-3 text-black disabled:opacity-50"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
