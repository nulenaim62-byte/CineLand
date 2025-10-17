import { Plus, Edit, Trash2, Search, Star, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  isVIP: boolean;
  birthdate: string;
  gender: string;
  registeredDate: string;
  totalPurchases: number;
}

export function ClientsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'María González',
      email: 'maria@email.com',
      phone: '3001234567',
      idNumber: '1234567890',
      isVIP: true,
      birthdate: '1990-05-15',
      gender: 'Femenino',
      registeredDate: '2024-01-10',
      totalPurchases: 45
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      phone: '3009876543',
      idNumber: '0987654321',
      isVIP: false,
      birthdate: '1985-08-22',
      gender: 'Masculino',
      registeredDate: '2024-02-15',
      totalPurchases: 12
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@email.com',
      phone: '3005551234',
      idNumber: '5551234567',
      isVIP: true,
      birthdate: '1992-12-03',
      gender: 'Femenino',
      registeredDate: '2023-11-20',
      totalPurchases: 67
    },
    {
      id: 4,
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '3007778888',
      idNumber: '7778889999',
      isVIP: false,
      birthdate: '1988-03-18',
      gender: 'Masculino',
      registeredDate: '2024-03-05',
      totalPurchases: 8
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    isVIP: false,
    birthdate: '',
    gender: ''
  });

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      idNumber: client.idNumber,
      isVIP: client.isVIP,
      birthdate: client.birthdate,
      gender: client.gender
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClient) {
      // Update existing client
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new client
      const newClient: Client = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        ...formData,
        registeredDate: new Date().toISOString().split('T')[0],
        totalPurchases: 0
      };
      setClients([...clients, newClient]);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      idNumber: '',
      isVIP: false,
      birthdate: '',
      gender: ''
    });
    setEditingClient(null);
    setShowDialog(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.idNumber.includes(searchTerm)
  );

  const vipCount = clients.filter(c => c.isVIP).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl text-white mb-2">Gestión de Clientes</h1>
          <p className="text-slate-400">Administra clientes y membresías VIP</p>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingClient(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  idNumber: '',
                  isVIP: false,
                  birthdate: '',
                  gender: ''
                });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Añadir Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Nombre Completo *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Cédula / ID *</label>
                  <Input
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Teléfono *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Fecha de Nacimiento</label>
                  <Input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Género</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-yellow-600/10 rounded-lg">
                <input
                  type="checkbox"
                  id="isVIP"
                  checked={formData.isVIP}
                  onChange={(e) => setFormData({ ...formData, isVIP: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="isVIP" className="text-slate-300 flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <span>Cliente VIP (Descuento 16% en todas las compras)</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {editingClient ? 'Actualizar Cliente' : 'Guardar Cliente'}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Total Clientes</p>
              <p className="text-3xl text-white">{clients.length}</p>
            </div>
            <User className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Clientes VIP</p>
              <p className="text-3xl text-yellow-400">{vipCount}</p>
            </div>
            <Star className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <div>
            <p className="text-sm text-slate-400 mb-1">Clientes Regulares</p>
            <p className="text-3xl text-white">{clients.length - vipCount}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar por nombre, email o cédula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-800 text-white"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4 text-slate-300">Cliente</th>
                <th className="text-left p-4 text-slate-300">Contacto</th>
                <th className="text-left p-4 text-slate-300">Cédula</th>
                <th className="text-left p-4 text-slate-300">Tipo</th>
                <th className="text-left p-4 text-slate-300">Compras</th>
                <th className="text-left p-4 text-slate-300">Registro</th>
                <th className="text-right p-4 text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {client.isVIP && <Star size={16} className="text-yellow-400" />}
                      <div>
                        <p className="text-white">{client.name}</p>
                        <p className="text-sm text-slate-500">{client.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-400 text-sm">{client.email}</p>
                    <p className="text-slate-500 text-sm">{client.phone}</p>
                  </td>
                  <td className="p-4 text-slate-400">{client.idNumber}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      client.isVIP
                        ? 'bg-yellow-600/20 text-yellow-400'
                        : 'bg-slate-700 text-slate-400'
                    }`}>
                      {client.isVIP ? 'VIP' : 'Regular'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{client.totalPurchases}</td>
                  <td className="p-4 text-slate-400">{client.registeredDate}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(client)}
                        className="p-2 hover:bg-slate-700 rounded text-blue-400"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="p-2 hover:bg-slate-700 rounded text-red-400"
                      >
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
