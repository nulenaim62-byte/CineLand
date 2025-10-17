import React from 'react';
import { ArrowLeft, Calendar, Clock, Star, Play } from 'lucide-react';
import { ImageWithFallback } from '../ui/image-with-fallback';
import { Button } from '../ui/button';

interface MovieDetailProps {
  movie: any;
  onBack: () => void;
  onBuyTickets: () => void;
}

const showtimes = [
  { date: '29 Agosto', time: '19:00 hrs', room: 'Sala 1' },
  { date: '29 Agosto', time: '21:30 hrs', room: 'Sala 2' },
  { date: '30 Agosto', time: '16:00 hrs', room: 'Sala 1' },
  { date: '30 Agosto', time: '19:00 hrs', room: 'Sala 3' },
];

export function MovieDetail({ movie, onBack, onBuyTickets }: MovieDetailProps) {
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

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 max-w-md mx-auto w-full">
            <ImageWithFallback
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Movie Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl mb-2 text-white">{movie.title}</h1>
              <p className="text-xl text-slate-400">{movie.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={20} />
                <span>{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-blue-400" size={20} />
                <span>{movie.duration}</span>
              </div>
              <div className="px-3 py-1 bg-slate-800 rounded-full">
                {movie.genre}
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-3 text-white">Sinopsis</h3>
              <p className="text-slate-400 leading-relaxed">
                Una historia épica que cautiva desde el primer momento. Con actuaciones magistrales y 
                una dirección impecable, esta película te llevará a través de un viaje inolvidable lleno 
                de emociones, aventuras y momentos que quedarán grabados en tu memoria para siempre.
              </p>
            </div>

            <div>
              <h3 className="text-xl mb-3 text-white">Director</h3>
              <p className="text-slate-400">Christopher Nolan</p>
            </div>

            <div>
              <h3 className="text-xl mb-3 text-white">Reparto</h3>
              <p className="text-slate-400">
                John Doe, Jane Smith, Michael Johnson, Sarah Williams
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={onBuyTickets}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6"
              >
                <Play size={20} className="mr-2" />
                Comprar Entradas
              </Button>
            </div>
          </div>
        </div>

        {/* Showtimes */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-white">Horarios Disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {showtimes.map((showtime, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3 text-slate-400">
                  <Calendar size={18} />
                  <span>{showtime.date}</span>
                </div>
                <div className="text-2xl text-white mb-2">{showtime.time}</div>
                <div className="text-sm text-slate-500">{showtime.room}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
