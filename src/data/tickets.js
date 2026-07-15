export const STATUSES = [
  {
    id: 'pendiente',
    label: 'Pendiente',
    accent: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-400',
  },
  {
    id: 'en_progreso',
    label: 'En progreso',
    accent: 'bg-sky-400',
    badge: 'bg-sky-500/15 text-sky-400',
  },
  {
    id: 'finalizado',
    label: 'Finalizado',
    accent: 'bg-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400',
  },
]

export const getStatus = (id) => STATUSES.find((s) => s.id === id) ?? STATUSES[0]

export const initialTickets = [
  {
    id: 'T-1001',
    title: 'Error al iniciar sesión',
    description: 'El SSO devuelve 500 al validar el token.',
    client: 'María González',
    company: 'Acme Corp',
    createdAt: '2025-06-01',
    status: 'en_progreso',
  },
  {
    id: 'T-1002',
    title: 'Solicitud de nueva funcionalidad',
    description: 'Exportar reportes en formato XLSX.',
    client: 'Carlos Rivas',
    company: 'Nimbus Labs',
    createdAt: '2025-06-04',
    status: 'en_progreso',
  },
  {
    id: 'T-1003',
    title: 'Problema de facturación',
    description: 'La factura de mayo aparece duplicada.',
    client: 'Lucía Fernández',
    company: 'Vertex SA',
    createdAt: '2025-05-20',
    status: 'finalizado',
  },
  {
    id: 'T-1004',
    title: 'Integración webhook lenta',
    description: 'Los webhooks tardan +30s en llegar.',
    client: 'María González',
    company: 'Acme Corp',
    createdAt: '2025-06-10',
    status: 'en_progreso',
  },
  {
    id: 'T-1005',
    title: 'Actualización de plan',
    description: 'Migrar a plan Enterprise.',
    client: 'Andrés Molina',
    company: 'Quanta Tech',
    createdAt: '2025-06-15',
    status: 'pendiente',
  },
  {
    id: 'T-1006',
    title: 'Bug en el dashboard',
    description: 'El gráfico de ingresos no renderiza en Safari.',
    client: 'Sofía Peña',
    company: 'Lumen Studio',
    createdAt: '2025-05-28',
    status: 'finalizado',
  },
]
