import { useEffect, useState } from 'react';
import api from '../api/api';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    api.get('/suppliers').then((response) => setSuppliers(response.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Proveedores</h2>
        <p className="mt-2 text-sm text-slate-500">Gestiona contactos y proveedores estratégicos.</p>
      </div>
      <div className="grid gap-4">
        {suppliers.length ? suppliers.map((supplier) => (
          <div key={supplier.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{supplier.name}</h3>
                <p className="text-sm text-slate-500">Contacto: {supplier.contact_name || 'N/A'}</p>
              </div>
              <div className="text-sm text-slate-600">
                <p>{supplier.email || 'Sin correo'}</p>
                <p>{supplier.phone || 'Sin teléfono'}</p>
              </div>
            </div>
          </div>
        )) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">No hay proveedores registrados.</div>
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;
