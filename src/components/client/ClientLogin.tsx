import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ClientLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function ClientLogin({ onLogin, onBack }: ClientLoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    birthdate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-2 text-slate-300 hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <svg className="w-20 h-20 mx-auto mb-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2z"/>
            <circle cx="12" cy="12" r="5"/>
            <path d="m12 7-2 5h4l-2 5"/>
          </svg>
          <h1 className="text-4xl mb-2 text-blue-400">MOVIELAND</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl mb-6 text-white text-center">
            {isRegister ? 'Registro' : 'Acceder'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-slate-300 mb-2">Nombre Completo</label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-700/50 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Número de Teléfono</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-700/50 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Correo</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-700/50 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Género</label>
                  <Input
                    type="text"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Fecha de nacimiento</label>
                  <Input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="w-full bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-300 mb-2">Usuario</label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-slate-700/50 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Contraseña</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-700/50 border-slate-600 text-white"
                required
              />
            </div>

            {isRegister && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" required className="rounded" />
                <span>Confirmo que he leído todos los términos y condiciones</span>
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isRegister ? 'Registrarse' : 'Entrar'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isRegister ? '¿Ya tienes cuenta? Acceder' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
