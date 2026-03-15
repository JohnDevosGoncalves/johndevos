import Link from "next/link";
import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="J.Devos"
            width={32}
            height={30}
            className="h-8 w-auto"
          />
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            J.Devos
          </span>
        </Link>
        <Link
          href="/#contact"
          className="text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium hover:opacity-90 transition-opacity"
        >
          Démarrer un projet
        </Link>
      </div>
    </header>
  );
}
