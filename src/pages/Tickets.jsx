import { useState } from 'react'
import { Ticket, Plus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import KanbanBoard from '../components/tickets/KanbanBoard'
import NewTicketModal from '../components/tickets/NewTicketModal'
import { initialTickets } from '../data/tickets'
import { initialClients } from '../data/clients'

function Tickets() {
  const [tickets, setTickets] = useState(initialTickets)
  const [modalOpen, setModalOpen] = useState(false)

  const handleChangeStatus = (id, status) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    )
  }

  const handleCreate = (form) => {
    const client = initialClients.find((c) => c.id === form.clientId)
    const nextId = `T-${1001 + tickets.length}`
    const newTicket = {
      id: nextId,
      title: form.title,
      description: form.description,
      client: client?.name ?? 'Sin cliente',
      company: client?.company ?? '',
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'pendiente',
    }
    setTickets((prev) => [...prev, newTicket])
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        icon={Ticket}
        title="Tickets de Soporte"
        description="Tablero Kanban para gestionar el flujo de soporte."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            Nuevo ticket
          </Button>
        }
      />

      <KanbanBoard tickets={tickets} onChangeStatus={handleChangeStatus} />

      <NewTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  )
}

export default Tickets
