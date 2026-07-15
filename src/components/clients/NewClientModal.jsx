import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

const emptyForm = { name: '', email: '', company: '' }

function NewClientModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const result = await onSave?.(form)
      toast.success(result?.message || 'Cliente creado con éxito')
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
      title="Registrar nuevo cliente"
      description="Completa los datos del cliente."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          name="name"
          label="Nombre"
          placeholder="Juan Pérez"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="juan@empresa.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          id="company"
          name="company"
          label="Empresa"
          placeholder="Acme Corp"
          value={form.company}
          onChange={handleChange}
          required
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
            {submitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default NewClientModal
