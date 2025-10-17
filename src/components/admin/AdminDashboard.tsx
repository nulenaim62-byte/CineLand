import { Film, Users, Ticket, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    { label: 'Películas Activas', value: '12', icon: Film, color: 'blue' },
    { label: 'Usuarios Registrados', value: '1,234', icon: Users, color: 'green' },
    { label: 'Entradas Vendidas Hoy', value: '342', icon: Ticket, color: 'purple' },
    { label: 'Ingresos del Mes', value: '$4,125,000', icon: DollarSign, color: 'yellow' },
  ];

  const recentActivity = [
    { type: 'sale', description: 'Venta de 2 entradas para Harry Potter', time: 'Hace 5 min' },
    { type: 'user', description: 'Nuevo usuario registrado: Juan Pérez', time: 'Hace 12 min' },
    { type: 'sale', description: 'Venta de 4 entradas para Wednesday', time: 'Hace 23 min' },
    { type: 'movie', description: 'Nueva película agregada: Aventura Épica', time: 'Hace 1 hora' },
    { type: 'sale', description: 'Venta de 3 entradas para Cinema Paradise', time: 'Hace 2 horas' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Bienvenido al Dashboard</h1>
        <p className="text-slate-400">Resumen general de la plataforma Movieland</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-600/20 text-blue-400',
            green: 'bg-green-600/20 text-green-400',
            purple: 'bg-purple-600/20 text-purple-400',
            yellow: 'bg-yellow-600/20 text-yellow-400',
          };

          return (
            <div key={index} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon size={24} />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <div className="text-3xl mb-1 text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h2 className="text-xl mb-4 text-white">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'sale' ? 'bg-purple-600/20' :
                  activity.type === 'user' ? 'bg-green-600/20' :
                  'bg-blue-600/20'
                }`}>
                  {activity.type === 'sale' && <Ticket size={20} className="text-purple-400" />}
                  {activity.type === 'user' && <Users size={20} className="text-green-400" />}
                  {activity.type === 'movie' && <Film size={20} className="text-blue-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.description}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h2 className="text-xl mb-4 text-white">Estadísticas Semanales</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Ocupación de Salas</span>
                <span className="text-white">78%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Satisfacción Cliente</span>
                <span className="text-white">92%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Conversión de Ventas</span>
                <span className="text-white">65%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <h3 className="text-white mb-3">Próximas Funciones</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Harry Potter</p>
                  <p className="text-xs text-slate-500">Hoy 19:00 hrs - Sala 1</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Wednesday</p>
                  <p className="text-xs text-slate-500">Hoy 21:30 hrs - Sala 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
