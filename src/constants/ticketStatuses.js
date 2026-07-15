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

export const getStatusByLabel = (label) =>
  STATUSES.find((s) => s.label === label) ?? STATUSES[0]
