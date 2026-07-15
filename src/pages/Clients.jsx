import { useMemo, useState } from 'react'
import { Users, Plus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import ClientsTable from '../components/clients/ClientsTable'
import NewClientModal from '../components/clients/NewClientModal'
import { initialClients } from '../data/clients'

function Clients() {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.company.toLowerCase().includes(term),
    )
  }, [clients, search])

  const handleSave = (form) => {
    const nextId = `C-${String(clients.length + 1).padStart(3, '0')}`
    const newClient = {
      id: nextId,
      name: form.name,
      email: form.email,
      company: form.company,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setClients((prev) => [...prev, newClient])
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        icon={Users}
        title="Clientes"
        description="Administra los clientes registrados en la plataforma."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            Nuevo cliente
          </Button>
        }
      />

      <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <SearchInput
            className="max-w-xs flex-1"
            placeholder="Buscar por nombre o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-sm text-slate-400">
            {filteredClients.length} de {clients.length}
          </span>
        </div>

        <ClientsTable clients={filteredClients} />
      </div>

      <NewClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export default Clients
