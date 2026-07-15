import TicketCard from './TicketCard'

function KanbanColumn({ status, tickets, onChangeStatus }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40">
      <div className={`h-1.5 rounded-t-xl ${status.accent}`} />

      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-white">{status.label}</h3>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
          {tickets.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3 pt-0">
        {tickets.length === 0 ? (
          <p className="px-1 py-6 text-center text-sm text-slate-600">Sin tickets.</p>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onChangeStatus={onChangeStatus} />
          ))
        )}
      </div>
    </div>
  )
}

export default KanbanColumn
