import { RegistroForm } from "../components/RegisterForm";
import { Heart, Shield, Clock, Users } from "lucide-react";

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full border-2 border-white" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border-2 border-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Clínica Victorio</h2>
              <p className="text-white/80 text-sm">Cuidando tu bienestar</p>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Únase a nuestra
            <span className="block text-white/90"> comunidad médica</span>
          </h1>

          <p className="text-lg text-white/80 mb-12 max-w-md">
            Regístrese para acceder a todos los servicios de la clínica y gestionar sus citas médicas de forma sencilla.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Agende citas en línea</h3>
                <p className="text-sm text-white/70">
                  Reserve su cita en cualquier momento
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Historial médico seguro</h3>
                <p className="text-sm text-white/70">
                  Acceda a su información de forma protegida
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Atención personalizada</h3>
                <p className="text-sm text-white/70">
                  Especialistas dedicados a su salud
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        
        <div className="w-full max-w-md">
          
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">ClínicaSalud</h2>
              <p className="text-gray-500 text-sm">Cuidando tu bienestar</p>
            </div>
          </div>

          <RegistroForm />

        </div>
      </div>
    </div>
  );
}
