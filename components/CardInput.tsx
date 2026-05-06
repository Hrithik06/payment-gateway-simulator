"use client";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import {
  formatCardNumber,
  formatExpiryDate,
  formatCVV,
  formatAmount,
  stripAmountFormatting,
  formatRawAmount,
} from "@/utils/formatting";

import {
  cardHolderNameRules,
  cardNumberRules,
  amountRules,
  currencyRules,
  expiryDateRules,
  getCvvRules,
} from "@/utils/validation";
import { getCardType } from "@/utils/cardType";
import { useState } from "react";
import { CardType, PaymentFormInputs } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import {
  paymentFailure,
  paymentSuccess,
  paymentTimeout,
  submitPayment,
} from "@/store/paymentSlice";

export default function CardInput() {
  const [cardType, setCardType] = useState<CardType>("unknown");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<PaymentFormInputs>({ mode: "onChange" });
  const currency = useWatch({ control, name: "currency" });
  const amount = useWatch({ control, name: "amount" });
  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    const transactionId = crypto.randomUUID();
    const bodyData = { transactionId, ...data };
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), 6000);
    try {
      submitPayment({ transactionId });
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        signal: controller.signal,
      });
      const result = await response.json();
      if (result.status === "success") {
        dispatch(paymentSuccess({ amount, currency }));
        reset();
      }
      if (result.status === "failed") {
        const { reason } = result;
        dispatch(paymentFailure({ amount, currency, reason }));
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.error("Request timed out");
          dispatch(paymentTimeout({ amount, currency }));
        }
      }
    } finally {
      clearTimeout(timerId); // Important: stop the timer
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border border-red-500 rounded-2xl p-4 bg-gray-500 text-black"
    >
      <div className="flex flex-col p-2">
        <label htmlFor="amountId">Amount to Pay</label>
        <span className="flex">
          <select id="currencyId" {...register("currency", currencyRules)}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
          <input
            id="amountId"
            {...register("amount", {
              ...amountRules,
              onChange: (e) => {
                e.target.value = formatRawAmount(e.target.value);
              },
              onBlur: (e) => {
                e.target.value = formatAmount(e.target.value, currency);
              },
            })}
            onFocus={(e) => {
              e.target.value = stripAmountFormatting(e.target.value);
            }}
          />
          {errors.amount && <span className="">⚠ {errors.amount.message}</span>}
        </span>
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="cardHolderNameId">Card Holder Name</label>
        <input
          id="cardHolderNameId"
          {...register("cardHolderName", cardHolderNameRules)}
          placeholder="Name on Card"
        />
        {errors.cardHolderName && (
          <span className="">⚠ {errors.cardHolderName.message}</span>
        )}
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="cardNumberId">Card Number</label>
        <input
          id="cardNumberId"
          {...register("cardNumber", {
            ...cardNumberRules,
            onChange: (e) => {
              e.target.value = formatCardNumber(e.target.value);
              // const cardType = getCardType(e.target.value);
              setCardType(getCardType(e.target.value));
              // use cardType to show badge in card preview
            },
          })}
          placeholder="0000 0000 0000 0000"
        />
        {errors.cardNumber && (
          <span className="">⚠ {errors.cardNumber.message}</span>
        )}
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="cvvId">CVV</label>
        <input
          id="cvvId"
          {...register("cvv", {
            ...getCvvRules(cardType),
            onChange: (e) => {
              e.target.value = formatCVV(e.target.value, cardType);
            },
          })}
          placeholder={cardType === "amex" ? "1234" : "123"}
        />
        {errors.cvv && <span className="">⚠ {errors.cvv.message}</span>}
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="expiryDateId">Expiry Date</label>
        <input
          id="expiryDateId"
          {...register("expiryDate", {
            ...expiryDateRules,
            onChange: (e) => {
              e.target.value = formatExpiryDate(e.target.value);
            },
          })}
          placeholder="MM/YY"
        />
        {errors.expiryDate && (
          <span className="">⚠ {errors.expiryDate.message}</span>
        )}
      </div>
      <button type="submit">Pay</button>
    </form>
  );
}
