import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Plus, UserCog, Search, Edit, Trash2, Stethoscope } from 'lucide-react';
import { mockDoctors } from '@/data/mockData';
import { Doctor, SPECIALTIES, DAYS_OF_WEEK } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Doctor>>({
    referenceMedecin: '',
    num_cin: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    specialite: '',
    jours_travail: [],
  });

  const filteredDoctors = doctors.filter(
    (d) =>
      d.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialite.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDayToggle = (day: string) => {
    const currentDays = formData.jours_travail || [];
    if (currentDays.includes(day)) {
      setFormData({
        ...formData,
        jours_travail: currentDays.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        jours_travail: [...currentDays, day],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDoctor) {
      setDoctors(doctors.map(d => 
        d.id === editingDoctor.id ? { ...d, ...formData } : d
      ));
      toast({
        title: 'Médecin modifié',
        description: 'Les informations ont été mises à jour.',
      });
    } else {
      const newDoctor: Doctor = {
        ...formData as Doctor,
        id: Date.now().toString(),
      };
      setDoctors([...doctors, newDoctor]);
      toast({
        title: 'Médecin ajouté',
        description: 'Le nouveau médecin a été enregistré.',
      });
    }
    
    resetForm();
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDoctors(doctors.filter(d => d.id !== id));
    toast({
      title: 'Médecin supprimé',
      description: 'Le médecin a été retiré de la liste.',
    });
  };

  const resetForm = () => {
    setFormData({
      referenceMedecin: '',
      num_cin: '',
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      specialite: '',
      jours_travail: [],
    });
    setEditingDoctor(null);
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" />
              Gestion des Médecins
            </h1>
            <p className="text-muted-foreground">
              {doctors.length} médecin(s) enregistré(s)
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => { setEditingDoctor(null); resetForm(); }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Médecin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDoctor ? 'Modifier le médecin' : 'Ajouter un nouveau médecin'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations du médecin ci-dessous.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referenceMedecin">Référence *</Label>
                    <Input
                      id="referenceMedecin"
                      value={formData.referenceMedecin}
                      onChange={(e) => setFormData({ ...formData, referenceMedecin: e.target.value })}
                      placeholder="MED001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="num_cin">Numéro CIN *</Label>
                    <Input
                      id="num_cin"
                      value={formData.num_cin}
                      onChange={(e) => setFormData({ ...formData, num_cin: e.target.value })}
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
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

                <div className="space-y-2">
                  <Label>Spécialité *</Label>
                  <Select
                    value={formData.specialite}
                    onValueChange={(value) => setFormData({ ...formData, specialite: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Jours de travail *</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={formData.jours_travail?.includes(day)}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <Label htmlFor={day} className="text-sm font-normal cursor-pointer">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="hero">
                    {editingDoctor ? 'Enregistrer' : 'Ajouter'}
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
                placeholder="Rechercher par nom ou spécialité..."
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
                    <TableHead>Médecin</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Jours de travail</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor, index) => (
                    <TableRow key={doctor.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell className="font-medium">{doctor.referenceMedecin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Dr. {doctor.prenom} {doctor.nom}</p>
                            <p className="text-sm text-muted-foreground">{doctor.num_cin}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="medical">{doctor.specialite}</Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{doctor.telephone}</p>
                        <p className="text-sm text-muted-foreground">{doctor.email}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {doctor.jours_travail.map((jour) => (
                            <Badge key={jour} variant="secondary" className="text-xs">
                              {jour.slice(0, 3)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(doctor)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(doctor.id)}>
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
