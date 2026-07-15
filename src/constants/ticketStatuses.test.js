import { describe, it, expect } from 'vitest'
import { STATUSES, getStatus, getStatusByLabel } from './ticketStatuses'

describe('ticketStatuses', () => {
  it('define exactamente los tres estados permitidos', () => {
    expect(STATUSES).toHaveLength(3)
    expect(STATUSES.map((s) => s.id)).toEqual([
      'pendiente',
      'en_progreso',
      'finalizado',
    ])
  })

  it('getStatus devuelve el estado por id', () => {
    expect(getStatus('finalizado').label).toBe('Finalizado')
  })

  it('getStatus cae en "Pendiente" si el id no existe', () => {
    expect(getStatus('desconocido').id).toBe('pendiente')
  })

  it('getStatusByLabel mapea la etiqueta del backend al id interno', () => {
    expect(getStatusByLabel('En progreso').id).toBe('en_progreso')
  })

  it('getStatusByLabel cae en "Pendiente" si la etiqueta no existe', () => {
    expect(getStatusByLabel('Cerrado').id).toBe('pendiente')
  })
})
