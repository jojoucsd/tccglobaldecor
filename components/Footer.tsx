export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} TCC Carpets. All rights reserved.
    </footer>
  );
}