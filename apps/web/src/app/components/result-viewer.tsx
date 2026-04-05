interface ResultViewerProps {
  result: Record<string, unknown>;
  onCopy: () => void;
}

export function ResultViewer({ result, onCopy }: ResultViewerProps) {
  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Extracted Data</h3>
        <button 
          onClick={onCopy}
          className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy JSON
        </button>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <pre className="p-6 overflow-x-auto text-sm font-mono text-indigo-200 leading-relaxed max-h-[500px] scroll-smooth selection:bg-indigo-500/30">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
