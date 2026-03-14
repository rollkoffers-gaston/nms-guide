import { refinerData } from '../data'

function matchesRecipe(recipe, query) {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    recipe.input.toLowerCase().includes(q) ||
    recipe.output.toLowerCase().includes(q) ||
    recipe.notes.toLowerCase().includes(q)
  )
}

export default function RefinersSection({ searchQuery }) {
  const filtered = refinerData.filter(r => matchesRecipe(r, searchQuery))

  if (searchQuery && filtered.length === 0) {
    return <div className="text-slate-500 text-sm text-center py-6">No recipes match your search</div>
  }

  return (
    <div className="space-y-3">
      <p className="text-slate-500 text-xs mb-2">
        Use a Medium or Large Refiner for best results. Portable Refiner works for single-ingredient recipes.
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {filtered.map((recipe, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 transition-all duration-200 hover:brightness-110 ${
              recipe.highlight
                ? 'bg-yellow-500/10 border border-yellow-500/30'
                : 'card-default neon-border'
            }`}
          >
            {recipe.highlight && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-black text-yellow-400">🏆 MONEY PRINTER</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              {/* Input */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Input</p>
                <p className="text-white font-mono text-sm font-bold leading-tight">{recipe.input}</p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <svg className="w-5 h-5 text-[#00e5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              {/* Output */}
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Output</p>
                <p className={`font-mono text-sm font-bold leading-tight ${recipe.highlight ? 'text-yellow-400' : 'text-[#00e5ff]'}`}>
                  {recipe.output}
                </p>
              </div>
            </div>

            <p className={`mt-2 text-xs ${recipe.highlight ? 'text-yellow-300/80' : 'text-slate-500'}`}>
              {recipe.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
