import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
}

function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}

export default Button
