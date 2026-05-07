import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <header className="w-full border-b border-zinc-800 px-16 py-6 flex justify-between">
        <Header />
      </header>
      <main className="flex-1 px-6 py-10">{children}</main>
      <footer className="w-full border-t border-zinc-800 px-16 py-6 flex justify-between">
        <Footer />
      </footer>
    </div>
  );
}
