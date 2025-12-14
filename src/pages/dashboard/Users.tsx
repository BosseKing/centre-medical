import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users as UsersIcon, Search, Shield } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const { getRoleLabel } = useAuth();

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'director':
        return 'default';
      case 'doctor':
        return 'medical';
      case 'receptionist':
        return 'info';
      case 'pharmacist':
        return 'success';
      case 'cashier':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const roleStats = [
    { role: 'doctor', count: mockUsers.filter(u => u.role === 'doctor').length, label: 'Médecins' },
    { role: 'receptionist', count: mockUsers.filter(u => u.role === 'receptionist').length, label: 'Réceptionnistes' },
    { role: 'patient', count: mockUsers.filter(u => u.role === 'patient').length, label: 'Patients' },
    { role: 'pharmacist', count: mockUsers.filter(u => u.role === 'pharmacist').length, label: 'Pharmaciens' },
    { role: 'cashier', count: mockUsers.filter(u => u.role === 'cashier').length, label: 'Caissiers' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UsersIcon className="h-6 w-6 text-primary" />
            Gestion des Utilisateurs
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de tous les utilisateurs du système
          </p>
        </div>

        {/* Role Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {roleStats.map((stat, index) => (
            <Card key={stat.role} variant="elevated" className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card variant="elevated" className="shadow-none hover:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Liste des utilisateurs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow key={user.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {user.prenom[0]}{user.nom[0]}
                          </div>
                          <div>
                            <p className="font-medium">{user.prenom} {user.nom}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.telephone || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role) as any}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.createdAt.toLocaleDateString('fr-FR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
