import { Check, X, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface Reservation {
  id: string;
  clientName: string;
  clientId: string;
  movie: string;
  time: string;
  date: string;
  seats: string[];
  total: number;
  reservedAt: string;
  expiresAt: string;
  status: 'pending' | 'confirmed' | 'expired';
}

export function CashierReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'RSV-001',
      clientName: 'María González',
      clientId: '1234567890',
      movie: 'Harry Potter',
      time: '19:00 hrs - Sala 1',
      date: '29 Agosto 2024',
      seats: ['B1D5', 'B1D6'],
      total: 24000,
      reservedAt: '10:30 AM',
      expiresAt: '18:30',
      status: 'pending'
    },
    {
      id: 'RSV-002',
      clientName: 'Carlos Rodríguez',
      clientId: '0987654321',
      movie: 'Wednesday',
      time: '21:30 hrs - Sala 2',
      date: '29 Agosto 2024',
      seats: ['B2F3', 'B2F4', 'B2F5'],
      total: 36000,
      reservedAt: '11:45 AM',
      expiresAt: '20:45',
      status: 'pending'
    },
  ]);

  const handleConfirm = (id: string) => {
    if (confirm('¿Confirmar venta de esta reserva?')) {
      setReservations(reservations.map(r => 
        r.id === id ? { ...r, status: 'confirmed' as const } : r
      ));
      alert('Reserva confirmada. Proceda con el pago.');
    }
  };

  const handleCancel = (id: string) => {
    if (confirm('¿Cancelar esta reserva? Los asientos quedarán disponibles.')) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  const pendingReservations = reservations.filter(r => r.status === 'pending');

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl text-white mb-2">Reservas Pendientes</h1>
        <p className="text-slate-400">Gestiona las reservas de los clientes</p>
      </div>

      {pendingReservations.length === 0 ? (
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-12 text-center">
          <Clock size={48} className="mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">No hay reservas pendientes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-slate-900 rounded-lg border border-slate-800 p-4 sm:p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl text-white">{reservation.movie}</h3>
                    <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">
                      Pendiente
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{reservation.time} - {reservation.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Reserva #{reservation.id}</p>
                  <p className="text-sm text-slate-500">Expira: {reservation.expiresAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-slate-500" />
                    <span className="text-sm text-slate-500">Cliente</span>
                  </div>
                  <p className="text-white">{reservation.clientName}</p>
                  <p className="text-sm text-slate-400">ID: {reservation.clientId}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-2">Asientos reservados</p>
                  <div className="flex flex-wrap gap-2">
                    {reservation.seats.map((seat) => (
                      <span
                        key={seat}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-sm"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div>
                  <p className="text-sm text-slate-500">Total a pagar</p>
                  <p className="text-xl sm:text-2xl text-green-400">${reservation.total.toLocaleString()}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => handleCancel(reservation.id)}
                    variant="outline"
                    className="bg-slate-800 border-slate-700 text-white hover:bg-red-900 hover:border-red-700 w-full sm:w-auto"
                  >
                    <X size={18} className="mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleConfirm(reservation.id)}
                    className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                  >
                    <Check size={18} className="mr-2" />
                    Confirmar Venta
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 bg-slate-900 rounded-lg border border-slate-800 p-6">
        <h3 className="text-white mb-4">Resumen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-1">Reservas Activas</p>
            <p className="text-2xl text-white">{pendingReservations.length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Asientos Reservados</p>
            <p className="text-2xl text-white">
              {pendingReservations.reduce((acc, r) => acc + r.seats.length, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Monto Total Pendiente</p>
            <p className="text-2xl text-green-400">
              ${pendingReservations.reduce((acc, r) => acc + r.total, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
