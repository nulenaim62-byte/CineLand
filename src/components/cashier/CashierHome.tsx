import { Clock } from 'lucide-react';

interface CashierHomeProps {
  cashierName: string;
  onShowtimeSelect: (showtime: any) => void;
}

const showtimes = [
  {
    id: 1,
    movie: 'YOU',
    time: '06:30pm - Sala 2',
    date: '29 Agosto 2024',
    status: 'available'
  },
  {
    id: 2,
    movie: 'La noche siempre llega',
    time: '02:00pm - Sala 1',
    date: '29 Agosto 2024',
    status: 'available'
  },
  {
    id: 3,
    movie: 'La noche siempre llega',
    time: '05:00pm - Sala 3',
    date: '29 Agosto 2024',
    status: 'available'
  },
  {
    id: 4,
    movie: 'Mi año en Oxford',
    time: '02:30pm - Sala 2',
    date: '29 Agosto 2024',
    status: 'available'
  },
  {
    id: 5,
    movie: 'Mi año en Oxford',
    time: '07:00pm - Sala 6',
    date: '29 Agosto 2024',
    status: 'available'
  },
];

export function CashierHome({ cashierName, onShowtimeSelect }: CashierHomeProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl text-white mb-2">Bienvenido Cajero</h1>
        <p className="text-slate-400">Selecciona una función para iniciar la venta</p>
      </div>

      {/* Showtimes List */}
      <div className="space-y-3 sm:space-y-4">
        {showtimes.map((showtime) => (
          <div
            key={showtime.id}
            className="bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-green-500 transition-colors"
          >
            <div className="flex-1 w-full sm:w-auto">
              <h3 className="text-white mb-1">{showtime.movie}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock size={16} />
                <span>{showtime.time}</span>
              </div>
            </div>
            
            <button
              onClick={() => onShowtimeSelect(showtime)}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Vender Boletas
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
