import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Eye, Users } from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import { Patient, BLOOD_GROUPS } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Patient>>({
    numero_cin: '',
    nom: '',
    prenom: '',
    date_naissance: '',
    telephone: '',
    ville: '',
    adresse: '',
    email: '',
    sexe: 'M',
    groupe_sanguin: '',
  });

  const filteredPatients = patients.filter(
    (p) =>
      p.numero_cin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPatient) {
      setPatients(patients.map(p => 
        p.id === editingPatient.id ? { ...p, ...formData } : p
      ));
      toast({
        title: 'Patient modifié',
        description: 'Les informations du patient ont été mises à jour.',
      });
    } else {
      const newPatient: Patient = {
        ...formData as Patient,
        id: Date.now().toString(),
      };
      setPatients([...patients, newPatient]);
      toast({
        title: 'Patient ajouté',
        description: 'Le nouveau patient a été enregistré avec succès.',
      });
    }
    
    resetForm();
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData(patient);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
    toast({
      title: 'Patient supprimé',
      description: 'Le patient a été supprimé de la liste.',
    });
  };

  const resetForm = () => {
    setFormData({
      numero_cin: '',
      nom: '',
      prenom: '',
      date_naissance: '',
      telephone: '',
      ville: '',
      adresse: '',
      email: '',
      sexe: 'M',
      groupe_sanguin: '',
    });
    setEditingPatient(null);
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Gestion des Patients
            </h1>
            <p className="text-muted-foreground">
              {patients.length} patient(s) enregistré(s)
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => { setEditingPatient(null); resetForm(); }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPatient ? 'Modifier le patient' : 'Ajouter un nouveau patient'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations du patient ci-dessous.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numero_cin">Numéro CIN *</Label>
                    <Input
                      id="numero_cin"
                      value={formData.numero_cin}
                      onChange={(e) => setFormData({ ...formData, numero_cin: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date_naissance">Date de naissance *</Label>
                    <Input
                      id="date_naissance"
                      type="date"
                      value={formData.date_naissance}
                      onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sexe">Sexe</Label>
                    <Select
                      value={formData.sexe}
                      onValueChange={(value: 'M' | 'F') => setFormData({ ...formData, sexe: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculin</SelectItem>
                        <SelectItem value="F">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupe_sanguin">Groupe sanguin</Label>
                    <Select
                      value={formData.groupe_sanguin}
                      onValueChange={(value) => setFormData({ ...formData, groupe_sanguin: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOOD_GROUPS.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ville">Ville *</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse *</Label>
                    <Input
                      id="adresse"
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="hero">
                    {editingPatient ? 'Enregistrer' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par CIN, nom ou prénom..."
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
                    <TableHead>CIN</TableHead>
                    <TableHead>Nom complet</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Groupe sanguin</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient, index) => (
                    <TableRow key={patient.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell className="font-medium">{patient.numero_cin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                            {patient.prenom[0]}{patient.nom[0]}
                          </div>
                          <div>
                            <p className="font-medium">{patient.prenom} {patient.nom}</p>
                            <p className="text-sm text-muted-foreground">{patient.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.telephone}</TableCell>
                      <TableCell>{patient.ville}</TableCell>
                      <TableCell>
                        {patient.groupe_sanguin && (
                          <Badge variant="medical">{patient.groupe_sanguin}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(patient)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(patient.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
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
