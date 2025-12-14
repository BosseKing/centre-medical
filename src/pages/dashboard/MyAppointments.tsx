import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function MyAppointments() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="p-8 border border-border rounded-2xl flex flex-col items-center gap-4">
          <Calendar className="h-10 w-10 text-primary mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-primary">Mes rendez-vous</h2>
          <p className="text-muted-foreground text-center mb-4">
            Retrouvez ici la liste de vos rendez-vous médicaux à venir et passés.
          </p>
          {/* Affichage des rendez-vous réels à implémenter ici */}
          <div className="w-full text-center text-muted-foreground">
            (Affichage des rendez-vous à venir)
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
