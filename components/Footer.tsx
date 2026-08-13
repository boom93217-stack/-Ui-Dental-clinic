export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-sm text-slate-500 sm:flex-row sm:text-left sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} WE DESIGN SMILES. All rights reserved.</p>
        <p>123 Smile Avenue, Wellness District, Springfield, ST 12345</p>
      </div>
    </footer>
  );
}
