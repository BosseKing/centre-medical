import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue sur votre espace personnel.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Erreur de connexion',
          description: 'Email ou mot de passe incorrect.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'reception@clinique.ma', role: 'Réceptionniste' },
    { email: 'patient@clinique.ma', role: 'Patient' },
    { email: 'docteur@clinique.ma', role: 'Médecin' },
    { email: 'directeur@clinique.ma', role: 'Directeur' },
    { email: 'pharmacien@clinique.ma', role: 'Pharmacien' },
    { email: 'caissier@clinique.ma', role: 'Caissier' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center mt-12">
          <div className="flex w-full max-w-5xl items-stretch justify-center gap-0 py-8">
            {/* Conteneur fusionné avec bordure arrondie */}
            <div className="flex flex-col lg:flex-row w-full border border-border bg-background rounded-2xl shadow-none overflow-hidden">
              {/* Partie gauche : branding (affiché uniquement sur lg+) */}
              <div className="hidden lg:flex flex-col items-center justify-center px-8 py-10 lg:w-1/2 gradient-primary relative">
                <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 text-center">
                  Bienvenue sur votre espace santé
                </h1>
                <p className="text-lg text-primary-foreground/80 max-w-md text-center">
                  Connectez-vous pour accéder à vos rendez-vous, dossiers médicaux et bien plus encore.
                </p>
              </div>
              {/* Partie droite : formulaire */}
              <div className="flex flex-col items-center justify-center px-6 py-10 lg:w-1/2">
                
                <Card variant="elevated" className="animate-scale-in bg-background shadow-none hover:shadow-none w-full border-0">
                  <div className="flex flex-col items-center gap-3 mb-6 mt-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm overflow-hidden">
                      <img src="/logo.png" alt="Logo" className="h-10 w-10 object-cover rounded-lg" />
                    </div>
                    <span className="text-2xl font-bold text-gradient">Centre de Gestion Médicale</span>
                  </div>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Connectez-Vous</CardTitle>
                    <CardDescription>
                      Entrez vos identifiants pour accéder à votre espace
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <FloatingLabelInput
                          id="email"
                          type="text"
                          label="Identifiant"
                          autoComplete="username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <div className="relative">
                          <FloatingLabelInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Mot de passe"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <Link to="/forgot-password" className="block mt-4 text-sm text-primary hover:underline text-right">
                          Mot de passe oublié ?
                        </Link>
                      </div>
                      <Button type="submit" variant="hero" className="w-full flex items-center justify-center gap-2 rounded-[50px] shadow-none hover:shadow-none mt-4 transition-transform duration-200 hover:scale-105" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Connexion...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3" />
                            </svg>
                            Se connecter
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      
      </div>
        </div>
  );
}
