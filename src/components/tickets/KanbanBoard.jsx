import KanbanColumn from './KanbanColumn'
import { STATUSES } from '../../data/tickets'

function KanbanBoard({ tickets, onChangeStatus }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status.id}
          status={status}
          tickets={tickets.filter((t) => t.status === status.id)}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
