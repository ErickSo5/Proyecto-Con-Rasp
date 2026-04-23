import { LoginForm } from "../components/LoginForm"
import { Stethoscope, Shield, Clock } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="h-screen w-full bg-background flex">
      {/* Panel izquierdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3B82F6] to-[#60A6FA] relative overflow-hidden">
        {/* Decoraciones de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="max-w-md text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-balance">
              Clínica Victorio
            </h1>
            <p className="text-lg text-white/90 mb-12 leading-relaxed">
              Acceda a su portal de administración para gestionar pacientes, citas y más.
            </p>

            {/* Características */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Acceso Seguro</h3>
                  <p className="text-sm text-white/80">Protección de datos con encriptación avanzada</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Disponible 24/7</h3>
                  <p className="text-sm text-white/80">Acceso en cualquier momento y desde cualquier lugar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Login */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <LoginForm />

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 Clínica Victorio. Todos los derechos reservados.
            </p>
            <div className="mt-2 flex justify-center space-x-4 text-xs">
              <a href="terminos" className="text-muted-foreground hover:text-primary transition-colors">
                Términos de uso
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="terminos" className="text-muted-foreground hover:text-primary transition-colors">
                Política de privacidad
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
