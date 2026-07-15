import apiClient from '../api/apiClient'
import { getStatus, getStatusByLabel } from '../constants/ticketStatuses'

const mapTicket = (ticket) => ({
  id: ticket.id,
  clientId: ticket.cliente_id,
  title: ticket.titulo,
  description: ticket.descripcion,
  status: getStatusByLabel(ticket.estado).id,
  createdAt: ticket.fecha_creacion ? ticket.fecha_creacion.slice(0, 10) : '',
})

export const getTickets = async () => {
  try {
    const { data } = await apiClient.get('/tickets')
    return Array.isArray(data) ? data.map(mapTicket) : []
  } catch (error) {
    console.error('Error al cargar los tickets:', error)
    throw new Error('No se pudieron cargar los tickets. Verifica el servidor.', {
      cause: error,
    })
  }
}

export const createTicket = async ({ clientId, title, description }) => {
  try {
    const payload = {
      cliente_id: Number(clientId),
      titulo: title,
      descripcion: description,
    }
    const { data } = await apiClient.post('/tickets', payload)
    return data
  } catch (error) {
    console.error('Error al crear el ticket:', error)
    const message =
      error.response?.data?.detail ||
      'No se pudo crear el ticket. Inténtalo de nuevo.'
    throw new Error(message, { cause: error })
  }
}

export const updateTicketEstado = async (ticketId, statusId) => {
  try {
    const payload = { estado: getStatus(statusId).label }
    const { data } = await apiClient.patch(`/tickets/${ticketId}/estado`, payload)
    return mapTicket(data)
  } catch (error) {
    console.error('Error al actualizar el estado del ticket:', error)
    const message =
      error.response?.data?.detail ||
      'No se pudo actualizar el estado del ticket.'
    throw new Error(message, { cause: error })
  }
}
