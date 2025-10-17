import React, { useState } from 'react';
import { ClientView } from './components/ClientView';
import { AdminView } from './components/AdminView';
import { CashierView } from './components/CashierView';
import { Film, Shield, UserCircle } from 'lucide-react';

export default function App() {
  const [userType, setUserType] = useState<'client' | 'admin' | 'cashier' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto mb-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2z"/>
              <circle cx="12" cy="12" r="5"/>
              <path d="m12 7-2 5h4l-2 5"/>
            </svg>
            <h1 className="text-5xl mb-2 text-blue-400">MOVIELAND</h1>
            <p className="text-slate-300">Sistema de Gestión de Cine</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
            <button
              onClick={() => setUserType('client')}
              className="flex items-center justify-center gap-3 px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <Film size={24} />
              <div className="text-left">
                <div>Cliente</div>
                <div className="text-xs text-blue-200">Compra de boletas</div>
              </div>
            </button>
            
            <button
              onClick={() => setUserType('cashier')}
              className="flex items-center justify-center gap-3 px-8 py-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <UserCircle size={24} />
              <div className="text-left">
                <div>Cajero</div>
                <div className="text-xs text-green-200">Punto de venta</div>
              </div>
            </button>
            
            <button
              onClick={() => setUserType('admin')}
              className="flex items-center justify-center gap-3 px-8 py-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <Shield size={24} />
              <div className="text-left">
                <div>Administrador</div>
                <div className="text-xs text-slate-300">Gestión completa</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'client') {
    return <ClientView onLogout={() => { setUserType(null); setIsLoggedIn(false); }} />;
  }

  if (userType === 'cashier') {
    return <CashierView onLogout={() => { setUserType(null); setIsLoggedIn(false); }} />;
  }

  return <AdminView onLogout={() => { setUserType(null); setIsLoggedIn(false); }} />;
}
