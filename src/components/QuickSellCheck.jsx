import { useState, useMemo } from 'react'
import { allItems } from '../data'

const categoryConfig = {
  sell: {
    label: 'SELL IT',
    color: 'text-[#00e676]',
    bg: 'bg-[#00e676]/10 border-[#00e676]/30',
    icon: '💰',
    desc: 'This is a trade item — sell immediately!',
  },
  keep: {
    label: 'KEEP IT',
    color: 'text-[#ffab00]',
    bg: 'bg-[#ffab00]/10 border-[#ffab00]/30',
    icon: '📦',
    desc: 'Keep a good stock of this resource.',
  },
  never: {
    label: 'NEVER SELL!',
    color: 'text-[#ff3d71]',
    bg: 'bg-[#ff3d71]/10 border-[#ff3d71]/30',
    icon: '🚫',
    desc: 'This item is essential — do not sell!',
  },
  safe: {
    label: 'SAFE TO SELL',
    color: 'text-sky-400',
    bg: 'bg-sky-900/20 border-sky-500/30',
    icon: '✅',
    desc: 'Keep ~250, sell the rest.',
  },
}

export default function QuickSellCheck() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()
    return allItems.filter(item => item.name.toLowerCase().includes(q)).slice(0, 5)
  }, [query])

  return (
    <div className="bg-[#080f2a] border border-[#00e5ff]/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">⚡</span>
        <h3 className="font-bold text-[#00e5ff] text-sm uppercase tracking-wider">Quick Sell Check</h3>
      </div>
      <p className="text-slate-400 text-xs mb-3">Type an item name to instantly see if you should sell or keep it</p>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Gravitino Ball, Warp Cell..."
          className="w-full bg-[#0d1a3e] border border-[#00e5ff]/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#00e5ff]/70 focus:ring-1 focus:ring-[#00e5ff]/30 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {query.length >= 2 && results.length === 0 && (
        <div className="mt-3 text-center text-slate-500 text-sm py-3">
          No item found matching "{query}"
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-3 space-y-2 animate-fade-in-up">
          {results.map(item => {
            const cfg = categoryConfig[item.category]
            return (
              <div key={item.name} className={`rounded-lg border p-3 ${cfg.bg}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-sm">{item.name}</span>
                  <span className={`text-xs font-bold ${cfg.color} flex items-center gap-1`}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">{item.detail}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
