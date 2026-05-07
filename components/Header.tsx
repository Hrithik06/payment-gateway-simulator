import { BadgeQuestionMark, LockKeyhole, MoveLeft } from "lucide-react";
import Link from "next/link";

// Header.tsx
export default function Header() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <MoveLeft className="text-blue-300" />
        </Link>
        <h1 className="text-xl font-semibold tracking-widest">PAYCORE</h1>
      </div>
      <span className="flex gap-4">
        <button aria-label="Help">
          <BadgeQuestionMark />
        </button>
        <button aria-label="Secure connection">
          <LockKeyhole />
        </button>
      </span>
    </>
  );
}
