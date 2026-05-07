import { Transaction } from "@/types";

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { id, amount, currency, status, timestamp } = transaction;

  const statusStyles = {
    success: "bg-green-500/20 text-green-400",
    failed: "bg-red-500/20 text-red-400",
    timeout: "bg-amber-500/20 text-amber-400",
  };

  const formattedDate = new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
  });

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-zinc-400 font-mono">{id.slice(0, 8)}...</p>
        <p className="text-xs text-zinc-500">{formattedDate}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-sm text-white">
          {currency === "INR" ? "₹" : "$"} {amount}
        </p>
        <span
          className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
