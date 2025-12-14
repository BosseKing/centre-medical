export type UserRole = 'receptionist' | 'patient' | 'doctor' | 'director' | 'pharmacist' | 'cashier';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  nom: string;
  prenom: string;
  telephone?: string;
  createdAt: Date;
}

export interface Patient {
  id: string;
  numero_cin: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  telephone: string;
  ville: string;
  adresse: string;
  email: string;
  sexe?: 'M' | 'F';
  groupe_sanguin?: string;
}

export interface Doctor {
  id: string;
  referenceMedecin: string;
  num_cin: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  specialite: string;
  jours_travail: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  heure: string;
  motif: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  type: string;
  titre: string;
  detail_evenement: string;
  traitement: string;
  date: string;
  doctorId: string;
}

export interface MedicalRecord {
  patient: Patient;
  historique: MedicalHistory[];
}

export interface Medication {
  id: string;
  referenceMedicament: string;
  nomMedicament: string;
  quantite: number;
}

export interface Invoice {
  id: string;
  patientId: string;
  montant: number;
  description: string;
  date: string;
  status: 'pending' | 'paid';
  patient?: Patient;
}

export const SPECIALTIES = [
  'Cardiologue',
  'Ophtalmologue',
  'Dentiste',
  'Dermatologue',
  'Généraliste',
  'Pédiatre',
  'Gynécologue',
  'Neurologue',
  'Orthopédiste',
  'ORL',
] as const;

export const DAYS_OF_WEEK = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
] as const;

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
