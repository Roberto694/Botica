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
      <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Gestión de productos</h2>
            <p className="mt-2 text-sm text-slate-400">Busca, filtra y administra el inventario de tu farmacia.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto"
              className="h-12 rounded-3xl border border-slate-700 bg-slate-950/80 px-4 text-slate-100 shadow-inner focus:border-sky-500"
            />
            <button onClick={loadProducts} className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
              Actualizar
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {products.length ? products.map((product) => (
          <div key={product.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-400">Categoría: {product.category?.name || 'Sin categoría'}</p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
                <span>Stock: {product.stock}</span>
                <span>Mín: {product.min_stock}</span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <span className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">Precio: S/ {Number(product.price).toFixed(2)}</span>
              <span className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">Vence: {product.expiration_date || 'N/A'}</span>
              <span className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">Proveedor: {product.supplier?.name || 'N/A'}</span>
            </div>
          </div>
        )) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-8 text-center text-slate-400">
            No se encontraron productos.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
