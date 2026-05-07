"use client";

import { CardType } from "@/types";
import { getCardLogo } from "@/utils/getCardLogo";
import Image from "next/image";

type Props = {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: CardType;
};
export default function CardPreview({
  cardNumber,
  cardHolderName,
  expiryDate,
  cardType,
}: Props) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-zinc-900 p-6 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <p className="text-sm text-zinc-400">PAYCORE</p>

        <div className="flex h-10 w-16 items-center justify-end">
          <Image
            src={getCardLogo(cardType)}
            alt={cardType}
            width={64}
            height={40}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <div className="text-2xl tracking-widest mb-6">
        {cardNumber || "0000 0000 0000 0000"}
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-zinc-400 mb-1">Card Holder</p>
          <p>{cardHolderName || "JOHN DOE"}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400 mb-1">Expires</p>
          <p>{expiryDate || "MM/YY"}</p>
        </div>
      </div>
    </div>
  );
}
