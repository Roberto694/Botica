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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 shadow-[0_1px_30px_-15px_rgba(15,23,42,0.75)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Nova Salud</h1>
            <p className="mt-1 text-sm text-slate-400">Farmacia | Gestión de inventario y ventas en tiempo real</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end sm:flex-row sm:gap-4">
            <div className="rounded-2xl bg-slate-900/90 px-4 py-3 text-sm text-slate-300 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Usuario</p>
              <p className="font-medium text-white">{user?.full_name}</p>
            </div>
            <button onClick={handleLogout} className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg shadow-slate-950/20">
          <div className="space-y-3 rounded-3xl bg-slate-950/80 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Menú</p>
            <p className="text-sm text-slate-400">Accede rápidamente a los módulos principales.</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
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
