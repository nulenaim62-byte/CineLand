import { ArrowLeft, User, CreditCard, Printer } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface CashierTicketSaleProps {
  showtime: any;
  onBack: () => void;
}

export function CashierTicketSale({ showtime, onBack }: CashierTicketSaleProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [clientInfo, setClientInfo] = useState({ name: '', id: '', isVIP: false });
  const [showTicket, setShowTicket] = useState(false);
  
  // Estructura de la sala: 2 bloques, filas A-M, 10 asientos por fila
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  const seatsPerBlock = 10;
  const blocks = [1, 2];

  // Simulación de asientos ocupados (aleatorio)
  const occupiedSeats = ['B1A3', 'B1B5', 'B2D7', 'B2E4', 'B1F2'];

  const toggleSeat = (seat: string) => {
    if (occupiedSeats.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const pricePerSeat = clientInfo.isVIP ? 10000 : 12000;
  const totalPrice = selectedSeats.length * pricePerSeat;

  const handleCompleteSale = () => {
    if (selectedSeats.length === 0 || !clientInfo.name || !clientInfo.id) {
      alert('Por favor completa todos los campos y selecciona al menos un asiento');
      return;
    }
    setShowTicket(true);
  };

  const generateTicketNumber = () => {
    return `TKT-${Date.now().toString().slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Venta de Boletas</h1>
          <div className="text-slate-400">
            <p className="mb-1"><span className="text-white">{showtime.movie}</span></p>
            <p>{showtime.time} - {showtime.date}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h2 className="text-xl text-white mb-6">Selección de Asientos</h2>

              {/* Screen */}
              <div className="mb-8">
                <div className="h-3 bg-gradient-to-b from-slate-600/50 to-transparent rounded-t-full mb-2"></div>
                <p className="text-center text-sm text-slate-400">PANTALLA</p>
              </div>

              {/* Seats Grid - 2 Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {blocks.map((block) => (
                  <div key={block} className="overflow-x-auto">
                    <h3 className="text-center text-slate-500 mb-4 sticky left-0">BLOQUE {block}</h3>
                    <div className="space-y-2 min-w-[280px]">
                      {rows.map((row) => (
                        <div key={`${block}-${row}`} className="flex items-center gap-1 sm:gap-2">
                          <span className="w-6 text-slate-500 text-sm flex-shrink-0">{row}</span>
                          <div className="flex gap-1 flex-1 justify-center">
                            {Array.from({ length: seatsPerBlock }, (_, i) => {
                              const seatId = `B${block}${row}${i + 1}`;
                              const isSelected = selectedSeats.includes(seatId);
                              const isOccupied = occupiedSeats.includes(seatId);

                              return (
                                <button
                                  key={seatId}
                                  onClick={() => toggleSeat(seatId)}
                                  disabled={isOccupied}
                                  title={seatId}
                                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-t-lg text-xs transition-all active:scale-95 ${
                                    isOccupied
                                      ? 'bg-red-900/50 cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-green-600 text-white scale-110'
                                      : 'bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-slate-400'
                                  }`}
                                >
                                  {i + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-6 justify-center mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-slate-700 rounded-t-lg"></div>
                  <span className="text-slate-400">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-600 rounded-t-lg"></div>
                  <span className="text-slate-400">Seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-red-900/50 rounded-t-lg"></div>
                  <span className="text-slate-400">Ocupado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Info & Summary */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h2 className="text-xl text-white mb-4">Información del Cliente</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Nombre completo</label>
                  <Input
                    type="text"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full bg-slate-800 border-slate-700 text-white"
                    placeholder="Juan Pérez"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-300 mb-2">Cédula / ID</label>
                  <Input
                    type="text"
                    value={clientInfo.id}
                    onChange={(e) => setClientInfo({ ...clientInfo, id: e.target.value })}
                    className="w-full bg-slate-800 border-slate-700 text-white"
                    placeholder="1234567890"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="vip"
                    checked={clientInfo.isVIP}
                    onChange={(e) => setClientInfo({ ...clientInfo, isVIP: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="vip" className="text-slate-300 text-sm">
                    Cliente VIP (Descuento 16%)
                  </label>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h2 className="text-xl text-white mb-4">Resumen de Venta</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Película</span>
                  <span className="text-white">{showtime.movie}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Horario</span>
                  <span className="text-white">{showtime.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Asientos</span>
                  <span className="text-white">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Cantidad</span>
                  <span className="text-white">{selectedSeats.length} boleta(s)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Precio unitario</span>
                  <span className="text-white">${pricePerSeat.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 mb-6">
                <div className="flex justify-between text-xl">
                  <span className="text-white">Total a Pagar</span>
                  <span className="text-green-400">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleCompleteSale}
                disabled={selectedSeats.length === 0 || !clientInfo.name || !clientInfo.id}
                className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                <CreditCard size={20} className="mr-2" />
                Completar Venta
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Ticket Dialog */}
      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Venta Completada</DialogTitle>
          </DialogHeader>
          
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-2xl text-blue-400 mb-2">MOVIELAND</h3>
              <p className="text-sm text-slate-400">Ticket de Entrada</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Ticket:</span>
                <span className="text-white">{generateTicketNumber()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cliente:</span>
                <span className="text-white">{clientInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ID:</span>
                <span className="text-white">{clientInfo.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Película:</span>
                <span className="text-white">{showtime.movie}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Horario:</span>
                <span className="text-white">{showtime.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fecha:</span>
                <span className="text-white">{showtime.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asientos:</span>
                <span className="text-white">{selectedSeats.join(', ')}</span>
              </div>
              {clientInfo.isVIP && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo:</span>
                  <span className="text-yellow-400">VIP</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between text-lg">
                <span className="text-white">Total Pagado:</span>
                <span className="text-green-400">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 mt-4">
              <p>Conserve este ticket para ingresar a la sala</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => window.print()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Printer size={18} className="mr-2" />
              Imprimir
            </Button>
            <Button 
              onClick={() => {
                setShowTicket(false);
                onBack();
              }}
              className="flex-1 bg-slate-700 hover:bg-slate-600"
            >
              Finalizar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
