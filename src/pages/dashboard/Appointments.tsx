import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Calendar, Clock, Edit, CheckCircle, XCircle } from 'lucide-react';
import { mockAppointments, mockPatients, mockDoctors } from '@/data/mockData';
import { Appointment, SPECIALTIES } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    heure: '',
    motif: '',
    notes: '',
  });

  const filteredDoctors = selectedSpecialty
    ? mockDoctors.filter((d) => d.specialite === selectedSpecialty)
    : mockDoctors;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = mockPatients.find(p => p.id === formData.patientId);
    const doctor = mockDoctors.find(d => d.id === formData.doctorId);

    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === editingAppointment.id 
          ? { ...a, ...formData, patient, doctor } 
          : a
      ));
      toast({
        title: 'Rendez-vous modifié',
        description: 'Le rendez-vous a été mis à jour avec succès.',
      });
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...formData,
        status: 'scheduled',
        patient,
        doctor,
      };
      setAppointments([...appointments, newAppointment]);
      toast({
        title: 'Rendez-vous créé',
        description: 'Le rendez-vous a été enregistré avec succès.',
      });
    }
    
    resetForm();
  };

  const handleStatusChange = (id: string, status: 'completed' | 'cancelled') => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status } : a
    ));
    toast({
      title: status === 'completed' ? 'Rendez-vous terminé' : 'Rendez-vous annulé',
      description: `Le statut du rendez-vous a été mis à jour.`,
    });
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      heure: appointment.heure,
      motif: appointment.motif,
      notes: appointment.notes || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      patientId: '',
      doctorId: '',
      date: '',
      heure: '',
      motif: '',
      notes: '',
    });
    setSelectedSpecialty('');
    setEditingAppointment(null);
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="info">Prévu</Badge>;
      case 'completed':
        return <Badge variant="success">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Gestion des Rendez-vous
            </h1>
            <p className="text-muted-foreground">
              {appointments.length} rendez-vous au total
            </p>
          </div>
          
          {user?.role === 'receptionist' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Rendez-vous
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingAppointment ? 'Modifier le rendez-vous' : 'Prendre un rendez-vous'}
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations du rendez-vous.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Patient *</Label>
                    <Select
                      value={formData.patientId}
                      onValueChange={(value) => setFormData({ ...formData, patientId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.prenom} {patient.nom} - {patient.numero_cin}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Spécialité</Label>
                    <Select
                      value={selectedSpecialty}
                      onValueChange={setSelectedSpecialty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrer par spécialité" />
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
                    <Label>Médecin *</Label>
                    <Select
                      value={formData.doctorId}
                      onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un médecin" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredDoctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            Dr. {doctor.prenom} {doctor.nom} - {doctor.specialite}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heure">Heure *</Label>
                      <Input
                        id="heure"
                        type="time"
                        value={formData.heure}
                        onChange={(e) => setFormData({ ...formData, heure: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motif">Motif de consultation *</Label>
                    <Textarea
                      id="motif"
                      value={formData.motif}
                      onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
                      placeholder="Décrivez le motif de la consultation..."
                      required
                    />
                  </div>

                  {editingAppointment && (
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes du médecin</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Ajouter des notes..."
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                    <Button type="submit" variant="hero">
                      {editingAppointment ? 'Enregistrer' : 'Créer'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Table */}
        <Card variant="elevated" className="shadow-none hover:shadow-none">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Heure</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Médecin</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={appointment.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{new Date(appointment.date).toLocaleDateString('fr-FR')}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointment.heure}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{appointment.patient?.prenom} {appointment.patient?.nom}</p>
                        <p className="text-sm text-muted-foreground">{appointment.patient?.numero_cin}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">Dr. {appointment.doctor?.prenom} {appointment.doctor?.nom}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor?.specialite}</p>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-xs truncate">{appointment.motif}</p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(appointment)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {appointment.status === 'scheduled' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleStatusChange(appointment.id, 'completed')}
                              >
                                <CheckCircle className="h-4 w-4 text-medical-success" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              >
                                <XCircle className="h-4 w-4 text-destructive" />
                              </Button>
                            </>
                          )}
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
