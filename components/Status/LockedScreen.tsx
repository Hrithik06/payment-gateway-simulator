"use client";

import { useAppDispatch } from "@/store/hooks";
import { resetPayment } from "@/store/paymentSlice";
import { ScrollText, CircleX } from "lucide-react";

import { useRouter } from "next/navigation";

export default function LockedScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-center px-6 py-10 ">
      <div
        className={`w-full max-w-sm rounded-2xl border bg-zinc-900 p-8 flex flex-col justify-center items-center gap-6 border-red-300/30`}
      >
        <div className={`p-6 rounded-3xl bg-red-300/30`}>
          <CircleX size={40} className="text-red-500" />
        </div>
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          Transaction Declined
        </h2>
        <p className="text-xs lg:text-sm text-zinc-500 text-center w-11/12">
          Maximum retries exceeded. Please use a different payment method.
        </p>
        <div className="w-full border-t border-zinc-500"></div>

        <div className="w-10/11 flex flex-col gap-4 ">
          <div className="flex items-center justify-between gap-2">
            <p className="shrink-0 text-zinc-400">Status</p>
            <p className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium">
              Locked
            </p>
          </div>
        </div>

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
