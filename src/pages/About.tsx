import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Award,
  Users,
  Target,
  Eye,
  ArrowRight,
  CheckCircle,
  Building,
  GraduationCap,
  Handshake,
} from 'lucide-react';

import heroImage from '@/assets/hero-medical-team.jpg';

import Footer from '@/components/layout/Footer';

const values = [
  {
    icon: Heart,
    title: 'Excellence médicale',
    description: 'Nous offrons des soins de la plus haute qualité grâce à une équipe de spécialistes expérimentés.',
  },
  {
    icon: Users,
    title: 'Patient au centre',
    description: 'Chaque patient est unique. Nous personnalisons notre approche pour répondre à vos besoins spécifiques.',
  },
  {
    icon: Handshake,
    title: 'Confiance et transparence',
    description: 'Nous établissons une relation de confiance basée sur la communication ouverte et honnête.',
  },
  {
    icon: GraduationCap,
    title: 'Innovation continue',
    description: 'Nous investissons dans les dernières technologies et formations pour vous offrir le meilleur.',
  },
];

const milestones = [
  { year: '2009', title: 'Création de SantéTunisie', description: 'Ouverture de notre premier centre médical à Tunis' },
  { year: '2013', title: 'Expansion nationale', description: 'Ouverture de nouveaux centres à Sfax, Sousse et Bizerte' },
  { year: '2017', title: 'Digitalisation', description: 'Lancement de notre plateforme tunisienne de gestion médicale en ligne' },
  { year: '2023', title: '15 000 patients', description: 'Nous atteignons le cap symbolique de 15 000 patients satisfaits à travers la Tunisie' },
];


export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl opacity-60 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/30 to-transparent rounded-full blur-2xl opacity-50 animate-fade-in" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              
              <h1 className="text-5xl md:text-6xl font-extrabold mb-8 animate-slide-up text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                Votre santé, notre <span className="">passion</span> depuis <span className="">15 ans</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Centre de Gestion Médicale est né d'une vision simple : rendre les soins de santé de qualité accessibles à tous. Depuis 2009, nous accompagnons des milliers de patients dans leur parcours de santé avec dévouement et professionnalisme.
              </p>
              <div className="flex gap-6 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Button size="xl" className="bg-primary text-white shadow-xl hover:scale-105 transition-transform duration-300" asChild>
                  <Link to="/contact">
                    Nous contacter
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center lg:items-stretch">
              <Card className="p-6 border-0 shadow-xl bg-white dark:bg-card hover:scale-105 transition-transform duration-300">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-md">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-300">Notre Mission</h3>
                <p className="text-base text-muted-foreground dark:text-zinc-300">
                  Fournir des soins médicaux d'excellence dans un environnement moderne et accueillant, tout en plaçant le bien-être du patient au cœur de nos préoccupations. Nous nous engageons à rendre la médecine accessible, humaine et personnalisée.
                </p>
              </Card>
              <Card className="p-6 border-0 shadow-xl bg-white dark:bg-card hover:scale-105 transition-transform duration-300">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-md">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-300">Notre Vision</h3>
                <p className="text-base text-muted-foreground dark:text-zinc-300">
                  Devenir la référence en matière de gestion médicale en Tunisie et en Afrique du Nord, en combinant expertise médicale, innovation technologique et approche humaine. Nous aspirons à transformer l'expérience des soins de santé.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>



      {/* Values */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos <span className="text-gradient">valeurs</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - horizontal */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre <span className="text-gradient">histoire</span>
            </h2>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="relative flex items-start gap-12 min-w-[700px] justify-center pb-12">
              {/* Ligne horizontale */}
              <div className="absolute left-0 right-0 top-10 h-1 bg-primary/10 z-0" style={{width:'100%'}} />
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col items-center flex-1 min-w-[200px] z-10">
                  <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold mb-4">
                    {milestone.year.slice(2)}
                  </div>
                  <span className="text-sm text-primary font-medium mb-1">{milestone.year}</span>
                  <h3 className="text-lg font-bold mb-1 text-center">{milestone.title}</h3>
                  <p className="text-muted-foreground text-center mb-2">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <Footer />
    </div>
  );
}
