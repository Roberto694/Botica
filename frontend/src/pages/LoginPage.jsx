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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Nova Salud</h1>
          <p className="mt-2 text-slate-400">Accede al sistema centralizado para tu farmacia.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Correo electrónico</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-inner outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-inner outline-none" />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
