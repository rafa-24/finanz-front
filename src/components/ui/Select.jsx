import { ChevronDown } from 'lucide-react'

const variants = {
  light: 'border-slate-300 bg-white text-slate-900',
  dark: 'border-slate-700 bg-slate-800 text-slate-100',
}

function Select({ label, id, variant = 'light', className = '', children, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none rounded-lg border px-3 py-2 pr-9 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${variants[variant]}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  )
}

export default Select
