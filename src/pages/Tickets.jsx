import { useCallback, useEffect, useState } from 'react'
import { Ticket, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import KanbanBoard from '../components/tickets/KanbanBoard'
import NewTicketModal from '../components/tickets/NewTicketModal'
import { getTickets, createTicket, updateTicketEstado } from '../services/ticketServices'
import { getClientes } from '../services/clientServices'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const loadTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [ticketsData, clientsData] = await Promise.all([
        getTickets(),
        getClientes(),
      ])
      const clientsById = new Map(clientsData.map((c) => [c.id, c]))
      const enriched = ticketsData.map((t) => {
        const client = clientsById.get(t.clientId)
        return {
          ...t,
          client: client?.name ?? 'Sin cliente',
          company: client?.company ?? '',
        }
      })
      setTickets(enriched)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const [ticketsData, clientsData] = await Promise.all([
          getTickets(),
          getClientes(),
        ])
        if (cancelled) return

        const clientsById = new Map(clientsData.map((c) => [c.id, c]))
        const enriched = ticketsData.map((t) => {
          const client = clientsById.get(t.clientId)
          return {
            ...t,
            client: client?.name ?? 'Sin cliente',
            company: client?.company ?? '',
          }
        })
        setTickets(enriched)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const handleChangeStatus = async (id, status) => {
    const previous = tickets
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    )
    try {
      await updateTicketEstado(id, status)
      toast.success('Estado del ticket actualizado')
    } catch (err) {
      setTickets(previous)
      toast.error(err.message)
    }
  }

  const handleCreate = async (form) => {
    const result = await createTicket(form)
    await loadTickets()
    return result
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

      {loading ? (
        <p className="py-12 text-center text-sm text-slate-400">Cargando tickets...</p>
      ) : error ? (
        <p className="py-12 text-center text-sm text-red-400">{error}</p>
      ) : (
        <KanbanBoard tickets={tickets} onChangeStatus={handleChangeStatus} />
      )}

      <NewTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  )
}

export default Tickets
