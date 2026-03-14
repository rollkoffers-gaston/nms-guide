import { useState } from 'react'
import { inventoryData } from '../data'

const tabs = [
  { id: 'sell', label: 'Sell Immediately', icon: '💰', color: 'text-[#00e676]', activeClass: 'border-[#00e676] text-[#00e676] bg-[#00e676]/10' },
  { id: 'keep', label: 'Keep', icon: '📦', color: 'text-[#ffab00]', activeClass: 'border-[#ffab00] text-[#ffab00] bg-[#ffab00]/10' },
  { id: 'never', label: 'Never Sell', icon: '🚫', color: 'text-[#ff3d71]', activeClass: 'border-[#ff3d71] text-[#ff3d71] bg-[#ff3d71]/10' },
  { id: 'safe', label: 'Safe to Sell', icon: '✅', color: 'text-sky-400', activeClass: 'border-sky-400 text-sky-400 bg-sky-400/10' },
]

function SellCard({ item }) {
  return (
    <div className="card-sell rounded-xl p-3.5 hover:brightness-110 transition-all duration-200">
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-bold text-white text-sm">{item.name}</span>
        <span className="text-[#00e676] font-mono text-xs font-bold whitespace-nowrap">{item.value}</span>
      </div>
      <p className="text-slate-400 text-xs">{item.notes}</p>
    </div>
  )
}

function KeepCard({ item }) {
  return (
    <div className="card-keep rounded-xl p-3.5 hover:brightness-110 transition-all duration-200">
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-bold text-white text-sm">{item.name}</span>
        <span className="text-[#ffab00] font-mono text-xs font-bold whitespace-nowrap">Keep {item.amount}</span>
      </div>
      <p className="text-slate-400 text-xs">{item.why}</p>
    </div>
  )
}

function NeverCard({ item }) {
  return (
    <div className="card-never rounded-xl p-3.5 hover:brightness-110 transition-all duration-200">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#ff3d71] text-xs font-black">🚫 NEVER SELL</span>
        <span className="font-bold text-white text-sm">{item.name}</span>
      </div>
      <p className="text-slate-400 text-xs">{item.why}</p>
    </div>
  )
}

function SafeCard({ item }) {
  return (
    <div className="bg-sky-900/15 border border-sky-500/20 rounded-xl p-3.5 hover:brightness-110 transition-all duration-200">
      <span className="font-bold text-white text-sm block mb-1">{item.name}</span>
      <p className="text-slate-400 text-xs">{item.note}</p>
    </div>
  )
}

function filterItems(items, query) {
  if (!query) return items
  const q = query.toLowerCase()
  return items.filter(item =>
    item.name.toLowerCase().includes(q) ||
    Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(q))
  )
}

export default function InventorySection({ searchQuery }) {
  const [activeTab, setActiveTab] = useState('sell')

  const filteredSell = filterItems(inventoryData.sell, searchQuery)
  const filteredKeep = filterItems(inventoryData.keep, searchQuery)
  const filteredNever = filterItems(inventoryData.neverSell, searchQuery)
  const filteredSafe = filterItems(inventoryData.safeToSell, searchQuery)

  const counts = {
    sell: filteredSell.length,
    keep: filteredKeep.length,
    never: filteredNever.length,
    safe: filteredSafe.length,
  }

  const totalMatches = Object.values(counts).reduce((a, b) => a + b, 0)

  if (searchQuery && totalMatches === 0) {
    return <div className="text-slate-500 text-sm text-center py-6">No inventory items match your search</div>
  }

  return (
    <div>
      {/* Golden Rule Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-yellow-400 text-lg">⭐</span>
        <p className="text-yellow-300 text-sm font-medium">
          <span className="font-bold">Golden rule:</span> Yellow star icon on an item = Trade Item = sell it!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? tab.activeClass + ' border-current'
                : 'border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {searchQuery && (
              <span className="ml-1 bg-white/10 px-1.5 py-0.5 rounded-full text-[10px]">
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in-down">
        {activeTab === 'sell' && (
          <div>
            <p className="text-slate-500 text-xs mb-3">Items marked as "Handelsgut" / "Used for: Trade" — sell these right away.</p>
            {filteredSell.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No matches</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredSell.map(item => <SellCard key={item.name} item={item} />)}
              </div>
            )}
          </div>
        )}

        {activeTab === 'keep' && (
          <div>
            <p className="text-slate-500 text-xs mb-3">Essential resources — keep the recommended amounts at all times.</p>
            {filteredKeep.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No matches</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredKeep.map(item => <KeepCard key={item.name} item={item} />)}
              </div>
            )}
          </div>
        )}

        {activeTab === 'never' && (
          <div>
            <p className="text-slate-500 text-xs mb-3">These items are critical for progression — selling them will block you!</p>
            {filteredNever.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No matches</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {filteredNever.map(item => <NeverCard key={item.name} item={item} />)}
              </div>
            )}
          </div>
        )}

        {activeTab === 'safe' && (
          <div>
            <p className="text-slate-500 text-xs mb-3">Keep 250–500 of these, sell the rest freely.</p>
            {filteredSafe.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No matches</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {filteredSafe.map(item => <SafeCard key={item.name} item={item} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
