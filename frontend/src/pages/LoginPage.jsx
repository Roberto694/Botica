import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@novasalud.com');
  const [password, setPassword] = useState('NovaSalud123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Error de autenticación');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.95)]">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1.3fr_1fr]">
          <div className="bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_35%),_linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,0.9))] p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Nova Salud</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Bienvenido</h1>
              <p className="mt-4 text-sm leading-6 text-slate-300">Gestiona inventario, ventas y clientes desde una plataforma segura y moderna.</p>
            </div>
            <div className="space-y-4 text-slate-300">
              <p className="rounded-3xl bg-slate-950/80 px-4 py-3">Inventario en tiempo real</p>
              <p className="rounded-3xl bg-slate-950/80 px-4 py-3">Alertas de expiración y stock</p>
              <p className="rounded-3xl bg-slate-950/80 px-4 py-3">Ventas rápidas y reportes</p>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white">Iniciar sesión</h2>
              <p className="mt-2 text-sm text-slate-400">Ingresa con tus credenciales para continuar.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Correo electrónico</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-inner focus:border-sky-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Contraseña</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-inner focus:border-sky-500"
                />
              </div>
              {error && <p className="text-sm text-rose-400">{error}</p>}
              <button type="submit" className="w-full rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                Iniciar sesión
              </button>
            </form>
            <div className="mt-8 rounded-3xl bg-slate-950/80 px-5 py-4 text-sm text-slate-400">
              <p>Credenciales de prueba:</p>
              <p className="mt-2">admin@novasalud.com / NovaSalud123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
