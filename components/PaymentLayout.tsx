"use client";

import { useAppSelector } from "@/store/hooks";
import ProcessingScreen from "./Status/ProcessingScreen";
import Header from "./Header";
import Footer from "./Footer";
import StatusScreen from "./Status/StatusScreen";

export default function PaymentLayout() {
  const status = useAppSelector((state) => state.payment.status);

  if (status === "processing") {
    return <ProcessingScreen />; // no header, no footer
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 ">
      <header className="w-full border-b border-zinc-800 bg-zinc-950 px-16 py-6 flex justify-between">
        <Header />
      </header>

      <main className="flex-1 px-6 py-10">
        <StatusScreen />
      </main>

      <footer className="w-full border-t border-zinc-800 bg-zinc-950 px-16 py-6 flex justify-between">
        <Footer />
      </footer>
    </div>
  );
}
