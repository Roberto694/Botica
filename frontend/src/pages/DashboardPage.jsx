import { useEffect, useState } from 'react';
import api from '../api/api';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/reports/dashboard').then((response) => setStats(response.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/20">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-sky-400">Panel principal</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Sistema de farmacia Nova Salud</h2>
            <p className="mt-2 text-sm text-slate-400">Monitorea ventas, inventario y clientes con información en tiempo real.</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
            <span className="font-semibold text-white">Actualizado</span>
            <span>{new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Ventas hoy" value={`S/ ${stats?.salesToday?.toFixed(2) || '0.00'}`} icon="💰" color="bg-sky-500" />
          <KpiCard title="Ingresos mensuales" value={`S/ ${stats?.monthlyRevenue?.toFixed(2) || '0.00'}`} icon="📈" color="bg-violet-500" />
          <KpiCard title="Ventas registradas" value={stats?.totalSales || 0} icon="🧾" color="bg-emerald-500" />
          <KpiCard title="Alertas críticas" value={stats?.lowStock || 0} icon="⚠️" color="bg-amber-500" />
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <ChartCard title="Productos más críticos" description="Productos con inventario bajo o próximos a expiración">
          <div className="space-y-3">
            {stats?.topProducts?.length ? stats.topProducts.map((product) => (
              <div key={product.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{product.name}</p>
                    <p className="text-sm text-slate-400">Categoría: {product.category?.name || 'N/A'}</p>
                  </div>
                  <span className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-300">Stock {product.stock}</span>
                </div>
              </div>
            )) : <p className="text-slate-400">No hay productos críticos en este momento.</p>}
          </div>
        </ChartCard>
        <ChartCard title="Clientes frecuentes" description="Últimos clientes con actividad reciente">
          <div className="space-y-3">
            {stats?.topCustomers?.length ? stats.topCustomers.map((customer) => (
              <div key={customer.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{customer.full_name}</p>
                    <p className="text-sm text-slate-400">{customer.email || 'Sin correo'}</p>
                  </div>
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-300">Puntos {customer.loyalty_points || 0}</span>
                </div>
              </div>
            )) : <p className="text-slate-400">No hay clientes con datos recientes.</p>}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardPage;
