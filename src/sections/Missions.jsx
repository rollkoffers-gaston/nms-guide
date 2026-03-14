import { missionsData } from '../data'

const tagColors = {
  cyan: 'bg-[#00e5ff]/15 text-[#00e5ff] border-[#00e5ff]/30',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  teal: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  gray: 'bg-slate-600/30 text-slate-400 border-slate-500/30',
}

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Priority: ${count} stars`}>
      {[1, 2, 3].map(i => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= count ? 'text-yellow-400' : 'text-slate-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function MissionCard({ mission }) {
  return (
    <div className="card-default rounded-xl p-4 hover:brightness-110 transition-all duration-200 neon-border">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{mission.icon}</span>
          <div className="min-w-0">
            <h3 className="font-bold text-white text-sm leading-tight">{mission.title}</h3>
            <p className="text-[#00e5ff]/60 text-xs">{mission.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <Stars count={mission.priority} />
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[mission.tagColor]}`}>
            {mission.tag}
          </span>
        </div>
      </div>

      <p className="text-slate-300 text-xs mb-2">{mission.description}</p>

      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <span className="text-[#00e5ff]/50 text-xs flex-shrink-0 mt-0.5">🔓</span>
          <p className="text-slate-400 text-xs"><span className="text-slate-500">Unlocks:</span> {mission.unlocks}</p>
        </div>
        {mission.currentQuest && (
          <div className="flex items-start gap-2">
            <span className="text-yellow-400/70 text-xs flex-shrink-0 mt-0.5">📋</span>
            <p className="text-slate-400 text-xs"><span className="text-slate-500">Current:</span> <span className="text-yellow-400/80 italic">"{mission.currentQuest}"</span></p>
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="text-[#00e5ff]/70 text-xs flex-shrink-0 mt-0.5">💡</span>
          <p className="text-[#00e5ff]/70 text-xs italic">{mission.tip}</p>
        </div>
      </div>
    </div>
  )
}

function matchesMission(mission, query) {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    mission.title.toLowerCase().includes(q) ||
    mission.subtitle.toLowerCase().includes(q) ||
    mission.description.toLowerCase().includes(q) ||
    mission.unlocks.toLowerCase().includes(q) ||
    (mission.currentQuest || '').toLowerCase().includes(q) ||
    mission.tip.toLowerCase().includes(q)
  )
}

export default function MissionsSection({ searchQuery }) {
  const filteredPrimary = missionsData.primary.filter(m => matchesMission(m, searchQuery))
  const filteredSecondary = missionsData.secondary.filter(m => matchesMission(m, searchQuery))

  if (searchQuery && filteredPrimary.length === 0 && filteredSecondary.length === 0) {
    return <div className="text-slate-500 text-sm text-center py-6">No missions match your search</div>
  }

  return (
    <div className="space-y-5">
      {filteredPrimary.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
            ⭐ Primary Missions (Story)
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPrimary.map(m => <MissionCard key={m.id} mission={m} />)}
          </div>
        </div>
      )}

      {filteredSecondary.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
            Secondary Missions
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSecondary.map(m => <MissionCard key={m.id} mission={m} />)}
          </div>
        </div>
      )}
    </div>
  )
}
