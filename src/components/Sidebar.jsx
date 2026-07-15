import { NavLink } from 'react-router-dom'
import { LayoutGrid, Users, Ticket } from 'lucide-react'

const navItems = [
  { to: '/clients', label: 'Clientes', icon: Users },
  { to: '/tickets', label: 'Tickets de Soporte', icon: Ticket },
]

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-[#0b1220] text-slate-200">
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
          <LayoutGrid size={20} />
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-white">Finanz</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 px-5 py-4 text-xs text-slate-500">
        Frontend Finanz
      </div>
    </aside>
  )
}

export default Sidebar
