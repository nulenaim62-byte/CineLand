import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export function MoviesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([
    { id: 1, title: 'Harry Potter y la Piedra Filosofal', genre: 'Fantasía', duration: '152 min', rating: '9.5' },
    { id: 2, title: 'Wednesday', genre: 'Comedia Oscura', duration: '45 min', rating: '8.2' },
    { id: 3, title: 'Acción Extrema', genre: 'Acción', duration: '135 min', rating: '7.8' },
    { id: 4, title: 'La Noche Eterna', genre: 'Terror', duration: '115 min', rating: '7.5' },
    { id: 5, title: 'Cinema Paradise', genre: 'Drama', duration: '125 min', rating: '8.9' },
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-white mb-2">Gestión de Películas</h1>
          <p className="text-slate-400">Administra el catálogo de películas</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={20} className="mr-2" />
              Añadir Película
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>Nueva Película</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-slate-300 mb-2">Título</label>
                <Input className="bg-slate-800 border-slate-700 text-white" placeholder="Nombre de la película" />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">Género</label>
                <Input className="bg-slate-800 border-slate-700 text-white" placeholder="Ej: Acción, Drama" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Duración</label>
                  <Input className="bg-slate-800 border-slate-700 text-white" placeholder="120 min" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Calificación</label>
                  <Input className="bg-slate-800 border-slate-700 text-white" placeholder="8.5" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Guardar Película</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-800 text-white"
          />
        </div>
      </div>

      {/* Movies Table */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4 text-slate-300">Título</th>
                <th className="text-left p-4 text-slate-300">Género</th>
                <th className="text-left p-4 text-slate-300">Duración</th>
                <th className="text-left p-4 text-slate-300">Calificación</th>
                <th className="text-right p-4 text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="p-4 text-white">{movie.title}</td>
                  <td className="p-4 text-slate-400">{movie.genre}</td>
                  <td className="p-4 text-slate-400">{movie.duration}</td>
                  <td className="p-4 text-slate-400">⭐ {movie.rating}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
