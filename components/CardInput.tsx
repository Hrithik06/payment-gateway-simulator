"use client";
import { UseFormReturn, UseFormSetValue, useWatch } from "react-hook-form";
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
import { CardType, PaymentFormInputs } from "@/types";
import {
  inputStyles,
  labelStyles,
  errorStyles,
  sectionStyles,
  selectStyles,
} from "@/utils/styles";
type Props = {
  form: UseFormReturn<PaymentFormInputs>;
  cardType: CardType;
  // currency: string;
  // setValue: UseFormSetValue<PaymentFormInputs>;
};
export default function CardInput({ form, cardType }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = form;
  const currency = useWatch({ control, name: "currency" });
  return (
    <div>
      <div className={sectionStyles}>
        <label className={labelStyles} htmlFor="amountId">
          Amount to Pay
        </label>
        <div className="flex gap-2">
          <label className={labelStyles + " sr-only"} htmlFor="currencyId">
            Currency
          </label>
          <select
            className={selectStyles}
            id="currencyId"
            aria-describedby="currency-error"
            {...register("currency", currencyRules)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
          <input
            className={inputStyles}
            id="amountId"
            aria-describedby="amount-error"
            {...register("amount", {
              ...amountRules,
              onChange: (e) => {
                // e.target.value = formatRawAmount(e.target.value);
                setValue("amount", formatRawAmount(e.target.value), {
                  shouldValidate: true,
                });
              },
              onBlur: (e) => {
                // e.target.value = formatAmount(e.target.value, currency);
                setValue("amount", formatAmount(e.target.value, currency), {
                  shouldValidate: true,
                });
              },
            })}
            onFocus={(e) => {
              e.target.value = stripAmountFormatting(e.target.value);
            }}
          />
        </div>
        {errors.currency && (
          <span id="currency-error" role="alert" className={errorStyles}>
            ⚠ {errors.currency.message}
          </span>
        )}
        {errors.amount && (
          <span id="amount-error" role="alert" className={errorStyles}>
            ⚠ {errors.amount.message}
          </span>
        )}
      </div>
      <div className={sectionStyles}>
        <label className={labelStyles} htmlFor="cardHolderNameId">
          Card Holder Name
        </label>
        <input
          className={inputStyles}
          id="cardHolderNameId"
          {...register("cardHolderName", cardHolderNameRules)}
          placeholder="Name on Card"
          aria-describedby="cardName-error"
        />
        {errors.cardHolderName && (
          <span id="cardName-error" role="alert" className={errorStyles}>
            ⚠ {errors.cardHolderName.message}
          </span>
        )}
      </div>
      <div className={sectionStyles}>
        <label className={labelStyles} htmlFor="cardNumberId">
          Card Number
        </label>
        <input
          className={inputStyles}
          id="cardNumberId"
          {...register("cardNumber", {
            ...cardNumberRules,
            onChange: (e) => {
              setValue("cardNumber", formatCardNumber(e.target.value), {
                shouldValidate: true,
              });
            },
          })}
          placeholder="0000 0000 0000 0000"
          aria-describedby="cardNumber-error"
        />
        {errors.cardNumber && (
          <span id="cardNumber-error" role="alert" className={errorStyles}>
            ⚠ {errors.cardNumber.message}
          </span>
        )}
      </div>
      <div className={sectionStyles}>
        <label className={labelStyles} htmlFor="cvvId">
          CVV
        </label>
        <input
          className={inputStyles}
          id="cvvId"
          {...register("cvv", {
            ...getCvvRules(cardType),
            onChange: (e) => {
              // e.target.value = formatCVV(e.target.value, cardType);
              setValue("cvv", formatCVV(e.target.value, cardType), {
                shouldValidate: true,
              });
            },
          })}
          placeholder={cardType === "amex" ? "1234" : "123"}
          aria-describedby="cvv-error"
        />
        {errors.cvv && (
          <span id="cvv-error" role="alert" className={errorStyles}>
            ⚠ {errors.cvv.message}
          </span>
        )}
      </div>
      <div className={sectionStyles}>
        <label className={labelStyles} htmlFor="expiryDateId">
          Expiry Date
        </label>
        <input
          className={inputStyles}
          id="expiryDateId"
          {...register("expiryDate", {
            ...expiryDateRules,
            onChange: (e) => {
              setValue("expiryDate", formatExpiryDate(e.target.value), {
                shouldValidate: true,
              });
            },
          })}
          placeholder="MM/YY"
          aria-describedby="expiryDate-error"
        />
        {errors.expiryDate && (
          <span id="expiryDate-error" role="alert" className={errorStyles}>
            ⚠ {errors.expiryDate.message}
          </span>
        )}
      </div>
    </div>
  );
}
