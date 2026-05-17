import { useEffect, useState } from 'react';
import api from '../api/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    const response = await api.get('/products', { params: { search } });
    setProducts(response.data.rows || response.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Gestión de productos</h2>
            <p className="text-sm text-slate-500">Busca, filtra y edita tu inventario de forma rápida.</p>
          </div>
          <div className="flex items-center gap-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm" />
            <button onClick={loadProducts} className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">Actualizar</button>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">Categoría: {product.category?.name || 'Sin categoría'}</p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                <span>Stock: {product.stock}</span>
                <span>Min: {product.min_stock}</span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <span className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Precio S/ {Number(product.price).toFixed(2)}</span>
              <span className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Vencimiento: {product.expiration_date || 'N/A'}</span>
              <span className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Proveedor: {product.supplier?.name || 'N/A'}</span>
            </div>
          </div>
        ))}
        {!products.length && <p className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">No se encontraron productos.</p>}
      </div>
    </div>
  );
};

export default ProductsPage;
