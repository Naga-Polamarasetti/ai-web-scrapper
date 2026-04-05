interface ScrapeFormProps {
  url: string;
  setUrl: (url: string) => void;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  loading: boolean;
  onScrape: () => void;
}

export function ScrapeForm({
  url,
  setUrl,
  userPrompt,
  setUserPrompt,
  loading,
  onScrape,
}: ScrapeFormProps) {
  const isFormValid = url && userPrompt.length >= 15;

  return (
    <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="space-y-4">
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Target URL</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Prompt Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="prompt" className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Extraction Prompt</label>
            <span className="text-[10px] text-neutral-600 font-mono">{userPrompt.length}/300</span>
          </div>
          <textarea
            id="prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Describe exactly what you want to extract... (e.g., 'Extract all product names and their current prices')"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[120px] resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onScrape}
          disabled={loading || !isFormValid}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-600 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Scraping & Analyzing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Extract Data</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
