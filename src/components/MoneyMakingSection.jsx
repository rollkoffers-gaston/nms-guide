import Section from './Section'
import { moneyMakingData } from '../data'

const BADGE = {
  gold:   'bg-yellow-400/10  text-yellow-400  border-yellow-400/30',
  green:  'bg-sell-green/10  text-sell-green  border-sell-green/30',
  blue:   'bg-neon-blue/10   text-neon-blue   border-neon-blue/30',
  purple: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  teal:   'bg-neon-teal/10   text-neon-teal   border-neon-teal/30',
}

function MoneyCard({ method }) {
  const badge = BADGE[method.badgeColor] ?? BADGE.teal
  return (
    <div className="card-default rounded-xl p-5 neon-border transition-all hover:scale-[1.015] flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{method.icon}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-sm leading-tight">{method.title}</h3>
              <span className={`text-[10px] border px-2 py-0.5 rounded-full font-semibold tracking-wide ${badge}`}>
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-sell-green font-medium mt-0.5">{method.profit}</p>
          </div>
        </div>
        <span className="text-3xl font-black text-neon-cyan/10 shrink-0 leading-none">#{method.rank}</span>
      </div>

      <div className="text-xs text-gray-500">
        Requires: <span className="text-gray-300">{method.requirements}</span>
      </div>

      {method.recipe && (
        <div className="bg-neon-cyan/5 border border-neon-cyan/15 rounded-lg px-3 py-2">
          <p className="text-xs text-neon-cyan font-mono">{method.recipe}</p>
        </div>
      )}

      <ol className="space-y-2 mt-auto">
        {method.steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-neon-cyan/50 font-mono text-xs shrink-0 mt-0.5">{i + 1}.</span>
            <span className="text-sm text-gray-300">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function MoneyMakingSection({ searchQuery, expanded, onToggle }) {
  const q = searchQuery.toLowerCase()
  const filtered = moneyMakingData.filter(m =>
    !q ||
    m.title.toLowerCase().includes(q) ||
    m.badge.toLowerCase().includes(q) ||
    m.requirements.toLowerCase().includes(q) ||
    (m.recipe ?? '').toLowerCase().includes(q) ||
    m.steps.some(s => s.toLowerCase().includes(q))
  )

  return (
    <Section id="money" title="Money Making Methods" icon="💰" expanded={expanded} onToggle={onToggle} count={filtered.length}>
      {filtered.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map(m => <MoneyCard key={m.id} method={m} />)}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No methods match your search.</p>
      )}
    </Section>
  )
}
