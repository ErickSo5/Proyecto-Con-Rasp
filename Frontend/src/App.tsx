import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorHome from "./pages/Medico";
import FAQ from "./pages/FAQ";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyNotice from "./components/PrivacyNotice";
import BlogPage from "./blog/page";
import NotFound from "./error/NotFound";
import SlugPage from "./blog/slug";
import ServiciosPage from "./servicios/page";
import ServiciosPageSlug from "./servicios/slug";
import MensajesPage from "./mensajes/page";
import AyudaMedicoPage from "./medico/ayuda/page";
import MedicoNavigationMap from "./components/MedicoNavigationMap";
import RecuperarPassword from "./pages/RecuperarContraseña";
import LoginPage from "./pages/LoginPage";
import TerminosPage from "./pages/TerminosPage";
import RegisterPage from "./pages/RegisterPage";
import AyudaPage from "./pages/AyudaPage";
import MapaUsuario from "./pages/MapaUsuarioPage";
import DoctorAgendaPage from "./medico/agenda/page";
import AgendarCitaPage from "./agendar-cita/page";
import DoctorAppointmentsPage from "./medico/citas/page";
import ProtectedRoute from "./Guards/ProtectedRoute";
import DashboardPage from "./dashboard/page";
import MFAVerify from "./pages/MFAVerify";
import SetupMFA from "./pages/SetupMFA";
import CambiarPasswordPage from "./pages/CambiarPasswordPage";

function App() {
  return (
    <>
      <Routes>

        {/* MFA */}
        <Route path="/mfa" element={<MFAVerify />} />
        <Route path="/setup-mfa" element={<SetupMFA />} />

        {/* Free */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/privacidad" element={<PrivacyNotice />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SlugPage />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/forget-password" element={<RecuperarPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/ayuda" element={<AyudaPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cambiar-password" element={<CambiarPasswordPage />} />

        {/* Cliente */}
        <Route
          path="/mapausuario"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <MapaUsuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cliente/cita"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <AgendarCitaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cliente/servicios"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <ServiciosPage />
            </ProtectedRoute>
          }
        />
        <Route path="/servicios/:slug" element={<ServiciosPageSlug />} />
        <Route
          path="/mensajes"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <MensajesPage />
            </ProtectedRoute>
          }
        />

        {/* Medico */}
        <Route
          path="/medico"
          element={
            <ProtectedRoute allowedRoles={["medico"]}>
              <DoctorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medico/ayuda"
          element={
            <ProtectedRoute allowedRoles={["medico"]}>
              <AyudaMedicoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medico/mapa"
          element={
            <ProtectedRoute allowedRoles={["medico"]}>
              <MedicoNavigationMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medico/agenda"
          element={
            <ProtectedRoute allowedRoles={["medico"]}>
              <DoctorAgendaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medico/citas"
          element={
            <ProtectedRoute allowedRoles={["medico"]}>
              <DoctorAppointmentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
