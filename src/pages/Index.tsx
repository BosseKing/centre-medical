import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/layout/Footer';
import {
  Heart,
  Calendar,
  Users,
  Shield,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import heroImage from '@/assets/hero-medical-team.jpg';
import cardiologyImg from '@/assets/specialty-cardiology.jpg';
import neurologyImg from '@/assets/specialty-neurology.jpg';
import ophthalmologyImg from '@/assets/specialty-ophthalmology.jpg';
import dentistryImg from '@/assets/specialty-dentistry.jpg';
import generalImg from '@/assets/specialty-general.jpg';
import pediatricsImg from '@/assets/specialty-pediatrics.jpg';
import dermatologyImg from '@/assets/specialty-dermatology.jpg';
import orthopedicsImg from '@/assets/specialty-orthopedics.jpg';

const features = [
  {
    icon: Calendar,
    title: 'Prise de rendez-vous',
    description: 'Réservez facilement vos consultations en ligne 24h/24.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Équipe médicale',
    description: 'Des médecins spécialisés et dévoués à votre santé.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Données sécurisées',
    description: 'Vos informations médicales protégées et confidentielles.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Clock,
    title: 'Suivi continu',
    description: 'Accédez à votre dossier médical à tout moment.',
    color: 'from-amber-500 to-amber-600',
  },
];


const specialties = [
  {
    name: 'Cardiologie',
    image: cardiologyImg,
    description: "Prévention, diagnostic et traitement des maladies du cœur et des vaisseaux."
  },
  {
    name: 'Neurologie',
    image: neurologyImg,
    description: "Prise en charge des troubles du système nerveux et accompagnement personnalisé."
  },
  {
    name: 'Ophtalmologie',
    image: ophthalmologyImg,
    description: "Soins des yeux et correction de la vision."
  },
  {
    name: 'Dentisterie',
    image: dentistryImg,
    description: "Prévention et traitement des maladies bucco-dentaires."
  },
  {
    name: 'Médecine Générale',
    image: generalImg,
    description: "Suivi global de la santé pour toute la famille."
  },
  {
    name: 'Pédiatrie',
    image: pediatricsImg,
    description: "Soins médicaux pour les enfants et adolescents."
  },
  {
    name: 'Dermatologie',
    image: dermatologyImg,
    description: "Traitement des maladies de la peau, des cheveux et des ongles."
  },
  {
    name: 'Orthopédie',
    image: orthopedicsImg,
    description: "Prise en charge des pathologies de l'appareil locomoteur."
  },
];

const stats = [
  { label: 'Patients', value: 15000 },
  { label: 'Médecins', value: 40 },
  { label: 'Spécialités', value: 8 },
  { label: 'Disponibilité', value: '24/7' },
];

function AnimatedCounter({ target, className }: { target: number | string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof target !== 'number') return;
    let start = 0;
    const end = target;
    if (start === end || isNaN(end)) return;
    let current = start;
    const duration = 1000;
    const increment = end / (duration / 16);
    function step() {
      current += increment;
      if (ref.current) {
        if (current < end) {
          ref.current.textContent = Math.floor(current).toString();
          requestAnimationFrame(step);
        } else {
          ref.current.textContent = end.toString();
        }
      }
    }
    step();
  }, [target]);
  if (typeof target === 'string') {
    return <div className={className}>{target}</div>;
  }
  return <div ref={ref} className={className}>0</div>;
}


export default function Index() {
  const [currentSpecialty, setCurrentSpecialty] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSpecialty = () => {
    setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
  };

  const prevSpecialty = () => {
    setCurrentSpecialty((prev) => (prev - 1 + specialties.length) % specialties.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                <Award className="h-4 w-4" />
                Centre médical certifié
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                Votre santé, notre
                <span className="text-gradient"> priorité absolue</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Bienvenue à MediCare, votre centre de gestion médicale moderne. 
                Une équipe de professionnels dévoués pour prendre soin de vous et votre famille.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/login">
                    Connectez-vous
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/login">
                    Espace Extranet
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={heroImage} 
                    alt="Équipe médicale MediCare" 
                    className="w-full object-cover max-h-64 md:max-h-80 lg:max-h-96"
                  />
                </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">+15 000</p>
                    <p className="text-sm text-muted-foreground">Patients satisfaits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {stat.value === '24/7' ? (
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
                ) : (
                  <div className="flex items-center justify-center">
                    <AnimatedCounter target={stat.value} className="text-3xl md:text-4xl font-bold text-gradient mb-2" />
                    <span className="text-2xl md:text-3xl font-bold text-gradient mb-2 ml-1">+</span>
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section - Improved Style */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pourquoi choisir <span className="text-gradient">notre centre</span> ?
          </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardContent className="p-8 relative z-10">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section - Carousel */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
    
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos <span className="text-gradient">spécialités</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Une équipe de médecins spécialisés pour répondre à tous vos besoins de santé.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center gap-6">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="icon"
                className="hidden md:flex h-12 w-12 rounded-full shrink-0 border-2"
                onClick={prevSpecialty}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Cards Container */}
              <div className="flex-1 overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSpecialty * 100}%)` }}
                >
                  {specialties.map((specialty, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <Card className="overflow-hidden border-0">
                        <div className="grid md:grid-cols-2">
                          <div className="relative h-64 md:h-80">
                            <img 
                              src={specialty.image} 
                              alt={specialty.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 md:bg-gradient-to-l" />
                          </div>
                          <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold mb-4 text-primary">{specialty.name}</h3>
                            <p className="text-muted-foreground text-xl md:text-2xl mb-8 leading-relaxed">{specialty.description}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
               ))}
                </div>
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                className="hidden md:flex h-12 w-12 rounded-full shrink-0 border-2"
                onClick={nextSpecialty}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={prevSpecialty}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSpecialty}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {specialties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSpecialty(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSpecialty ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="relative p-8 md:p-12 lg:p-16 gradient-primary">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>
              
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Prêt à prendre soin de votre santé ?
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Rejoignez des milliers de patients satisfaits et bénéficiez d'un suivi médical personnalisé.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/login">
                      Commencer
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
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
