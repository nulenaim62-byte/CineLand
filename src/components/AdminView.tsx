import { useState } from 'react';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { MoviesManagement } from './admin/MoviesManagement';
import { CashiersManagement } from './admin/CashiersManagement';
import { ShowtimesManagement } from './admin/ShowtimesManagement';
import { ReportsManagement } from './admin/ReportsManagement';
import { ClientsManagement } from './admin/ClientsManagement';
import { Menu, Film, Users, Clock, BarChart3, LogOut, UserCheck, X } from 'lucide-react';

interface AdminViewProps {
  onLogout: () => void;
}

export function AdminView({ onLogout }: AdminViewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'movies' | 'cashiers' | 'clients' | 'showtimes' | 'reports'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout();
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} onBack={onLogout} />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'movies', label: 'Películas', icon: Film },
    { id: 'cashiers', label: 'Cajeros', icon: Users },
    { id: 'clients', label: 'Clientes', icon: UserCheck },
    { id: 'showtimes', label: 'Funciones', icon: Clock },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
  ];

  const handleMenuClick = (view: any) => {
    setCurrentView(view);
    setSidebarOpen(false); // Cerrar sidebar en móvil al seleccionar
  };

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
          <h2 className="text-blue-400">MOVIELAND</h2>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="p-2 hover:bg-slate-800 rounded text-slate-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  currentView === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Salir</span>
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
          <h1 className="text-white">Panel Administrador</h1>
        </div>

        {currentView === 'dashboard' && <AdminDashboard />}
        {currentView === 'movies' && <MoviesManagement />}
        {currentView === 'cashiers' && <CashiersManagement />}
        {currentView === 'clients' && <ClientsManagement />}
        {currentView === 'showtimes' && <ShowtimesManagement />}
        {currentView === 'reports' && <ReportsManagement />}
      </main>
    </div>
  );
}
