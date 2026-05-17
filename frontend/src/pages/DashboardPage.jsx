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
      <div className="grid gap-6 lg:grid-cols-4">
        <KpiCard title="Ventas hoy" value={`S/ ${stats?.salesToday?.toFixed(2) || '0.00'}`} icon="💰" />
        <KpiCard title="Ingresos mensual" value={`S/ ${stats?.monthlyRevenue?.toFixed(2) || '0.00'}`} icon="📈" color="bg-secondary" />
        <KpiCard title="Ventas registradas" value={stats?.totalSales || 0} icon="🧾" color="bg-emerald-500" />
        <KpiCard title="Alertas críticas" value={stats?.lowStock || 0} icon="⚠️" color="bg-amber-500" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Productos más críticos" description="Productos con inventario bajo o próximos a expiración">
          <ul className="space-y-3">
            {stats?.topProducts?.map((product) => (
              <li key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-slate-900">{product.name}</span>
                  <span className="text-sm text-slate-500">Stock {product.stock}</span>
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
        <ChartCard title="Clientes frecuentes" description="Los perfiles con actividad reciente">
          <ul className="space-y-3">
            {stats?.topCustomers?.map((customer) => (
              <li key={customer.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-slate-900">{customer.full_name}</span>
                  <span className="text-sm text-slate-500">Puntos {customer.loyalty_points || 0}</span>
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardPage;
