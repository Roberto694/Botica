import { useEffect, useState } from 'react';
import api from '../api/api';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/sales').then((response) => {
      setSales(response.data.rows || response.data);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Ventas recientes</h2>
        <p className="mt-2 text-sm text-slate-500">Registra ventas, imprime recibos y controla el flujo de caja.</p>
      </div>
      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">Cargando ventas...</div>
        ) : sales.length ? (
          sales.map((sale) => (
            <div key={sale.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{sale.invoice_number}</h3>
                  <p className="text-sm text-slate-500">Cajero: {sale.cashier_name}</p>
                </div>
                <span className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">S/ {Number(sale.total).toFixed(2)}</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <span className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Estado: {sale.status}</span>
                <span className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Pago: {sale.payment_status}</span>
                <span className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Método: {sale.payment_method}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">Aún no hay ventas registradas.</div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
