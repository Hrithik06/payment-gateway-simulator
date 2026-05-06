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
import { useEffect, useState } from "react";
import { CardType, PaymentFormInputs } from "@/types";
import { useAppSelector } from "@/store/hooks";

import { usePaymentFlow } from "@/hooks/usePaymentFlow";

export default function CardInput() {
  const [cardType, setCardType] = useState<CardType>("unknown");
  const { processPayment } = usePaymentFlow();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<PaymentFormInputs>({ mode: "onChange" });
  const currency = useWatch({ control, name: "currency" });
  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    await processPayment(data);
  };
  const status = useAppSelector((store) => store.payment.status);

  useEffect(() => {
    if (status === "success") reset();
  }, [status, reset]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border border-red-500 rounded-2xl p-4 bg-gray-500 text-black"
    >
      <div className="flex flex-col p-2">
        <label htmlFor="amountId">Amount to Pay</label>
        <span className="flex">
          <label htmlFor="currencyId" className="sr-only">
            Currency
          </label>
          <select
            id="currencyId"
            aria-describedby="currency-error"
            {...register("currency", currencyRules)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
          <input
            id="amountId"
            aria-describedby="amount-error"
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
        </span>
        {errors.currency && (
          <span id="currency-error" role="alert">
            ⚠ {errors.currency.message}
          </span>
        )}
        {errors.amount && (
          <span id="amount-error" role="alert">
            ⚠ {errors.amount.message}
          </span>
        )}
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="cardHolderNameId">Card Holder Name</label>
        <input
          id="cardHolderNameId"
          {...register("cardHolderName", cardHolderNameRules)}
          placeholder="Name on Card"
          aria-describedby="cardName-error"
        />
        {errors.cardHolderName && (
          <span id="cardName-error" role="alert">
            ⚠ {errors.cardHolderName.message}
          </span>
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
              setCardType(getCardType(e.target.value));
            },
          })}
          placeholder="0000 0000 0000 0000"
          aria-describedby="cardNumber-error"
        />
        {errors.cardNumber && (
          <span id="cardNumber-error" role="alert">
            ⚠ {errors.cardNumber.message}
          </span>
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
          aria-describedby="cvv-error"
        />
        {errors.cvv && (
          <span id="cvv-error" role="alert">
            ⚠ {errors.cvv.message}
          </span>
        )}
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
          aria-describedby="expiryDate-error"
        />
        {errors.expiryDate && (
          <span id="expiryDate-error" role="alert">
            ⚠ {errors.expiryDate.message}
          </span>
        )}
      </div>
      <button type="submit">Pay</button>
    </form>
  );
}
