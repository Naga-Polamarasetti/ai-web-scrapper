import { useState } from 'react';
import { Header } from './components/header';
import { ScrapeForm } from './components/scrape-form';
import { ErrorDisplay } from './components/error-display';
import { ResultViewer } from './components/result-viewer';

interface ScrapeResult {
  [key: string]: unknown;
}

interface ErrorState {
  title: string;
  message: string;
  suggestion?: string;
}

export function App() {
  const [url, setUrl] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const handleScrape = async () => {
    if (!url || !userPrompt) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 min timeout

      const response = await fetch('http://localhost:3333/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, userPrompt }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok) {
        setError({
          title: data.error || 'Extraction Failed',
          message: data.message || data.details || 'The scraper could not process this request.',
          suggestion: data.suggestion,
        });
        return;
      }
      setResult(data);
    } catch (err: unknown) {
      setError({
        title: 'Connection Error',
        message: err instanceof Error ? err.message : 'Unable to connect to the backend.',
        suggestion: 'Ensure the API server is running on port 3333.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-8">
        <ScrapeForm
          url={url}
          setUrl={setUrl}
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          loading={loading}
          onScrape={handleScrape}
        />

        {error && (
          <ErrorDisplay
            title={error.title}
            message={error.message}
            suggestion={error.suggestion}
          />
        )}

        {result && !loading && (
          <ResultViewer
            result={result as Record<string, unknown>}
            onCopy={handleCopy}
          />
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-neutral-900 text-center">
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-medium italic">
          Playwright & Gemini & Express & React
        </p>
      </footer>
    </div>
  );
}

export default App;
