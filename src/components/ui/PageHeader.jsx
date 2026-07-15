function PageHeader({ icon: Icon, title, description, actions }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon size={24} className="text-slate-300" />}
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export default PageHeader
