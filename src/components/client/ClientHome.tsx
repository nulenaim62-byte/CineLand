import React, { useState } from 'react';
import { Search, User, MessageCircle, LogOut, Film } from 'lucide-react';
import { ImageWithFallback } from '../ui/image-with-fallback';

interface ClientHomeProps {
  onMovieSelect: (movie: any) => void;
  onLogout: () => void;
  onOpenChat: () => void;
}

const movies = [
  {
    id: 1,
    title: 'Harry Potter',
    subtitle: 'y la Piedra Filosofal',
    image: 'https://images.unsplash.com/photo-1707538681321-c28107783d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJyeSUyMHBvdHRlciUyMG1vdmllfGVufDF8fHx8MTc2MDI3NTg4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '9.5',
    duration: '2h 32min',
    genre: 'Fantasía'
  },
  {
    id: 2,
    title: 'Wednesday',
    subtitle: 'La Serie',
    image: 'https://images.unsplash.com/photo-1670688711928-d001f42951f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRuZXNkYXklMjBhZGRhbXN8ZW58MXx8fHwxNzYwMjc1ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '8.2',
    duration: '45min',
    genre: 'Comedia Oscura'
  },
  {
    id: 3,
    title: 'Acción Extrema',
    subtitle: 'Sin Límites',
    image: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjAxNzQ2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '7.8',
    duration: '2h 15min',
    genre: 'Acción'
  },
  {
    id: 4,
    title: 'La Noche Eterna',
    subtitle: 'Terror en la Oscuridad',
    image: 'https://images.unsplash.com/photo-1630338679229-99fb150fbf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMGRhcmt8ZW58MXx8fHwxNzYwMjc1ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '7.5',
    duration: '1h 55min',
    genre: 'Terror'
  },
  {
    id: 5,
    title: 'Cinema Paradise',
    subtitle: 'Una Historia de Amor',
    image: 'https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBwb3Bjb3JufGVufDF8fHx8MTc2MDE3NDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '8.9',
    duration: '2h 5min',
    genre: 'Drama'
  },
  {
    id: 6,
    title: 'Aventura Épica',
    subtitle: 'El Viaje Comienza',
    image: 'https://images.unsplash.com/photo-1535666604855-a6073c323ec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3ZpZXxlbnwxfHx8fDE3NjAyNTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '8.5',
    duration: '2h 42min',
    genre: 'Aventura'
  }
];

export function ClientHome({ onMovieSelect, onLogout, onOpenChat }: ClientHomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Fantasía', 'Comedia Oscura', 'Acción', 'Terror', 'Drama', 'Aventura'];

  // Filtrar películas por búsqueda y categoría
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || movie.genre === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="text-blue-400" size={28} />
              <h1 className="text-2xl text-blue-400">MOVIELAND</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenChat}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300"
              >
                <MessageCircle size={20} />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
                <User size={20} />
              </button>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar películas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Movies Grid */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-white">
          {selectedCategory === 'Todas' ? 'Películas en Cartelera' : `Películas de ${selectedCategory}`}
          {filteredMovies.length > 0 && <span className="text-slate-500 ml-2">({filteredMovies.length})</span>}
        </h2>
        
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No se encontraron películas</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Ver todas las películas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieSelect(movie)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-slate-800">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-white group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-sm text-slate-400">{movie.subtitle}</p>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>⭐ {movie.rating}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
