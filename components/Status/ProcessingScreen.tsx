"use client";

import { LockKeyhole } from "lucide-react";

export default function ProcessingScreen() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        {/*spinner*/}
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />

        <h1 className="mb-3 text-2xl font-semibold text-white">
          Processing Payment
        </h1>

        <p className="text-sm text-zinc-400">
          Please do not close this window while we securely process your
          transaction.
        </p>

        <p className="mt-8 text-xs text-zinc-500 flex gap-2 items-center justify-center">
          <LockKeyhole size={14} />
          <span>Secure encrypted session</span>
        </p>
      </div>
    </div>
  );
}
