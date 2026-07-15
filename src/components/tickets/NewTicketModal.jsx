import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import { initialClients } from '../../data/clients'

const emptyForm = { clientId: '', title: '', description: '' }

function NewTicketModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.(form)
    setForm(emptyForm)
  }

  const handleClose = () => {
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
          required
        >
          <option value="" disabled>
            Selecciona un cliente
          </option>
          {initialClients.map((c) => (
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
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit">Crear ticket</Button>
        </div>
      </form>
    </Modal>
  )
}

export default NewTicketModal
