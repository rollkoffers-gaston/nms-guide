import { useMemo } from 'react'
import { itemDatabase } from '../data'

const verdictConfig = {
  sell: {
    emoji: '🟢',
    label: 'SELL IT',
    color: 'text-[#00e676]',
    bg: 'bg-[#00e676]/10 border-[#00e676]/40',
    badgeBg: 'bg-[#00e676]/20 text-[#00e676]',
  },
  never: {
    emoji: '🔴',
    label: 'NEVER SELL',
    color: 'text-[#ff3d71]',
    bg: 'bg-[#ff3d71]/10 border-[#ff3d71]/40',
    badgeBg: 'bg-[#ff3d71]/20 text-[#ff3d71]',
  },
  keep: {
    emoji: '🟡',
    label: 'KEEP SOME',
    color: 'text-[#ffab00]',
    bg: 'bg-[#ffab00]/10 border-[#ffab00]/40',
    badgeBg: 'bg-[#ffab00]/20 text-[#ffab00]',
  },
  safe: {
    emoji: '🔵',
    label: 'SELL EXCESS',
    color: 'text-sky-400',
    bg: 'bg-sky-900/20 border-sky-500/40',
    badgeBg: 'bg-sky-900/30 text-sky-400',
  },
}

function fuzzyMatch(itemName, query) {
  const name = itemName.toLowerCase()
  const q = query.toLowerCase()
  if (name.includes(q)) return 100 - Math.abs(name.length - q.length)
  // Check if all query chars appear in order
  let qi = 0
  let score = 0
  for (let i = 0; i < name.length && qi < q.length; i++) {
    if (name[i] === q[qi]) { qi++; score++ }
  }
  if (qi === q.length) return Math.floor((score / name.length) * 60)
  return 0
}

export default function QuickSellCheck({ searchQuery, onSearchChange, inputRef }) {
  const query = searchQuery || ''

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()

    const scored = itemDatabase
      .map(item => {
        const score = fuzzyMatch(item.name, q)
        return { ...item, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)

    // Deduplicate by name (keep highest score)
    const seen = new Set()
    const deduped = []
    for (const item of scored) {
      const key = item.name.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        deduped.push(item)
      }
    }
    return deduped.slice(0, 6)
  }, [query])

  const hasExactMatch = results.length > 0 && results[0].score >= 80
  const hasFuzzyOnly = results.length > 0 && !hasExactMatch
  const noMatch = query.length >= 2 && results.length === 0

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00e5ff]/60 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Item eingeben... (z.B. Geode, Ferrite, Chlorine)"
          className="w-full bg-[#0d1a3e] border-2 border-[#00e5ff]/40 rounded-2xl pl-12 pr-12 py-4 text-white text-base placeholder-slate-500 focus:outline-none focus:border-[#00e5ff]/80 focus:ring-2 focus:ring-[#00e5ff]/20 transition-all"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#00e5ff]/10 text-slate-400 hover:text-white hover:bg-[#00e5ff]/20 transition-all"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      {query.length >= 2 && (
        <div>
          {/* Result count */}
          {results.length > 0 && (
            <p className="text-[11px] text-slate-500 mb-3 px-1">
              {hasExactMatch ? '✓ Match gefunden' : `${results.length} ähnliche Ergebnisse`}
            </p>
          )}

          {/* Fuzzy label */}
          {hasFuzzyOnly && (
            <p className="text-[11px] text-[#ffab00]/70 mb-2 px-1">Ähnliche Treffer:</p>
          )}

          {/* Items */}
          <div className="space-y-2">
            {results.map((item) => {
              const cfg = verdictConfig[item.verdict]
              return (
                <div key={item.name} className={`rounded-xl border p-3 ${cfg.bg} transition-all`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold text-sm flex-1">{item.name}</span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg whitespace-nowrap ${cfg.badgeBg}`}>
                      {cfg.emoji} {item.label}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{item.reason}</p>
                </div>
              )
            })}
          </div>

          {/* Not found */}
          {noMatch && (
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4 text-center">
              <p className="text-2xl mb-2">❓</p>
              <p className="text-slate-300 text-sm font-medium">Nicht im Guide</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Wenn es als "Trade"-Item markiert ist → <span className="text-[#00e676]">verkaufen</span>.<br />
                Wenn es ein normales Resource ist → <span className="text-[#ffab00]">behalten</span> bis du genug hast.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hint when empty */}
      {!query && (
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '🟢 Sofort verkaufen', examples: 'Gravitino Ball, Storm Crystal, Gek Relic…' },
            { label: '🔴 Nie verkaufen', examples: 'Warp Cell, Nanites, Salvaged Data…' },
            { label: '🟡 Ein bisschen behalten', examples: 'Ferrite, Oxygen, Sodium…' },
            { label: '🔵 Überschuss verkaufen', examples: 'Gold, Silver, Pugneum…' },
          ].map(h => (
            <div key={h.label} className="bg-[#080f2a]/60 rounded-xl p-3 border border-[#00e5ff]/10">
              <p className="text-xs font-semibold text-slate-300 mb-1">{h.label}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed">{h.examples}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
