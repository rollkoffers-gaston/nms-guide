import { useState } from 'react'

export default function Section({ id, title, icon, children, defaultOpen = true, searchActive = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // Auto-expand when search is active
  const open = searchActive ? true : isOpen

  return (
    <section id={id} className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-xl section-header-gradient neon-border cursor-pointer transition-all duration-200 hover:brightness-125 group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-bold neon-text text-[#00e5ff]">{title}</h2>
        </div>
        <svg
          className={`w-5 h-5 text-[#00e5ff] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 animate-fade-in-down">
          {children}
        </div>
      )}
    </section>
  )
}
