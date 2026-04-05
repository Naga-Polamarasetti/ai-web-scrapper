interface ErrorDisplayProps {
  title: string;
  message: string;
  suggestion?: string;
}

export function ErrorDisplay({ title, message, suggestion }: ErrorDisplayProps) {
  return (
    <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-red-300">{title}</h3>
      </div>
      <p className="text-sm text-neutral-400 leading-relaxed pl-11">{message}</p>
      {suggestion && (
        <div className="mt-4 flex items-start gap-3 bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl ml-11">
          <span className="text-xs mt-0.5">💡</span>
          <div className="space-y-1">
            <p className="font-bold text-amber-500 uppercase tracking-widest text-[10px]">Suggestion</p>
            <p className="text-xs text-amber-200/80 leading-relaxed">{suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
