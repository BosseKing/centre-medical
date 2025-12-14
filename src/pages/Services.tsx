import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Stethoscope,
  Brain,
  Eye,
  Smile,
  Users,
  Microscope,
  Pill,
  Ambulance,
  Calendar,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

import Footer from '@/components/layout/Footer';

const mainServices = [
  {
    icon: Stethoscope,
    title: 'Consultations médicales',
    description: 'Consultations avec nos médecins spécialisés dans un cadre moderne et accueillant.',
    features: ['Médecine générale', 'Spécialités médicales', 'Suivi personnalisé'],
  },
  {
    icon: Microscope,
    title: 'Examens et analyses',
    description: 'Laboratoire équipé des dernières technologies pour des résultats précis et rapides.',
    features: ['Analyses sanguines', 'Imagerie médicale', 'Tests spécialisés'],
  },
  {
    icon: Ambulance,
    title: 'Urgences 24/7',
    description: 'Service d\'urgences disponible 24h/24 avec une équipe médicale expérimentée.',
    features: ['Disponibilité permanente', 'Équipe d\'urgence', 'Prise en charge rapide'],
  },
  {
    icon: Pill,
    title: 'Pharmacie intégrée',
    description: 'Pharmacie sur place pour un accès immédiat à vos médicaments prescrits.',
    features: ['Médicaments disponibles', 'Conseils pharmaceutiques', 'Gratuits pour les patients' ],
  },
];

const specialties = [
  { icon: Heart, name: 'Cardiologie', description: 'Diagnostic et traitement des maladies cardiaques' },
  { icon: Brain, name: 'Neurologie', description: 'Troubles du système nerveux central et périphérique' },
  { icon: Eye, name: 'Ophtalmologie', description: 'Soins complets de la vision et des yeux' },
  { icon: Smile, name: 'Dentisterie', description: 'Soins dentaires préventifs et curatifs' },
  { icon: Users, name: 'Pédiatrie', description: 'Santé et bien-être des enfants' },
  { icon: Stethoscope, name: 'Médecine générale', description: 'Suivi médical et prévention' },
];

const digitalServices = [
  {
    icon: Calendar,
    title: 'Prise de rendez-vous en ligne',
    description: 'Réservez vos consultations 24h/24 depuis notre plateforme',
  },
  {
    icon: FileText,
    title: 'Dossier médical numérique',
    description: 'Accédez à votre historique médical à tout moment',
  },
  {
    icon: Shield,
    title: 'Données sécurisées',
    description: 'Vos informations protégées par les dernières normes de sécurité',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
     

      {/* Main Services */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Services <span className="text-gradient">principaux</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <Card key={index} className="p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex gap-6">
                  <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos <span className="text-gradient">spécialités</span>
            </h2>
            <p className="text-muted-foreground">
              Une équipe de médecins experts dans différents domaines médicaux
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <specialty.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{specialty.name}</h3>
                <p className="text-sm text-muted-foreground">{specialty.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Services <span className="text-gradient">numériques</span>
            </h2>
            <p className="text-muted-foreground">
              Profitez de notre plateforme moderne pour gérer votre santé en toute simplicité
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {digitalServices.map((service, index) => (
              <Card key={index} className="p-8 text-center border-0 shadow-lg">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Besoin d'une consultation ?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Notre équipe est disponible pour vous accompagner. Prenez rendez-vous dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/login">
                Prendre rendez-vous
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
