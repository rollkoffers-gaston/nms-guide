import { shipsData } from '../data'

const classColors = {
  gray: { text: 'text-slate-400', bg: 'bg-slate-700/40', border: 'border-slate-600/40' },
  green: { text: 'text-[#00e676]', bg: 'bg-[#00e676]/10', border: 'border-[#00e676]/30' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  gold: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
}

function matchesShip(query) {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    shipsData.types.some(t => t.type.toLowerCase().includes(q) || t.bestFor.toLowerCase().includes(q) || t.special.toLowerCase().includes(q)) ||
    shipsData.classes.some(c => c.class.toLowerCase().includes(q) || c.quality.toLowerCase().includes(q)) ||
    shipsData.howToGet.some(h => h.method.toLowerCase().includes(q) || h.desc.toLowerCase().includes(q))
  )
}

export default function ShipsSection({ searchQuery }) {
  if (searchQuery && !matchesShip(searchQuery)) {
    return <div className="text-slate-500 text-sm text-center py-6">No ship information matches your search</div>
  }

  const q = searchQuery?.toLowerCase() || ''

  const filteredTypes = q
    ? shipsData.types.filter(t => t.type.toLowerCase().includes(q) || t.bestFor.toLowerCase().includes(q) || t.special.toLowerCase().includes(q))
    : shipsData.types

  const filteredClasses = q
    ? shipsData.classes.filter(c => c.class.toLowerCase().includes(q) || c.quality.toLowerCase().includes(q) || c.price.toLowerCase().includes(q))
    : shipsData.classes

  const filteredHowToGet = q
    ? shipsData.howToGet.filter(h => h.method.toLowerCase().includes(q) || h.desc.toLowerCase().includes(q))
    : shipsData.howToGet

  return (
    <div className="space-y-6">
      {/* Ship Types */}
      {filteredTypes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Ship Types</h3>
          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {filteredTypes.map(ship => (
              <div key={ship.type} className="card-default rounded-xl p-3.5 neon-border hover:brightness-110 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{ship.icon}</span>
                  <span className="font-bold text-white text-sm">{ship.type}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">Best for:</span>
                    <span className="text-[#00e5ff] text-xs">{ship.bestFor}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{ship.special}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ship Classes */}
      {filteredClasses.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Ship Classes</h3>
          <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-4">
            {filteredClasses.map(cls => {
              const colors = classColors[cls.color]
              return (
                <div key={cls.class} className={`rounded-xl p-4 border text-center ${colors.bg} ${colors.border}`}>
                  <div className={`text-3xl font-black mb-1.5 ${colors.text}`}>{cls.class}</div>
                  <div className="text-white text-sm font-semibold">{cls.quality}</div>
                  <div className="text-slate-500 text-xs mt-1">{cls.price}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* How to Get Ships */}
      {filteredHowToGet.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">How to Get Ships</h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {filteredHowToGet.map(method => (
              <div key={method.method} className="card-default rounded-xl p-3.5 neon-border hover:brightness-110 transition-all duration-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{method.icon}</span>
                  <span className="font-bold text-[#00e5ff] text-sm">{method.method}</span>
                </div>
                <p className="text-slate-400 text-xs">{method.desc}</p>
              </div>
            ))}
          </div>

          {/* Trading tip */}
          {!searchQuery && (
            <div className="mt-3 bg-[#00e5ff]/05 border border-[#00e5ff]/15 rounded-xl p-3">
              <p className="text-slate-400 text-xs">
                <span className="text-[#00e5ff] font-bold">Trading tip:</span> Every NPC trades — no haggling needed.
                Your ship value is deducted from the new ship price.
                Better ships appear in <span className="text-[#00e5ff]">wealthier systems (3-star economy)</span>.
                Always check the ship comparison before confirming!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
