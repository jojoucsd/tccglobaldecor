import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 py-4 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="font-semibold text-lg tracking-tight">
        TCC Carpets
      </Link>
      <nav className="space-x-6 text-sm font-medium">
        <Link href="/#about" className="hover:text-amber-600 transition-colors">About</Link>
        <Link href="/projects" className="hover:text-amber-600 transition-colors">Projects</Link>
        <Link href="/#capability" className="hover:text-amber-600 transition-colors">Capability</Link>
        <Link href="/library" className="hover:text-amber-600 transition-colors">Library</Link>
        <Link href="/collaborations" className="hover:text-amber-600 transition-colors">Collaborations</Link>
        <Link href="/connect" className="hover:text-amber-600 transition-colors">Connect</Link>
      </nav>
    </header>
  );
}



