import { useState } from 'react';
import { CashierLogin } from './cashier/CashierLogin';
import { CashierHome } from './cashier/CashierHome';
import { CashierTicketSale } from './cashier/CashierTicketSale';
import { CashierReservations } from './cashier/CashierReservations';
import { Film, Ticket, Clock, LogOut, Menu, X } from 'lucide-react';

interface CashierViewProps {
  onLogout: () => void;
}

export function CashierView({ onLogout }: CashierViewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'sale' | 'reservations'>('home');
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null);
  const [cashierName, setCashierName] = useState('Usuario');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (name: string) => {
    setCashierName(name);
    setIsLoggedIn(true);
  };

  const handleShowtimeSelect = (showtime: any) => {
    setSelectedShowtime(showtime);
    setCurrentView('sale');
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout();
  };

  const handleMenuClick = (view: 'home' | 'reservations') => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return <CashierLogin onLogin={handleLogin} onBack={onLogout} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-900 border-r border-slate-800 
        transition-transform duration-300 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-64
      `}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="text-green-400" size={24} />
            <h2 className="text-green-400">MOVIELAND</h2>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="p-2 hover:bg-slate-800 rounded text-slate-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <button
            onClick={() => handleMenuClick('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              currentView === 'home' 
                ? 'bg-green-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Clock size={20} />
            <span>Venta de Boletas</span>
          </button>
          <button
            onClick={() => handleMenuClick('reservations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              currentView === 'reservations' 
                ? 'bg-green-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Ticket size={20} />
            <span>Reservas Pendientes</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-1">Cajero activo</p>
            <p className="text-white">{cashierName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full lg:w-auto">
        {/* Header móvil */}
        <div className="lg:hidden sticky top-0 z-30 bg-slate-900 border-b border-slate-800 p-4 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-800 rounded text-slate-400"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-white">Punto de Venta</h1>
        </div>

        {currentView === 'home' && (
          <CashierHome 
            cashierName={cashierName}
            onShowtimeSelect={handleShowtimeSelect}
          />
        )}
        {currentView === 'sale' && (
          <CashierTicketSale 
            showtime={selectedShowtime}
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'reservations' && (
          <CashierReservations />
        )}
      </main>
    </div>
  );
}
