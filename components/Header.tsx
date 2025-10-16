export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 py-4 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <h1 className="font-semibold text-lg tracking-tight">TCC Carpets</h1>
      <nav className="space-x-6 text-sm font-medium">
        <a href="/#about" className="hover:text-amber-600 transition-colors">About</a>
        <a href="/projects" className="hover:text-amber-600 transition-colors">Projects</a>
        <a href="/#capability" className="hover:text-amber-600 transition-colors">Capability</a>
        <a href="/library" className="hover:text-amber-600 transition-colors">Library</a>
        <a href="/collaborations" className="hover:text-amber-600 transition-colors">Collaborations</a>
        <a href="/connect" className="hover:text-amber-600 transition-colors">Connect</a>
      </nav>
    </header>
  );
}


