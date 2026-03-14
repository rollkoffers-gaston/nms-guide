import { moneyMakingData } from '../data'

const badgeColors = {
  gold: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  green: 'bg-[#00e676]/15 text-[#00e676] border-[#00e676]/30',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  teal: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
}

function matchesMethod(method, query) {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    method.title.toLowerCase().includes(q) ||
    method.requirements.toLowerCase().includes(q) ||
    method.profit.toLowerCase().includes(q) ||
    method.steps.some(s => s.toLowerCase().includes(q)) ||
    (method.recipe || '').toLowerCase().includes(q)
  )
}

function MethodCard({ method, index }) {
  return (
    <div className="card-default rounded-xl overflow-hidden neon-border hover:brightness-110 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-3 border-b border-[#00e5ff]/10">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-sm font-black text-[#00e5ff]">
          {method.rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-xl">{method.icon}</span>
            <h3 className="font-bold text-white text-sm">{method.title}</h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColors[method.badgeColor]}`}>
            {method.badge}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Requirements & recipe */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-slate-500 text-xs w-20 flex-shrink-0">Requires:</span>
            <span className="text-slate-300 text-xs">{method.requirements}</span>
          </div>
          {method.recipe && (
            <div className="flex items-start gap-2">
              <span className="text-slate-500 text-xs w-20 flex-shrink-0">Recipe:</span>
              <span className="font-mono text-[#00e5ff] text-xs">{method.recipe}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <span className="text-slate-500 text-xs w-20 flex-shrink-0">Profit:</span>
            <span className="text-[#00e676] font-bold text-xs">{method.profit}</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-1.5">
          {method.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-slate-400 text-xs">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MoneyMakingSection({ searchQuery }) {
  const filtered = moneyMakingData.filter(m => matchesMethod(m, searchQuery))

  if (searchQuery && filtered.length === 0) {
    return <div className="text-slate-500 text-sm text-center py-6">No money-making methods match your search</div>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map((method, i) => (
        <MethodCard key={method.id} method={method} index={i} />
      ))}
    </div>
  )
}
