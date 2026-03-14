import Section from './Section'
import { inventoryData } from '../data'

function SellCard({ item }) {
  return (
    <div className="card-sell rounded-lg p-3 transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-semibold text-white text-sm">{item.name}</span>
        <span className="text-sell-green text-xs font-bold shrink-0 whitespace-nowrap">{item.value}</span>
      </div>
      <p className="text-xs text-gray-400">{item.notes}</p>
    </div>
  )
}

function KeepCard({ item }) {
  return (
    <div className="card-keep rounded-lg p-3 transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-semibold text-white text-sm">{item.name}</span>
        <span className="text-keep-amber text-xs font-bold shrink-0">Keep {item.amount}</span>
      </div>
      <p className="text-xs text-gray-400">{item.why}</p>
    </div>
  )
}

function NeverCard({ item }) {
  return (
    <div className="card-never rounded-lg p-3 transition-all hover:scale-[1.02]">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-never-red text-sm">🚫</span>
        <span className="font-semibold text-white text-sm">{item.name}</span>
      </div>
      <p className="text-xs text-gray-400">{item.why}</p>
    </div>
  )
}

function SafeCard({ item }) {
  return (
    <div className="card-default rounded-lg p-3 border border-gray-700/50 transition-all hover:scale-[1.01]">
      <span className="font-semibold text-gray-300 text-sm">{item.name}</span>
      <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
    </div>
  )
}

function SubHeader({ color, icon, label }) {
  return (
    <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1.5 ${color}`}>
      <span>{icon}</span> {label}
    </h3>
  )
}

export default function InventorySection({ searchQuery, expanded, onToggle }) {
  const q = searchQuery.toLowerCase()
  const f = (arr, keys) => arr.filter(i => !q || keys.some(k => (i[k] ?? '').toLowerCase().includes(q)))

  const sell     = f(inventoryData.sell,      ['name', 'notes'])
  const keep     = f(inventoryData.keep,      ['name', 'why'])
  const never    = f(inventoryData.neverSell, ['name', 'why'])
  const safe     = f(inventoryData.safeToSell,['name', 'note'])
  const total    = sell.length + keep.length + never.length + safe.length

  return (
    <Section id="inventory" title="Inventory Management" icon="🎒" expanded={expanded} onToggle={onToggle} count={total}>
      <div className="space-y-7">
        <div className="bg-neon-cyan/5 border border-neon-cyan/15 rounded-lg px-4 py-3">
          <p className="text-sm text-neon-cyan">
            ⭐ <strong>Golden rule:</strong> Yellow star icon on an item = Trade Item → sell it immediately!
          </p>
        </div>

        {sell.length > 0 && (
          <div>
            <SubHeader color="text-sell-green" icon="💰" label="Sell Immediately" />
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {sell.map((item, i) => <SellCard key={i} item={item} />)}
            </div>
          </div>
        )}

        {never.length > 0 && (
          <div>
            <SubHeader color="text-never-red" icon="🚫" label="Never Sell" />
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {never.map((item, i) => <NeverCard key={i} item={item} />)}
            </div>
          </div>
        )}

        {keep.length > 0 && (
          <div>
            <SubHeader color="text-keep-amber" icon="🔒" label="Keep These Amounts" />
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {keep.map((item, i) => <KeepCard key={i} item={item} />)}
            </div>
          </div>
        )}

        {safe.length > 0 && (
          <div>
            <SubHeader color="text-gray-400" icon="✅" label="Safe to Sell (sell excess)" />
            <div className="grid gap-2 sm:grid-cols-2">
              {safe.map((item, i) => <SafeCard key={i} item={item} />)}
            </div>
          </div>
        )}

        {total === 0 && (
          <p className="text-gray-500 text-sm">No items match your search.</p>
        )}
      </div>
    </Section>
  )
}
