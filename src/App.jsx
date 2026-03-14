import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Section from './components/Section'
import MissionsSection from './sections/Missions'
import InventorySection from './sections/Inventory'
import MoneyMakingSection from './sections/MoneyMaking'
import ShipsSection from './sections/Ships'
import RefinersSection from './sections/Refiners'
import QuickTipsSection from './sections/QuickTips'

const sections = [
  { id: 'missions', label: 'Missions', icon: '🎯' },
  { id: 'inventory', label: 'Inventory', icon: '🎒' },
  { id: 'money', label: 'Money Making', icon: '💰' },
  { id: 'ships', label: 'Ships', icon: '🚀' },
  { id: 'refiners', label: 'Refiner Recipes', icon: '⚗️' },
  { id: 'tips', label: 'Quick Tips', icon: '💡' },
]

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('missions')

  const sectionRefs = {
    missions: useRef(null),
    inventory: useRef(null),
    money: useRef(null),
    ships: useRef(null),
    refiners: useRef(null),
    tips: useRef(null),
  }

  const scrollTo = useCallback((sectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(sectionId)
    setSidebarOpen(false)
  }, [])

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  const searchActive = searchQuery.trim().length >= 2

  return (
    <div className="min-h-screen bg-[#04081a] starfield-bg">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#04081a]/90 backdrop-blur-md border-b border-[#00e5ff]/15">
        <div className="flex items-center gap-3 px-4 py-3 max-w-screen-2xl mx-auto">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-[#00e5ff]/10 transition-colors"
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-[#00e5ff]" />
            <span className="w-5 h-0.5 bg-[#00e5ff]" />
            <span className="w-5 h-0.5 bg-[#00e5ff]" />
          </button>

          {/* Logo (mobile only) */}
          <div className="lg:hidden flex items-center gap-2">
            <span className="text-xl">🌌</span>
            <span className="font-black text-sm gradient-text">NMS Guide</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl ml-auto lg:ml-0">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00e5ff]/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search missions, items, ships, recipes..."
                className="w-full bg-[#080f2a] border border-[#00e5ff]/25 rounded-xl pl-10 pr-10 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#00e5ff]/60 focus:ring-1 focus:ring-[#00e5ff]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Header nav (desktop only) */}
          <nav className="hidden xl:flex items-center gap-1 ml-4">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeSection === s.id
                    ? 'bg-[#00e5ff]/15 text-[#00e5ff]'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-[#00e5ff]/05'
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Layout */}
      <div className="flex max-w-screen-2xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          scrollTo={scrollTo}
          activeSection={activeSection}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 py-6">
          {/* Search results banner */}
          {searchActive && (
            <div className="mb-6 bg-[#00e5ff]/08 border border-[#00e5ff]/20 rounded-xl px-4 py-3 flex items-center gap-2 animate-fade-in-down">
              <svg className="w-4 h-4 text-[#00e5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-[#00e5ff] text-sm">
                Showing results for <span className="font-bold">"{searchQuery}"</span> across all sections
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="ml-auto text-slate-500 hover:text-slate-300 text-xs underline transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {/* Sections */}
          <div ref={sectionRefs.missions} id="missions">
            <Section id="missions-inner" title="Missions" icon="🎯" searchActive={searchActive}>
              <MissionsSection searchQuery={searchActive ? searchQuery : ''} />
            </Section>
          </div>

          <div ref={sectionRefs.inventory} id="inventory">
            <Section id="inventory-inner" title="Inventory" icon="🎒" searchActive={searchActive}>
              <InventorySection searchQuery={searchActive ? searchQuery : ''} />
            </Section>
          </div>

          <div ref={sectionRefs.money} id="money">
            <Section id="money-inner" title="Money Making" icon="💰" searchActive={searchActive}>
              <MoneyMakingSection searchQuery={searchActive ? searchQuery : ''} />
            </Section>
          </div>

          <div ref={sectionRefs.ships} id="ships">
            <Section id="ships-inner" title="Ships" icon="🚀" searchActive={searchActive}>
              <ShipsSection searchQuery={searchActive ? searchQuery : ''} />
            </Section>
          </div>

          <div ref={sectionRefs.refiners} id="refiners">
            <Section id="refiners-inner" title="Refiner Recipes" icon="⚗️" searchActive={searchActive}>
              <RefinersSection searchQuery={searchActive ? searchQuery : ''} />
            </Section>
          </div>

          <div ref={sectionRefs.tips} id="tips">
            <Section id="tips-inner" title="Quick Tips" icon="💡" searchActive={searchActive}>
              <QuickTipsSection searchQuery={searchActive ? searchQuery : ''} />
            </Section>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center pb-8">
            <p className="text-slate-700 text-xs">
              No Man's Sky Interactive Guide · Made for Cedric 🚀
            </p>
            <p className="text-slate-800 text-xs mt-1">
              All data accurate as of Voyagers update
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
