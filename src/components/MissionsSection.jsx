import Section from './Section'
import { missionsData } from '../data'

const TAG_STYLES = {
  cyan:   'bg-neon-cyan/10   text-neon-cyan   border-neon-cyan/30',
  blue:   'bg-neon-blue/10   text-neon-blue   border-neon-blue/30',
  purple: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  teal:   'bg-neon-teal/10   text-neon-teal   border-neon-teal/30',
  orange: 'bg-orange-400/10  text-orange-400  border-orange-400/30',
  gray:   'bg-gray-600/10    text-gray-400    border-gray-600/30',
}

function Stars({ count, max = 3 }) {
  return (
    <div className="flex gap-0.5" aria-label={`Priority ${count} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-700'} style={{ fontSize: '12px' }}>★</span>
      ))}
    </div>
  )
}

function MissionCard({ m }) {
  const tag = TAG_STYLES[m.tagColor] ?? TAG_STYLES.gray
  return (
    <div className="card-default rounded-xl p-4 neon-border transition-all hover:scale-[1.015] flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{m.icon}</span>
          <div>
            <p className="font-bold text-white text-sm leading-tight">{m.title}</p>
            <p className="text-xs text-gray-500">{m.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[10px] border px-2 py-0.5 rounded-full font-semibold tracking-wide ${tag}`}>
            {m.tag}
          </span>
          <Stars count={m.priority} />
        </div>
      </div>

      <p className="text-sm text-gray-300">{m.description}</p>

      {m.currentQuest && (
        <p className="text-xs">
          <span className="text-gray-500">Active quest: </span>
          <span className="text-neon-cyan font-medium">"{m.currentQuest}"</span>
        </p>
      )}

      <p className="text-xs">
        <span className="text-gray-500">Unlocks: </span>
        <span className="text-neon-purple">{m.unlocks}</span>
      </p>

      {m.tip && (
        <div className="bg-neon-cyan/5 border border-neon-cyan/10 rounded-lg p-2 mt-auto">
          <p className="text-xs text-gray-400">💡 {m.tip}</p>
        </div>
      )}
    </div>
  )
}

export default function MissionsSection({ searchQuery, expanded, onToggle }) {
  const q = searchQuery.toLowerCase()
  const match = (m) =>
    !q ||
    m.title.toLowerCase().includes(q) ||
    m.subtitle.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q) ||
    m.tag.toLowerCase().includes(q) ||
    (m.currentQuest ?? '').toLowerCase().includes(q)

  const primary = missionsData.primary.filter(match)
  const secondary = missionsData.secondary.filter(match)
  const total = primary.length + secondary.length

  return (
    <Section id="missions" title="Mission Progression" icon="🎯" expanded={expanded} onToggle={onToggle} count={total}>
      <div className="space-y-6">
        {primary.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-neon-cyan uppercase tracking-widest mb-3">
              ⭐ Primary Missions (Story)
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {primary.map(m => <MissionCard key={m.id} m={m} />)}
            </div>
          </div>
        )}
        {secondary.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-neon-purple uppercase tracking-widest mb-3">
              Secondary Missions
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {secondary.map(m => <MissionCard key={m.id} m={m} />)}
            </div>
          </div>
        )}
        {total === 0 && (
          <p className="text-gray-500 text-sm">No missions match your search.</p>
        )}
      </div>
    </Section>
  )
}
