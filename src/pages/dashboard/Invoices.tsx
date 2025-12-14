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
import { Plus, Receipt, Search, Edit, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { mockInvoices, mockPatients } from '@/data/mockData';
import { Invoice } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patientId: '',
    montant: 0,
    description: '',
  });

  const filteredInvoices = invoices.filter(
    (i) =>
      i.patient?.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.patient?.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = mockPatients.find(p => p.id === formData.patientId);

    if (editingInvoice) {
      setInvoices(invoices.map(i => 
        i.id === editingInvoice.id ? { ...i, ...formData, patient } : i
      ));
      toast({
        title: 'Facture modifiée',
        description: 'La facture a été mise à jour.',
      });
    } else {
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        patient,
      };
      setInvoices([...invoices, newInvoice]);
      toast({
        title: 'Facture créée',
        description: 'La nouvelle facture a été enregistrée.',
      });
    }
    
    resetForm();
  };

  const handleMarkAsPaid = (id: string) => {
    setInvoices(invoices.map(i => 
      i.id === id ? { ...i, status: 'paid' } : i
    ));
    toast({
      title: 'Facture payée',
      description: 'La facture a été marquée comme payée.',
    });
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      patientId: invoice.patientId,
      montant: invoice.montant,
      description: invoice.description,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      patientId: '',
      montant: 0,
      description: '',
    });
    setEditingInvoice(null);
    setIsDialogOpen(false);
  };

  const totalPending = invoices
    .filter(i => i.status === 'pending')
    .reduce((acc, i) => acc + i.montant, 0);
  const totalPaid = invoices
    .filter(i => i.status === 'paid')
    .reduce((acc, i) => acc + i.montant, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Receipt className="h-6 w-6 text-primary" />
              Gestion des Factures
            </h1>
            <p className="text-muted-foreground">
              {invoices.length} facture(s) au total
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Facture
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingInvoice ? 'Modifier la facture' : 'Créer une facture'}
                </DialogTitle>
                <DialogDescription>
                  {editingInvoice 
                    ? 'Modifiez les informations de la facture.'
                    : 'Créez une nouvelle facture pour un patient.'}
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
                  <Label htmlFor="montant">Montant (MAD) *</Label>
                  <Input
                    id="montant"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.montant}
                    onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Détail des prestations..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="hero">
                    {editingInvoice ? 'Enregistrer' : 'Créer'}
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
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{invoices.length}</p>
                <p className="text-sm text-muted-foreground">Total factures</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-medical-warning-light flex items-center justify-center">
                <Clock className="h-6 w-6 text-medical-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPending.toLocaleString()} MAD</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-medical-success-light flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-medical-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPaid.toLocaleString()} MAD</p>
                <p className="text-sm text-muted-foreground">Payées</p>
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
                placeholder="Rechercher une facture..."
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
                    <TableHead>Date</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice, index) => (
                    <TableRow key={invoice.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell>
                        {new Date(invoice.date).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {invoice.patient?.prenom[0]}{invoice.patient?.nom[0]}
                          </div>
                          <div>
                            <p className="font-medium">{invoice.patient?.prenom} {invoice.patient?.nom}</p>
                            <p className="text-sm text-muted-foreground">{invoice.patient?.numero_cin}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-xs truncate">{invoice.description}</p>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold">{invoice.montant.toLocaleString()} MAD</span>
                      </TableCell>
                      <TableCell>
                        {invoice.status === 'paid' ? (
                          <Badge variant="success">Payée</Badge>
                        ) : (
                          <Badge variant="warning">En attente</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(invoice)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {invoice.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleMarkAsPaid(invoice.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-medical-success" />
                            </Button>
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
