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
    <div>
      <div>{cardNumber}</div>
      <div>{cardHolderName}</div>
      <div>{expiryDate}</div>
      <div>{cardType}</div>
    </div>
  );
}
