import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white rounded-2xl shadow-xl p-10">

        {/* Icono */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-blue-600" />
        </div>

        {/* Título */}
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Página no encontrada
        </h2>

        {/* Descripción */}
        <p className="text-slate-600 mb-8">
          La página que estás buscando no existe o fue movida.
          No te preocupes, estamos aquí para ayudarte.
        </p>

        {/* Botón */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
