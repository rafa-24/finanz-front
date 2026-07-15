import { Building2, Calendar } from 'lucide-react'
import Badge from '../ui/Badge'
import Select from '../ui/Select'
import { STATUSES, getStatus } from '../../data/tickets'

function TicketCard({ ticket, onChangeStatus }) {
  const status = getStatus(ticket.status)

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs text-slate-500">{ticket.id}</span>
        <Badge className={status.badge}>{status.label}</Badge>
      </div>

      <h4 className="font-semibold text-white">{ticket.title}</h4>
      <p className="mt-1 text-sm text-slate-400">{ticket.description}</p>

      <div className="mt-3 space-y-1 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-slate-500" />
          <span>
            {ticket.client} · {ticket.company}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-500" />
          <span>{ticket.createdAt}</span>
        </div>
      </div>

      <Select
        variant="dark"
        className="mt-3"
        value={ticket.status}
        onChange={(e) => onChangeStatus?.(ticket.id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default TicketCard
