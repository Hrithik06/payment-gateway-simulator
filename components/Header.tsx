import { BadgeQuestionMark, LockKeyhole } from "lucide-react";

// Header.tsx
export default function Header() {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-widest">PAYCORE</h1>
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
