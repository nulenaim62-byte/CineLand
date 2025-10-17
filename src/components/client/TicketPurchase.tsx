import React, { useState } from 'react';
import { ArrowLeft, User, CreditCard, Ticket, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface TicketPurchaseProps {
  movie: any;
  onBack: () => void;
}

export function TicketPurchase({ movie, onBack }: TicketPurchaseProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [numTickets, setNumTickets] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const occupiedSeatsStatic = ['A5', 'B3', 'C7', 'D2', 'E8', 'F4'];

  const toggleSeat = (seat: string) => {
    if (occupiedSeatsStatic.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < numTickets) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.length * 12000;

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert('Por favor selecciona al menos un asiento');
      return;
    }
    setShowPayment(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(false);
    setShowSuccess(true);
    
    // Limpiar después de 3 segundos
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 3000);
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
            <span>Volver</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-white">Comprar Entradas</h1>
          <p className="text-slate-400">{movie.title} - {movie.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h2 className="text-xl mb-6 text-white">Seleccionar Asientos</h2>

              {/* Number of Tickets */}
              <div className="mb-6">
                <label className="block text-slate-300 mb-2">Número de Entradas</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={numTickets}
                  onChange={(e) => {
                    setNumTickets(parseInt(e.target.value) || 1);
                    setSelectedSeats([]);
                  }}
                  className="w-32 bg-slate-800 border-slate-700 text-white"
                />
              </div>

              {/* Screen */}
              <div className="mb-8">
                <div className="h-2 bg-gradient-to-b from-blue-500/50 to-transparent rounded-t-full mb-2"></div>
                <p className="text-center text-sm text-slate-400">PANTALLA</p>
              </div>

              {/* Seats Grid */}
              <div className="space-y-2 sm:space-y-3 overflow-x-auto pb-4">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-1 sm:gap-2 justify-center min-w-max">
                    <span className="w-6 text-slate-500 text-sm flex-shrink-0">{row}</span>
                    <div className="flex gap-1 sm:gap-2">
                      {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        const isSelected = selectedSeats.includes(seatId);
                        const isOccupied = occupiedSeatsStatic.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            disabled={isOccupied}
                            title={isOccupied ? 'Ocupado' : seatId}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg text-xs transition-all active:scale-95 ${
                              isOccupied
                                ? 'bg-red-900/50 cursor-not-allowed'
                                : isSelected
                                ? 'bg-blue-600 text-white scale-110'
                                : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-400'
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

              {/* Legend */}
              <div className="flex gap-4 sm:gap-6 justify-center mt-6 text-xs sm:text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-800 rounded-t-lg"></div>
                  <span className="text-slate-400">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-t-lg"></div>
                  <span className="text-slate-400">Seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-900/50 rounded-t-lg"></div>
                  <span className="text-slate-400">Ocupado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 sticky top-24">
              <h2 className="text-xl mb-6 text-white">Resumen</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-slate-400">Película</p>
                  <p className="text-white">{movie.title}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Horario</p>
                  <p className="text-white">29 Agosto - 19:00 hrs</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Sala</p>
                  <p className="text-white">Sala 1</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Asientos</p>
                  <p className="text-white">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno seleccionado'}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Entradas ({selectedSeats.length})</span>
                  <span className="text-white">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-blue-400">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={selectedSeats.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard size={20} className="mr-2" />
                Continuar al Pago
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleConfirmPayment} className="space-y-4 mt-4">
            <div>
              <label className="block text-slate-300 mb-2">Número de Tarjeta</label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                required
                maxLength={19}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Nombre en la Tarjeta</label>
              <Input
                type="text"
                placeholder="JUAN PEREZ"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">Vencimiento</label>
                <Input
                  type="text"
                  placeholder="MM/AA"
                  value={paymentData.expiry}
                  onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">CVV</label>
                <Input
                  type="text"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                  maxLength={3}
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex justify-between text-lg mb-4">
                <span className="text-white">Total a Pagar:</span>
                <span className="text-green-400">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setShowPayment(false)}
                variant="outline"
                className="flex-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Pagar ${totalPrice.toLocaleString()}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Compra Exitosa</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h2 className="text-2xl mb-2">¡Compra Exitosa!</h2>
            <p className="text-slate-400 mb-4">Tu pago ha sido procesado correctamente</p>
            
            <div className="bg-slate-800 rounded-lg p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Película:</span>
                <span className="text-white">{movie.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Asientos:</span>
                <span className="text-white">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total:</span>
                <span className="text-green-400">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Revisa tu correo para el ticket digital
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
