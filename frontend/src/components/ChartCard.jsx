const ChartCard = ({ title, description, children }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
    <div>{children}</div>
  </section>
);

export default ChartCard;
