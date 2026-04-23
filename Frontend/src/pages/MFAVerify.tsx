import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom" // Añade useLocation
import MFAInput from "../components/MFAInput"

export default function MFAVerify() {
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation() // 💡 Para leer el state

  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

  const handleVerify = async () => {
    // 💡 Intentamos del state, si no, del localStorage
    const userId = location.state?.userId || localStorage.getItem("mfaUserId")

    if (!userId) {
      setError("Sesión expirada. Por favor, vuelve a loguearte.")
      return
    }

    try {
      const res = await fetch(`${apiUrl}/api/mfa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          token: token
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || "Código incorrecto")
        return
      }

      // ✅ GUARDADO FINAL DE SESIÓN
      localStorage.setItem("accessToken", data.accessToken)
      
      if (data.user) {
        // Guardamos el objeto completo para el Dashboard
        localStorage.setItem("medicarePlusUser", JSON.stringify(data.user))
      }

      // Limpiamos el ID temporal
      localStorage.removeItem("mfaUserId")

      navigate("/dashboard")
    } catch (err) {
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-2 text-center">Verificación en dos pasos</h2>
      <p className="text-gray-500 text-center mb-6">Introduce el código de tu app de autenticación</p>

      <MFAInput value={token} onChange={setToken} />

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={token.length < 6}
        className={`w-full mt-6 p-3 rounded-lg text-white font-bold transition ${
          token.length === 6 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Verificar
      </button>
    </div>
  )
}