import { quickTipsData } from '../data'

function matchesTip(tip, query) {
  if (!query) return true
  return tip.tip.toLowerCase().includes(query.toLowerCase())
}

function matchesTech(tech, query) {
  if (!query) return true
  const q = query.toLowerCase()
  return tech.name.toLowerCase().includes(q) || tech.why.toLowerCase().includes(q)
}

export default function QuickTipsSection({ searchQuery }) {
  const filteredTips = quickTipsData.tips.filter(t => matchesTip(t, searchQuery))
  const filteredTech = quickTipsData.techToInstall.filter(t => matchesTech(t, searchQuery))

  const hasResults = filteredTips.length > 0 || filteredTech.length > 0

  if (searchQuery && !hasResults) {
    return <div className="text-slate-500 text-sm text-center py-6">No tips match your search</div>
  }

  return (
    <div className="space-y-6">
      {/* Quick Tips */}
      {filteredTips.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tips & Tricks</h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {filteredTips.map((item, i) => (
              <div key={i} className="card-default rounded-xl p-3.5 neon-border hover:brightness-110 transition-all duration-200 flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="text-slate-300 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Essential Tech */}
      {filteredTech.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Essential Tech to Install</h3>
          <div className="space-y-2.5">
            {filteredTech.map((tech, i) => (
              <div key={i} className="card-default rounded-xl p-3.5 neon-border flex items-start gap-3 hover:brightness-110 transition-all duration-200">
                <div className="w-6 h-6 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] text-xs font-black flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{tech.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{tech.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
