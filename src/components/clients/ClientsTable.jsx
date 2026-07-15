function ClientsTable({ clients }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/50 text-xs uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Correo</th>
            <th className="px-4 py-3 font-medium">Empresa</th>
            <th className="px-4 py-3 text-right font-medium">Creado</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                No se encontraron clientes.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{client.id}</td>
                <td className="px-4 py-3 font-medium text-white">{client.name}</td>
                <td className="px-4 py-3 text-slate-400">{client.email}</td>
                <td className="px-4 py-3 text-slate-300">{client.company}</td>
                <td className="px-4 py-3 text-right text-slate-400">{client.createdAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ClientsTable
