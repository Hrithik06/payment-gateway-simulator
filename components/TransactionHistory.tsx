"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, useSyncExternalStore } from "react";
import TransactionRow from "./TransactionRow";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { resetPayment } from "@/store/paymentSlice";
import { useRouter } from "next/navigation";

type Filter = "all" | "success" | "failed" | "timeout";

export default function TransactionHistory() {
  const history = useAppSelector((store) => store.payment.history);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(5);

  const filtered =
    filter === "all" ? history : history.filter((t) => t.status === filter);

  const visible = filtered.slice(0, visibleCount);
  const mounted = useSyncExternalStore(
    () => () => {}, //no-op nothing to subscribe
    () => true, //client always true mounted
    () => false, //server snapshot return false not mounted
  );
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 lg:gap-6">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex gap-2 items-center">
            <MoveLeft className="text-blue-300" size={16} />
            <span className="text-sm lg:text-base">Back</span>
          </div>
        </Link>
        <button
          className="bg-green-600/70 rounded px-2 lg:px-4 py-1.5 text-sm lg:text-base font-semibold cursor-pointer"
          onClick={() => {
            dispatch(resetPayment());
            router.push("/");
          }}
        >
          + New Payment
        </button>
      </div>
      <div>
        <h1 className="text-xl lg:text-2xl font-semibold text-white">
          Transactions
        </h1>
        <p className="text-sm text-zinc-400">Recent activity and status.</p>
      </div>

      {/* filter pills */}
      <div className="flex gap-2">
        {(["all", "success", "failed", "timeout"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setVisibleCount(5);
            }}
            className={`px-4 py-1.5 rounded-full text-sm capitalize ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* transactions */}
      {mounted && (
        <div className="flex flex-col gap-3">
          {visible.map((t) => (
            <TransactionRow key={`${t.id}-${t.timestamp}`} transaction={t} />
          ))}
        </div>
      )}
      {/* load more */}
      {visibleCount < filtered.length && (
        <button
          onClick={() => setVisibleCount((v) => v + 5)}
          className="text-sm text-zinc-400 mx-auto"
        >
          Load More ↓
        </button>
      )}
    </div>
  );
}
