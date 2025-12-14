import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pill, Search, Edit, Minus, AlertTriangle } from 'lucide-react';
import { mockMedications } from '@/data/mockData';
import { Medication } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Pharmacy() {
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    referenceMedicament: '',
    nomMedicament: '',
    quantite: 0,
  });

  const filteredMedications = medications.filter(
    (m) =>
      m.nomMedicament.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.referenceMedicament.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMedication) {
      setMedications(medications.map(m => 
        m.id === editingMedication.id ? { ...m, ...formData } : m
      ));
      toast({
        title: 'Médicament modifié',
        description: 'Les informations ont été mises à jour.',
      });
    } else {
      const newMedication: Medication = {
        ...formData,
        id: Date.now().toString(),
      };
      setMedications([...medications, newMedication]);
      toast({
        title: 'Médicament ajouté',
        description: 'Le médicament a été ajouté au stock.',
      });
    }
    
    resetForm();
  };

  const handleDecrease = (id: string) => {
    setMedications(medications.map(m => 
      m.id === id ? { ...m, quantite: Math.max(0, m.quantite - 1) } : m
    ));
    toast({
      title: 'Stock mis à jour',
      description: 'La quantité a été diminuée de 1.',
    });
  };

  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setFormData({
      referenceMedicament: medication.referenceMedicament,
      nomMedicament: medication.nomMedicament,
      quantite: medication.quantite,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      referenceMedicament: '',
      nomMedicament: '',
      quantite: 0,
    });
    setEditingMedication(null);
    setIsDialogOpen(false);
  };

  const lowStockCount = medications.filter(m => m.quantite < 100).length;
  const totalStock = medications.reduce((acc, m) => acc + m.quantite, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              Gestion de la Pharmacie
            </h1>
            <p className="text-muted-foreground">
              {medications.length} médicament(s) • {totalStock} unités en stock
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Médicament
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMedication ? 'Modifier le médicament' : 'Ajouter un médicament'}
                </DialogTitle>
                <DialogDescription>
                  {editingMedication 
                    ? 'Modifiez les informations du médicament.'
                    : 'Ajoutez un nouveau médicament au stock.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="referenceMedicament">Référence *</Label>
                  <Input
                    id="referenceMedicament"
                    value={formData.referenceMedicament}
                    onChange={(e) => setFormData({ ...formData, referenceMedicament: e.target.value })}
                    placeholder="MED-001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomMedicament">Nom du médicament *</Label>
                  <Input
                    id="nomMedicament"
                    value={formData.nomMedicament}
                    onChange={(e) => setFormData({ ...formData, nomMedicament: e.target.value })}
                    placeholder="Paracétamol 500mg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantite">Quantité *</Label>
                  <Input
                    id="quantite"
                    type="number"
                    min="0"
                    value={formData.quantite}
                    onChange={(e) => setFormData({ ...formData, quantite: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="hero">
                    {editingMedication ? 'Enregistrer' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{medications.length}</p>
                <p className="text-sm text-muted-foreground">Médicaments</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-medical-success-light flex items-center justify-center">
                <Pill className="h-6 w-6 text-medical-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStock}</p>
                <p className="text-sm text-muted-foreground">Unités en stock</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-medical-warning-light flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-medical-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowStockCount}</p>
                <p className="text-sm text-muted-foreground">Stock faible</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un médicament..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card variant="elevated" className="shadow-none hover:shadow-none">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Nom du médicament</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((medication, index) => (
                    <TableRow key={medication.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell className="font-medium">{medication.referenceMedicament}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Pill className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{medication.nomMedicament}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold">{medication.quantite}</span>
                      </TableCell>
                      <TableCell>
                        {medication.quantite === 0 ? (
                          <Badge variant="destructive">Rupture</Badge>
                        ) : medication.quantite < 100 ? (
                          <Badge variant="warning">Stock faible</Badge>
                        ) : (
                          <Badge variant="success">En stock</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(medication)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDecrease(medication.id)}
                            disabled={medication.quantite === 0}
                          >
                            <Minus className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
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
