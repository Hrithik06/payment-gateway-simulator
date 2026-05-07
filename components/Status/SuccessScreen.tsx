"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CircleCheckBig, ScrollText } from "lucide-react";

import { resetPayment } from "@/store/paymentSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SuccessScreen() {
  const { currency, amount, transactionId, lastFourDigits } = useAppSelector(
    (store) => store.payment,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  //For Focus Management
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  return (
    <div className="flex items-center justify-center px-6 py-10 ">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col justify-center items-center gap-6">
        <div className="bg-green-300/30 p-6 rounded-3xl">
          <CircleCheckBig size={40} className="text-green-600" />
        </div>
        <h2
          className="text-xl lg:text-2xl font-semibold text-white"
          ref={headingRef}
          tabIndex={-1}
        >
          Payment Successful
        </h2>
        <p className="text-xs lg:text-sm text-zinc-400">
          Your transaction has been processed.
        </p>
        <div className="w-full border-t border-zinc-500"></div>
        <div className="w-10/11 flex flex-col gap-4 ">
          <div className="flex items-center justify-between gap-2">
            <p className="shrink-0 text-zinc-400">Amount</p>
            <p className="truncate text-right">{`${currency === "INR" ? "₹" : "$"} ${amount}`}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="shrink-0 text-zinc-400">Trans ID</p>

            <p className="truncate text-right">{transactionId}</p>
          </div>
        </div>
        <p className="text-sm text-zinc-400">Paid with •••• {lastFourDigits}</p>

        <button
          className="cursor-pointer w-11/12 rounded-lg bg-green-600 hover:bg-green-500 py-3 text-white flex items-center justify-center text-sm lg:text-base"
          onClick={() => dispatch(resetPayment())}
        >
          Make a New Payment
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
