export function Header() {
  return (
    <header className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">AI Web Scrapper</h1>
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Gemini-Powered Extraction</p>
        </div>
      </div>
    </header>
  );
}
