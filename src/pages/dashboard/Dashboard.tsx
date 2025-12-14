import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  FileText,
  Pill,
  Receipt,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { mockPatients, mockAppointments, mockMedications, mockInvoices, mockDoctors } from '@/data/mockData';

export default function Dashboard() {
  const { user, getRoleLabel } = useAuth();

  const todayAppointments = mockAppointments.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  );

  const pendingInvoices = mockInvoices.filter((i) => i.status === 'pending');
  const lowStockMeds = mockMedications.filter((m) => m.quantite < 100);

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'receptionist':
        return [
          { label: 'Patients enregistrés', value: mockPatients.length, icon: Users, color: 'text-blue-600 bg-blue-100' },
          { label: 'RDV aujourd\'hui', value: todayAppointments.length, icon: Calendar, color: 'text-green-600 bg-green-100' },
          { label: 'RDV en attente', value: mockAppointments.filter(a => a.status === 'scheduled').length, icon: Clock, color: 'text-orange-600 bg-orange-100' },
          { label: 'RDV complétés', value: mockAppointments.filter(a => a.status === 'completed').length, icon: CheckCircle2, color: 'text-teal-600 bg-teal-100' },
        ];
      case 'patient':
        return [
          { label: 'Mes rendez-vous', value: 3, icon: Calendar, color: 'text-blue-600 bg-blue-100' },
          { label: 'Prochains RDV', value: 1, icon: Clock, color: 'text-green-600 bg-green-100' },
          { label: 'Historique médical', value: 5, icon: FileText, color: 'text-purple-600 bg-purple-100' },
          { label: 'Documents', value: 8, icon: FileText, color: 'text-orange-600 bg-orange-100' },
        ];
      case 'doctor':
        return [
          { label: 'Mes patients', value: mockPatients.length, icon: Users, color: 'text-blue-600 bg-blue-100' },
          { label: 'RDV aujourd\'hui', value: todayAppointments.length, icon: Calendar, color: 'text-green-600 bg-green-100' },
          { label: 'En attente', value: mockAppointments.filter(a => a.status === 'scheduled').length, icon: Clock, color: 'text-orange-600 bg-orange-100' },
          { label: 'Complétés ce mois', value: 24, icon: CheckCircle2, color: 'text-teal-600 bg-teal-100' },
        ];
      case 'director':
        return [
          { label: 'Médecins', value: mockDoctors.length, icon: Users, color: 'text-blue-600 bg-blue-100' },
          { label: 'Patients totaux', value: mockPatients.length, icon: Users, color: 'text-green-600 bg-green-100' },
          { label: 'RDV ce mois', value: mockAppointments.length, icon: Calendar, color: 'text-purple-600 bg-purple-100' },
          { label: 'Revenus', value: '125K MAD', icon: TrendingUp, color: 'text-teal-600 bg-teal-100' },
        ];
      case 'pharmacist':
        return [
          { label: 'Médicaments', value: mockMedications.length, icon: Pill, color: 'text-blue-600 bg-blue-100' },
          { label: 'Stock faible', value: lowStockMeds.length, icon: AlertCircle, color: 'text-red-600 bg-red-100' },
          { label: 'Dispensés aujourd\'hui', value: 12, icon: CheckCircle2, color: 'text-green-600 bg-green-100' },
          { label: 'Valeur stock', value: '45K MAD', icon: TrendingUp, color: 'text-purple-600 bg-purple-100' },
        ];
      case 'cashier':
        return [
          { label: 'Factures totales', value: mockInvoices.length, icon: Receipt, color: 'text-blue-600 bg-blue-100' },
          { label: 'En attente', value: pendingInvoices.length, icon: Clock, color: 'text-orange-600 bg-orange-100' },
          { label: 'Payées', value: mockInvoices.filter(i => i.status === 'paid').length, icon: CheckCircle2, color: 'text-green-600 bg-green-100' },
          { label: 'Revenus jour', value: '8.5K MAD', icon: TrendingUp, color: 'text-teal-600 bg-teal-100' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Espace {getRoleLabel(user?.role || 'patient')} - Vue d'ensemble
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Rendez-vous d'aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockAppointments.slice(0, 4).map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between py-3 border-b last:border-0 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {appointment.patient?.prenom[0]}{appointment.patient?.nom[0]}
                    </div>
                    <div>
                      <p className="font-medium">{appointment.patient?.prenom} {appointment.patient?.nom}</p>
                      <p className="text-sm text-muted-foreground">{appointment.motif}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.heure}</p>
                    <Badge variant={appointment.status === 'completed' ? 'success' : 'info'}>
                      {appointment.status === 'completed' ? 'Terminé' : 'Prévu'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions or Alerts */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-medical-warning" />
                Alertes & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lowStockMeds.length > 0 && (
                <div className="p-4 rounded-xl bg-medical-warning-light border border-medical-warning/20 animate-slide-up">
                  <div className="flex items-start gap-3">
                    <Pill className="h-5 w-5 text-medical-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-medical-warning">Stock faible</p>
                      <p className="text-sm text-muted-foreground">
                        {lowStockMeds.length} médicament(s) en stock faible
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {pendingInvoices.length > 0 && (
                <div className="p-4 rounded-xl bg-medical-secondary-light border border-medical-secondary/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-start gap-3">
                    <Receipt className="h-5 w-5 text-medical-secondary mt-0.5" />
                    <div>
                      <p className="font-medium text-medical-secondary">Factures en attente</p>
                      <p className="text-sm text-muted-foreground">
                        {pendingInvoices.length} facture(s) non payée(s)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-medical-success-light border border-medical-success/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-medical-success mt-0.5" />
                  <div>
                    <p className="font-medium text-medical-success">Système opérationnel</p>
                    <p className="text-sm text-muted-foreground">
                      Tous les services fonctionnent normalement
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
