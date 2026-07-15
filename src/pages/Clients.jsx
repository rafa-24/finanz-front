import { useCallback, useEffect, useMemo, useState } from 'react'
import { Users, Plus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import ClientsTable from '../components/clients/ClientsTable'
import NewClientModal from '../components/clients/NewClientModal'
import { getClientes, createCliente } from '../services/clientServices'

function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const loadClients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getClientes()
      setClients(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.company.toLowerCase().includes(term),
    )
  }, [clients, search])

  const handleSave = async (form) => {
    const result = await createCliente(form)
    await loadClients()
    return result
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

        {loading ? (
          <p className="px-4 py-8 text-center text-sm text-slate-400">Cargando clientes...</p>
        ) : error ? (
          <p className="px-4 py-8 text-center text-sm text-red-400">{error}</p>
        ) : (
          <ClientsTable clients={filteredClients} />
        )}
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
