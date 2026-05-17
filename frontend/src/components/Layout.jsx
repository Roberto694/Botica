import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/products', label: 'Productos' },
  { to: '/sales', label: 'Ventas' },
  { to: '/customers', label: 'Clientes' },
  { to: '/suppliers', label: 'Proveedores' },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Nova Salud</h1>
            <p className="text-sm text-slate-500">Farmacia | Gestión de inventario y ventas</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{user?.full_name}</span>
            <button onClick={handleLogout} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Salir
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr] lg:px-6">
        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Navegación</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
