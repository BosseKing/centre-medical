import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Patients from "./pages/dashboard/Patients";
import Appointments from "./pages/dashboard/Appointments";
import MedicalRecords from "./pages/dashboard/MedicalRecords";
import MedicalRecordMe from "./pages/dashboard/MedicalRecordMe";
import MyAppointments from "./pages/dashboard/MyAppointments";
import MyInvoices from "./pages/dashboard/MyInvoices";
import Doctors from "./pages/dashboard/Doctors";
import Users from "./pages/dashboard/Users";
import Pharmacy from "./pages/dashboard/Pharmacy";
import Invoices from "./pages/dashboard/Invoices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/patients"
        element={
          <ProtectedRoute>
            <Patients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/medical-records"
        element={
          <ProtectedRoute>
            <MedicalRecords />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/medical-records/me"
        element={
          <ProtectedRoute>
            <MedicalRecordMe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/my-appointments"
        element={
          <ProtectedRoute>
            <MyAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/my-invoices"
        element={
          <ProtectedRoute>
            <MyInvoices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/doctors"
        element={
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/pharmacy"
        element={
          <ProtectedRoute>
            <Pharmacy />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/invoices"
        element={
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
