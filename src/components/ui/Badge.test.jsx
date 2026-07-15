import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renderiza el contenido que recibe', () => {
    render(<Badge>Pendiente</Badge>)
    expect(screen.getByText('Pendiente')).toBeInTheDocument()
  })

  it('aplica las clases personalizadas', () => {
    render(<Badge className="bg-amber-500/15">Estado</Badge>)
    expect(screen.getByText('Estado')).toHaveClass('bg-amber-500/15')
  })
})
