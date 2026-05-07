"use client";
interface FailureScreenProps {
  variant: "failed" | "timeout";
}

import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import { useAppSelector } from "@/store/hooks";
import { CircleAlert, RotateCcw, ScrollText, ClockAlert } from "lucide-react";

import { useRouter } from "next/navigation";

export default function FailureScreen({ variant }: FailureScreenProps) {
  const { retryPayment } = usePaymentFlow();
  const { reason, attempt, lastFourDigits } = useAppSelector(
    (store) => store.payment,
  );
  const router = useRouter();
  const handleRetry = async () => {
    await retryPayment();
  };
  return (
    <div className="flex items-center justify-center px-6 py-10 ">
      <div
        className={`w-full max-w-sm rounded-2xl border bg-zinc-900 p-8 flex flex-col justify-center items-center gap-6 ${variant === "timeout" ? "border-amber-300/30" : "border-red-300/30"}`}
      >
        <div
          className={`p-6 rounded-3xl ${variant === "timeout" ? "bg-amber-300/30" : "bg-red-300/30"}`}
        >
          {variant === "failed" && (
            <CircleAlert size={40} className="text-red-600" />
          )}
          {variant === "timeout" && (
            <ClockAlert size={40} className="text-amber-500" />
          )}
        </div>
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          Payment <span className="capitalize">{variant}</span>
        </h2>
        <p className="text-xs lg:text-sm text-red-400">{reason}</p>
        <div className="w-full border-t border-zinc-500"></div>
        <div className="px-8 py-3 border border-zinc-500 ">
          Attempt {attempt} of 3
        </div>
        {/*<div className="w-10/11 flex flex-col gap-4 ">
          <div className="flex items-center justify-between gap-2">
            <p className="shrink-0 text-zinc-400">Amount</p>
            <p className="truncate text-right">{`${currency === "INR" ? "₹" : "$"} ${amount}`}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="shrink-0 text-zinc-400">Trans ID</p>

            <p className="truncate text-right">{transactionId}</p>
          </div>
        </div>*/}
        <p className="text-sm text-zinc-400">
          Attempted with •••• {lastFourDigits}
        </p>
        <button
          className="cursor-pointer w-11/12 rounded-lg bg-zinc-700 hover:bg-zinc-600 py-3 text-white flex gap-2 items-center justify-center text-sm lg:text-base"
          onClick={handleRetry}
        >
          <span>Retry</span>
          <RotateCcw size={16} />
        </button>
        <button
          className="cursor-pointer w-11/12 rounded-lg bg-blue-600 hover:bg-blue-500 py-3 text-white flex items-center gap-2 justify-center text-sm lg:text-base"
          onClick={() => router.push("/history")}
        >
          <span>Transaction History</span>
          <ScrollText size={16} />
        </button>
      </div>
    </div>
  );
}
