import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Pill,
  Receipt,
  UserCog,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  roles: UserRole[];
}


const navItems: NavItem[] = [
  { label: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard', roles: ['receptionist', 'patient', 'doctor', 'director', 'pharmacist', 'cashier'] },
  { label: 'Patients', icon: Users, href: '/dashboard/patients', roles: ['receptionist', 'doctor', 'director'] },
  { label: 'Rendez-vous', icon: Calendar, href: '/dashboard/appointments', roles: ['receptionist', 'patient', 'doctor'] },
  // Pour les patients, le lien doit pointer vers leur propre dossier médical
  { label: 'Dossiers médicaux', icon: FileText, href: '/dashboard/medical-records', roles: ['doctor'] },
  { label: 'Mon dossier médical', icon: FileText, href: '/dashboard/medical-records/me', roles: ['patient'] },
  { label: 'Mes rendez-vous', icon: Calendar, href: '/dashboard/my-appointments', roles: ['patient'] },
  { label: 'Mes factures', icon: Receipt, href: '/dashboard/my-invoices', roles: ['patient'] },
  { label: 'Médecins', icon: UserCog, href: '/dashboard/doctors', roles: ['director'] },
  { label: 'Utilisateurs', icon: Users, href: '/dashboard/users', roles: ['director'] },
  { label: 'Pharmacie', icon: Pill, href: '/dashboard/pharmacy', roles: ['pharmacist'] },
  { label: 'Facturation', icon: Receipt, href: '/dashboard/invoices', roles: ['cashier'] },
];

function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout, getRoleLabel } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredNavItems = navItems.filter(
    item => user && item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-gradient">MediCare</span>
              <Badge variant="medical" className="ml-2 text-xs">Pro</Badge>
            </div>
          </div>

          {/* User info */}
          {user && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {user.prenom[0]}{user.nom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{user.prenom} {user.nom}</p>
                  <p className="text-xs text-muted-foreground">{getRoleLabel(user.role)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-4 h-16 px-4 lg:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                Bienvenue, {user?.prenom}
              </h1>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export { DashboardLayout };
export default DashboardLayout;
