import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function CashiersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cashiers, setCashiers] = useState([
    { id: 1, name: 'María González', username: 'mgonzalez', status: 'Activo', sales: 45 },
    { id: 2, name: 'Juan Pérez', username: 'jperez', status: 'Activo', sales: 38 },
    { id: 3, name: 'Ana Martínez', username: 'amartinez', status: 'Inactivo', sales: 52 },
    { id: 4, name: 'Carlos López', username: 'clopez', status: 'Activo', sales: 41 },
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-white mb-2">Gestión de Cajeros</h1>
          <p className="text-slate-400">Administra el personal de taquilla</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Añadir Cajero
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar cajeros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-800 text-white"
          />
        </div>
      </div>

      {/* Cashiers Table */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4 text-slate-300">Nombre</th>
                <th className="text-left p-4 text-slate-300">Usuario</th>
                <th className="text-left p-4 text-slate-300">Estado</th>
                <th className="text-left p-4 text-slate-300">Ventas del Mes</th>
                <th className="text-right p-4 text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cashiers.map((cashier) => (
                <tr key={cashier.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="p-4 text-white">{cashier.name}</td>
                  <td className="p-4 text-slate-400">{cashier.username}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      cashier.status === 'Activo' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-slate-700 text-slate-400'
                    }`}>
                      {cashier.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{cashier.sales} ventas</td>
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
