import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { Eye, EyeOff, Mail, Lock, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Función para obtener etiqueta del rol
const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    medico: "Médico",
    enfermero: "Enfermero/a",
    admin: "Administrador",
    direccion: "Dirección",
    cliente: "Cliente"
  }
  return labels[role] || role
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsLoading(true)
  setError(null)

  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data?.message ?? "No se pudo iniciar sesión.")
    }

    // 💡 PASO 1: Limpieza total para evitar choques de roles (Cliente vs Médico)
    localStorage.clear();

    // 💡 PASO 2: Guardar datos del usuario que vienen del Back de inmediato
    // Esto asegura que el rol sea el correcto desde el segundo uno.
    if (data.user) {
      const userData = {
        id: data.user.id || data.user.id_user,
        name: data.user.nombre || data.user.name || email.split('@')[0],
        email: data.user.correo || data.user.email || email,
        role: (data.user.rol ?? data.user.role ?? "cliente").toLowerCase().trim(),
        roleLabel: getRoleLabel((data.user.rol ?? data.user.role ?? "cliente").toLowerCase().trim())
      }
      localStorage.setItem("medicarePlusUser", JSON.stringify(userData))
    }

    // 💡 PASO 3: Gestión de flujos (MFA vs Directo)
    
    // Caso A: Requiere configurar QR por primera vez
    if (data.mfaSetupRequired) {
      navigate("/setup-mfa", {
        state: { userId: data.userId, setupToken: data.setupToken }
      });
      return; // 🛑 Detener ejecución aquí
    }

    // Caso B: Ya tiene MFA, pedir solo el código de 6 dígitos
    if (data.mfaRequired) {
    // Guardamos el ID para que la siguiente pantalla lo lea
    localStorage.setItem("mfaUserId", data.userId.toString());

      // Si tienes una vista específica para verificar:
      navigate("/mfa", { 
        state: { userId: data.userId } 
      });
      // Si usas SetupMFA para ambos, asegúrate de que SetupMFA sepa manejarlo:
      // navigate("/setup-mfa", { state: { userId: data.userId, isOnlyVerify: true } });
      return; // 🛑 Detener ejecución aquí
    }

    // Caso C: Login directo (Sin MFA)
    if (data.accessToken) {
      localStorage.setItem("auth_token", data.accessToken)
      if (data.refreshToken) localStorage.setItem("refresh_token", data.refreshToken)
      
      // Usar navigate es suficiente, assign recarga toda la página y es más lento
      navigate("/dashboard", { replace: true });
    }

  } catch (err) {
    const message = err instanceof Error ? err.message : "No se pudo iniciar sesión."
    setError(message)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="w-full max-w-md shadow-xl rounded-xl bg-white p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido
          </h2>
          <p className="text-gray-500 text-sm">
            Ingrese sus credenciales para acceder al sistema
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? (
          <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}
        {/* Email / Username */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Usuario o correo electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="usuario@clinica.com o nombreusuario"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full pl-10 h-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full pl-10 pr-10 h-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-gray-600">Recordarme</span>
          </label>

          <a onClick={() => navigate("/forget-password")} className="text-blue-600 hover:underline">
            ¿Olvidó su contraseña?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {isLoading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>

      {/* Footer */}
      <div className="pt-4 border-t text-center text-sm space-y-2">
        <p className="text-gray-500">
          ¿No tiene una cuenta?
        </p>
        <button
          type="button"
          className="w-full h-12 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          onClick={() => (window.location.href = "/registro")}
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  )
}
