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
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <header className="sticky top-0 z-10 w-full flex justify-between items-center px-6 py-4">
        <Header />
      </header>

      <main className="flex-1 p-10">
        <main className="flex-1 p-10">
          <StatusScreen />
        </main>
      </main>

      <footer className="sticky bottom-0 w-full flex justify-between items-center p-6">
        <Footer />
      </footer>
    </div>
  );
}
