import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export function ShowtimesManagement() {
  const [showtimes, setShowtimes] = useState([
    { id: 1, movie: 'Harry Potter', date: '29/08/2024', time: '19:00', room: 'Sala 1', seats: '45/120' },
    { id: 2, movie: 'Wednesday', date: '29/08/2024', time: '21:30', room: 'Sala 2', seats: '32/100' },
    { id: 3, movie: 'Acción Extrema', date: '30/08/2024', time: '16:00', room: 'Sala 1', seats: '12/120' },
    { id: 4, movie: 'La Noche Eterna', date: '30/08/2024', time: '19:00', room: 'Sala 3', seats: '78/150' },
    { id: 5, movie: 'Cinema Paradise', date: '30/08/2024', time: '21:00', room: 'Sala 2', seats: '55/100' },
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-white mb-2">Gestión de Funciones</h1>
          <p className="text-slate-400">Administra los horarios de proyección</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Añadir Función
        </Button>
      </div>

      {/* Calendar View Option */}
      <div className="mb-6 flex gap-4">
        <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
          <Calendar size={20} className="mr-2" />
          Vista de Calendario
        </Button>
      </div>

      {/* Showtimes Table */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4 text-slate-300">Película</th>
                <th className="text-left p-4 text-slate-300">Fecha</th>
                <th className="text-left p-4 text-slate-300">Hora</th>
                <th className="text-left p-4 text-slate-300">Sala</th>
                <th className="text-left p-4 text-slate-300">Asientos</th>
                <th className="text-right p-4 text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((showtime) => {
                const [occupied, total] = showtime.seats.split('/').map(Number);
                const percentage = (occupied / total) * 100;
                
                return (
                  <tr key={showtime.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4 text-white">{showtime.movie}</td>
                    <td className="p-4 text-slate-400">{showtime.date}</td>
                    <td className="p-4 text-slate-400">{showtime.time}</td>
                    <td className="p-4 text-slate-400">{showtime.room}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{showtime.seats}</span>
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="p-2 hover:bg-slate-700 rounded text-blue-400">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
