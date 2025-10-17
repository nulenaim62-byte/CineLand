import { Download, TrendingUp, DollarSign, Users, Film } from 'lucide-react';
import { Button } from '../ui/button';

export function ReportsManagement() {
  const salesData = [
    { date: '24/10/2024', tickets: 145, revenue: '$1,740,000' },
    { date: '25/10/2024', tickets: 178, revenue: '$2,136,000' },
    { date: '26/10/2024', tickets: 132, revenue: '$1,584,000' },
    { date: '27/10/2024', tickets: 156, revenue: '$1,872,000' },
    { date: '28/10/2024', tickets: 189, revenue: '$2,268,000' },
  ];

  const topMovies = [
    { title: 'Harry Potter', tickets: 456, revenue: '$5,472,000' },
    { title: 'Wednesday', tickets: 389, revenue: '$4,668,000' },
    { title: 'Cinema Paradise', tickets: 312, revenue: '$3,744,000' },
    { title: 'Acción Extrema', tickets: 278, revenue: '$3,336,000' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-white mb-2">Reportes</h1>
          <p className="text-slate-400">Análisis de ventas y estadísticas</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download size={20} className="mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-400" size={24} />
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-2xl text-white mb-1">$12,600,000</div>
          <div className="text-sm text-slate-400">Ingresos Totales</div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-blue-400" size={24} />
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-2xl text-white mb-1">1,435</div>
          <div className="text-sm text-slate-400">Entradas Vendidas</div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <Film className="text-purple-400" size={24} />
            <div className="text-slate-500">—</div>
          </div>
          <div className="text-2xl text-white mb-1">12</div>
          <div className="text-sm text-slate-400">Películas Activas</div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-yellow-400" size={24} />
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-2xl text-white mb-1">78%</div>
          <div className="text-sm text-slate-400">Ocupación Promedio</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Table */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-xl text-white">Ventas por Día</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-slate-300">Fecha</th>
                  <th className="text-right p-4 text-slate-300">Entradas</th>
                  <th className="text-right p-4 text-slate-300">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index} className="border-t border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4 text-white">{sale.date}</td>
                    <td className="p-4 text-right text-slate-400">{sale.tickets}</td>
                    <td className="p-4 text-right text-green-400">{sale.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Movies */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-xl text-white">Películas Más Vendidas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-slate-300">Película</th>
                  <th className="text-right p-4 text-slate-300">Entradas</th>
                  <th className="text-right p-4 text-slate-300">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {topMovies.map((movie, index) => (
                  <tr key={index} className="border-t border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4 text-white">{movie.title}</td>
                    <td className="p-4 text-right text-slate-400">{movie.tickets}</td>
                    <td className="p-4 text-right text-green-400">{movie.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
