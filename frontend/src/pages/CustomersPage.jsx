import { useEffect, useState } from 'react';
import api from '../api/api';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/customers').then((response) => setCustomers(response.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Clientes</h2>
        <p className="mt-2 text-sm text-slate-500">Historial y perfiles de clientes frecuentes.</p>
      </div>
      <div className="grid gap-4">
        {customers.length ? customers.map((customer) => (
          <div key={customer.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{customer.full_name}</h3>
                <p className="text-sm text-slate-500">{customer.email || 'Sin correo electrónico'}</p>
              </div>
              <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">Puntos: {customer.loyalty_points || 0}</span>
            </div>
          </div>
        )) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">No hay clientes registrados.</div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
