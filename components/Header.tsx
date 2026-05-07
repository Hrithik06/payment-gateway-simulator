import { BadgeQuestionMark, LockKeyhole } from "lucide-react";

export default function Header() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold tracking-widest">PAYCORE</h1>
      </div>
      <span className="flex gap-4">
        <a href="#">
          <button className="hover:cursor-pointer" aria-label="Help">
            <BadgeQuestionMark />
          </button>
        </a>
        <a href="#">
          <button
            className="hover:cursor-pointer"
            aria-label="Secure connection"
          >
            <LockKeyhole />
          </button>
        </a>
      </span>
    </>
  );
}
