const KpiCard = ({ title, value, icon, color = 'bg-primary' }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className={`${color} inline-flex h-12 w-12 items-center justify-center rounded-3xl text-white shadow-sm`}>
        {icon}
      </div>
    </div>
  </div>
);

export default KpiCard;
