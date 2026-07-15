import apiClient from '../api/apiClient'

const mapCliente = (cliente) => ({
  id: cliente.id,
  name: cliente.nombre,
  email: cliente.correo,
  company: cliente.empresa,
  createdAt: cliente.fecha_creacion ? cliente.fecha_creacion.slice(0, 10) : '',
})

export const getClientes = async () => {
  try {
    const { data } = await apiClient.get('/clientes')
    return Array.isArray(data) ? data.map(mapCliente) : []
  } catch (error) {
    console.error('Error al cargar los clientes:', error)
    throw new Error('No se pudieron cargar los clientes. Verifica el servidor.', {
      cause: error,
    })
  }
}

export const getClienteById = async (id) => {
  try {
    const { data } = await apiClient.get(`/clientes/${id}`)
    return mapCliente(data)
  } catch (error) {
    console.error('Error al obtener el cliente:', error)
    throw new Error('No se pudo obtener la información del cliente.', { cause: error })
  }
}

export const createCliente = async ({ name, email, company }) => {
  try {
    const payload = { nombre: name, correo: email, empresa: company }
    const { data } = await apiClient.post('/clientes', payload)
    return data
  } catch (error) {
    console.error('Error al crear el cliente:', error)
    const message =
      error.response?.data?.detail ||
      'No se pudo crear el cliente. Inténtalo de nuevo.'
    throw new Error(message, { cause: error })
  }
}
