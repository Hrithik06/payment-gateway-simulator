"use client";
type Props = {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: string;
};
export default function CardPreview({
  cardNumber,
  cardHolderName,
  expiryDate,
  cardType,
}: Props) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-zinc-900 p-6 text-white shadow-lg">
      <div className="flex justify-between items-start mb-10">
        <span className="text-sm text-zinc-400">PAYCORE</span>
        <span className="uppercase text-sm">{cardType}</span>
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
