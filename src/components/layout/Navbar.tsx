import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-background border-b border-gray-300 dark:border-b-0 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-glow">
              <img
                src="/logo.png"
                alt="Logo Centre Médical"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gradient">
              Centre de Gestion Médicale
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
            <Link to="/about" className="nav-link">
              À propos
            </Link>
            <Link to="/services" className="nav-link">
              Services
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="hero" className="transition-all shadow-md hover:scale-105 focus:ring-2 focus:ring-secondary/60" asChild>
              <Link to="/login">Espace Extranet</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Ouvrir le menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up bg-white/90 dark:bg-neutral-900/95 rounded-b-xl shadow-xl mt-2">
            <div className="flex flex-col gap-3">
              <Link to="/" className="nav-link-mobile">
                Accueil
              </Link>
              <Link to="/about" className="nav-link-mobile">
                À propos
              </Link>
              <Link to="/services" className="nav-link-mobile">
                Services
              </Link>
              <Link to="/contact" className="nav-link-mobile">
                Contact
              </Link>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 transition-all shadow-sm hover:shadow-lg focus:ring-2 focus:ring-primary/60" asChild>
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button variant="hero" className="flex-1 transition-all shadow-md hover:scale-105 focus:ring-2 focus:ring-secondary/60" asChild>
                  <Link to="/login">Espace Extranet</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Styles utilitaires pour les liens */}
      <style>{`
        .nav-link {
          @apply text-base font-semibold text-muted-foreground px-2 py-1 rounded-lg transition-all duration-200 hover:text-primary hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60;
          position: relative;
        }
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .nav-link:hover::after, .nav-link:focus::after {
          width: 100%;
        }
        .nav-link-mobile {
          @apply text-base font-semibold py-2 px-4 rounded-lg hover:bg-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60;
        }
      `}</style>
    </nav>
  );
}
