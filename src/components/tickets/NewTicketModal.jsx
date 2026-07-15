import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import { getClientes } from '../../services/clientServices'

const emptyForm = { clientId: '', title: '', description: '' }

function NewTicketModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm)
  const [clients, setClients] = useState([])
  const [loadingClients, setLoadingClients] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    let active = true

    const loadClients = async () => {
      setLoadingClients(true)
      try {
        const data = await getClientes()
        if (active) setClients(data)
      } catch (err) {
        if (active) toast.error(err.message)
      } finally {
        if (active) setLoadingClients(false)
      }
    }

    loadClients()
    return () => {
      active = false
    }
  }, [open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const result = await onSave?.(form)
      toast.success(result?.message || 'Ticket creado con éxito')
      setForm(emptyForm)
      onClose?.()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    if (submitting) return
    setForm(emptyForm)
    onClose?.()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Crear nuevo ticket"
      description='El ticket se creará con estado "Pendiente".'
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          id="clientId"
          name="clientId"
          label="Cliente"
          value={form.clientId}
          onChange={handleChange}
          disabled={loadingClients}
          required
        >
          <option value="" disabled>
            {loadingClients ? 'Cargando clientes...' : 'Selecciona un cliente'}
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} · {c.company}
            </option>
          ))}
        </Select>

        <Input
          id="title"
          name="title"
          label="Título"
          placeholder="Breve resumen del problema"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Textarea
          id="description"
          name="description"
          label="Descripción"
          placeholder="Detalles adicionales..."
          value={form.description}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button type="submit" loading={submitting}>
            {submitting ? 'Creando...' : 'Crear ticket'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default NewTicketModal
