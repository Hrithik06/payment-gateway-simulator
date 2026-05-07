import { ScrollText } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold tracking-widest">PAYCORE</h1>
      </div>

      <Link
        href="/history"
        className="text-base text-zinc-400 hover:text-white"
      >
        <span className="flex items-center gap-2">
          History
          <ScrollText size={16} />
        </span>
      </Link>
    </>
  );
}
