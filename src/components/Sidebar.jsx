import QuickSellCheck from './QuickSellCheck'

const navItems = [
  { id: 'missions', label: 'Missions', icon: '🎯' },
  { id: 'inventory', label: 'Inventory', icon: '🎒' },
  { id: 'money', label: 'Money Making', icon: '💰' },
  { id: 'ships', label: 'Ships', icon: '🚀' },
  { id: 'refiners', label: 'Refiner Recipes', icon: '⚗️' },
  { id: 'tips', label: 'Quick Tips', icon: '💡' },
]

function NavItem({ item, onClick, active }) {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 group ${
        active
          ? 'bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff]'
          : 'text-slate-400 hover:text-[#00e5ff] hover:bg-[#00e5ff]/08'
      }`}
    >
      <span className="text-base">{item.icon}</span>
      <span className="text-sm font-medium">{item.label}</span>
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse-glow" />
      )}
    </button>
  )
}

export default function Sidebar({ open, onClose, scrollTo, activeSection }) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-[#04081a] border-r border-[#00e5ff]/15 z-40
          flex flex-col overflow-y-auto scrollbar-thin
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#00e5ff]/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌌</span>
                <h1 className="font-black text-base gradient-text">No Man's Sky</h1>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 tracking-widest uppercase">Interactive Guide</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-500 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4 mb-2">Sections</p>
          {navItems.map(item => (
            <NavItem
              key={item.id}
              item={item}
              onClick={(id) => { scrollTo(id); onClose() }}
              active={activeSection === item.id}
            />
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-[#00e5ff]/10" />

        {/* Quick Sell Check */}
        <div className="p-4 flex-1">
          <QuickSellCheck />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#00e5ff]/10">
          <p className="text-[10px] text-slate-600 text-center">
            Made for Cedric 🚀<br />
            <span className="text-[#00e5ff]/40">No Man's Sky Guide v1.0</span>
          </p>
        </div>
      </aside>
    </>
  )
}
