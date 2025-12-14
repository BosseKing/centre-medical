import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function MedicalRecordMe() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="p-8 border border-border rounded-2xl flex flex-col items-center gap-4">
          <FileText className="h-10 w-10 text-primary mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-primary">Mon dossier médical</h2>
          <p className="text-muted-foreground text-center mb-4">
            Retrouvez ici toutes vos informations médicales personnelles et vos historiques de soins.
          </p>
          {/* Affichage du dossier médical réel à implémenter ici */}
          <div className="w-full text-center text-muted-foreground">
            (Affichage du dossier médical à venir)
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
