import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Plus, User, Calendar, Heart, Droplet, Phone, Mail, Search } from 'lucide-react';
import { mockPatients, mockMedicalHistory } from '@/data/mockData';
import { MedicalHistory } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const HISTORY_TYPES = ['Consultation', 'Examen', 'Traitement', 'Chirurgie', 'Hospitalisation'];

export default function MedicalRecords() {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>(mockMedicalHistory);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    patientId: '',
    type: '',
    titre: '',
    detail_evenement: '',
    traitement: '',
  });

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.numero_cin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPatientHistory = (patientId: string) => {
    return medicalHistory.filter((h) => h.patientId === patientId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newHistory: MedicalHistory = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      doctorId: user?.id || '1',
    };
    
    setMedicalHistory([...medicalHistory, newHistory]);
    toast({
      title: 'Historique ajouté',
      description: 'L\'événement médical a été enregistré.',
    });
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      patientId: selectedPatient || '',
      type: '',
      titre: '',
      detail_evenement: '',
      traitement: '',
    });
    setIsDialogOpen(false);
  };

  const patient = selectedPatient ? mockPatients.find(p => p.id === selectedPatient) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Dossiers Médicaux
            </h1>
            <p className="text-muted-foreground">
              Consultez et gérez les dossiers médicaux des patients
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <Card variant="elevated" className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Liste des patients</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <div className="space-y-2">
                {filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedPatient === p.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-medium ${
                        selectedPatient === p.id
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {p.prenom[0]}{p.nom[0]}
                      </div>
                      <div>
                        <p className="font-medium">{p.prenom} {p.nom}</p>
                        <p className={`text-sm ${selectedPatient === p.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {p.numero_cin}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Details & History */}
          <div className="lg:col-span-2 space-y-6">
            {patient ? (
              <>
                {/* Patient Info Card */}
                <Card variant="elevated">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {patient.prenom} {patient.nom}
                      </CardTitle>
                      <p className="text-muted-foreground">CIN: {patient.numero_cin}</p>
                    </div>
                    {user?.role === 'doctor' && (
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="hero" size="sm" onClick={() => setFormData({ ...formData, patientId: patient.id })}>
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter historique
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Ajouter un historique médical</DialogTitle>
                            <DialogDescription>
                              Enregistrez un nouvel événement médical pour ce patient.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label>Type *</Label>
                              <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner le type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {HISTORY_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="titre">Titre *</Label>
                              <Input
                                id="titre"
                                value={formData.titre}
                                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="detail">Détail de l'événement *</Label>
                              <Textarea
                                id="detail"
                                value={formData.detail_evenement}
                                onChange={(e) => setFormData({ ...formData, detail_evenement: e.target.value })}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="traitement">Traitement</Label>
                              <Textarea
                                id="traitement"
                                value={formData.traitement}
                                onChange={(e) => setFormData({ ...formData, traitement: e.target.value })}
                              />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                              <Button type="button" variant="outline" onClick={resetForm}>
                                Annuler
                              </Button>
                              <Button type="submit" variant="hero">
                                Enregistrer
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Sexe</p>
                          <p className="font-medium">{patient.sexe === 'M' ? 'Masculin' : 'Féminin'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date de naissance</p>
                          <p className="font-medium">{new Date(patient.date_naissance).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Droplet className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Groupe sanguin</p>
                          <p className="font-medium">{patient.groupe_sanguin || 'Non renseigné'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Téléphone</p>
                          <p className="font-medium">{patient.telephone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical History */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Historique médical
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getPatientHistory(patient.id).length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {getPatientHistory(patient.id).map((history, index) => (
                          <AccordionItem key={history.id} value={history.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-3 text-left">
                                <Badge variant="medical">{history.type}</Badge>
                                <span className="font-medium">{history.titre}</span>
                                <span className="text-sm text-muted-foreground ml-auto mr-4">
                                  {new Date(history.date).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Détail</p>
                                  <p>{history.detail_evenement}</p>
                                </div>
                                {history.traitement && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Traitement</p>
                                    <p>{history.traitement}</p>
                                  </div>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Aucun historique médical enregistré</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card variant="elevated" className="flex items-center justify-center h-[400px]">
                <div className="text-center text-muted-foreground">
                  <User className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Sélectionnez un patient</p>
                  <p className="text-sm">Choisissez un patient dans la liste pour voir son dossier médical</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
