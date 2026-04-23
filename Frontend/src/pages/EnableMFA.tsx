import { useEffect, useState } from "react"

export default function EnableMFA() {

  const [qr, setQr] = useState("")
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const apiUrl = import.meta.env.VITE_API_URL

  // Generación del QR al montar el componente
  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/mfa/setup`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })

        if (!res.ok) throw new Error("No se pudo generar el QR")

        const data = await res.json()
        setQr(data.qr)
      } catch (err) {
        console.error(err)
        setMessage("Error generando el código QR")
      } finally {
        setLoading(false)
      }
    }

    fetchQR()
  }, [apiUrl])

  const verify = async () => {
    setMessage("")

    if (!token.match(/^\d{6}$/)) {
      setMessage("Ingrese un código válido de 6 dígitos")
      return
    }

    try {
      const user = JSON.parse(localStorage.getItem("medicarePlusUser")!)

      const res = await fetch(`${apiUrl}/api/mfa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id_user, token })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data?.message || "Código incorrecto")
        return
      }

      setMessage("MFA activado correctamente")
    } catch (err) {
      console.error(err)
      setMessage("Error verificando el código")
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-bold">Activar autenticación en dos pasos</h2>
      <p>Escanee el código con Google Authenticator</p>

      {loading ? (
        <p>Cargando código QR...</p>
      ) : qr ? (
        <img src={qr} width={200} alt="QR MFA" />
      ) : (
        <p>No se pudo generar el código QR</p>
      )}

      <input
        type="text"
        placeholder="Código de 6 dígitos"
        value={token}
        maxLength={6}
        onChange={(e)=>setToken(e.target.value.replace(/\D/g, ""))}
        className="border p-2 rounded text-center w-36"
      />

      <button
        onClick={verify}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Activar MFA
      </button>

      {message && <p className="text-red-600">{message}</p>}
    </div>
  )
}