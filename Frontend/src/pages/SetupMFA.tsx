import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SetupMFA() {
  const [qr, setQr] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 1. Recuperamos los datos del estado de navegación (Enviados desde LoginForm)
  const { userId, setupToken } = location.state || {};
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

  // Efecto para cargar el QR al montar el componente
  useEffect(() => {
    const loadQR = async (id: number, token: string) => {
      try {
        const res = await fetch(`${apiUrl}/api/mfa/setup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Token temporal de setup
          },
          body: JSON.stringify({ userId: id }),
        });

        const data = await res.json();

        if (res.ok && data.qr) {
          setQr(data.qr);
        } else {
          console.error("Error del servidor:", data.message);
          setMessage("No se pudo cargar el QR: " + (data.message || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error en fetchQR:", error);
        setMessage("Error de conexión al obtener el QR");
      }
    };

    if (userId && setupToken) {
      loadQR(userId, setupToken);
    } else {
      console.warn("Faltan credenciales de configuración (userId o token).");
    }
  }, [userId, setupToken, apiUrl]);

  // Función para verificar el código de 6 dígitos
  const verifyCode = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/mfa/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${setupToken}`,
        },
        body: JSON.stringify({
          userId: userId,
          token: code,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("MFA activado correctamente");

        // Verificamos qué trae el backend para no guardar undefined
        if (data.user) {
          const userToSave = {
            // Mapeamos: Lo que el back envía -> Lo que el front espera
            id: data.user.id || data.user.id_user,
            name: data.user.nombre || data.user.name,
            email: data.user.correo || data.user.email,
            role: data.user.rol || data.user.role,
            roleLabel: data.user.roleLabel || (data.user.rol === 'medico' ? 'Médico' : 'Personal'),
            mfa_habilitado: true
          };

          localStorage.setItem("medicarePlusUser", JSON.stringify(userToSave));
          
          // Si el backend envía el token final aquí, lo guardamos
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
        }

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error en verifyCode:", error);
      setMessage("Error al verificar el código");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        Activar autenticación en dos pasos
      </h2>

      <p className="text-gray-500 text-center mb-6 text-sm">
        Escanea el código con Google Authenticator
      </p>

      <div className="flex justify-center mb-6">
        {qr ? (
          <img src={qr} alt="Código QR MFA" className="border p-4 rounded-lg bg-white shadow-sm" />
        ) : (
          <div className="animate-pulse bg-gray-100 h-48 w-48 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 text-xs">
            Generando código QR...
          </div>
        )}
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          className="w-full border-2 border-gray-200 rounded-lg p-3 text-center text-3xl tracking-[0.5em] font-mono focus:border-blue-500 focus:outline-none transition-all"
        />

        <button
          onClick={verifyCode}
          disabled={code.length !== 6}
          className={`w-full p-3 rounded-lg text-white font-bold transition-all shadow-md ${
            code.length === 6 
              ? "bg-blue-600 hover:bg-blue-700 active:scale-95" 
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Verificar y Continuar
        </button>
      </div>

      {message && (
        <p className={`text-center mt-6 text-sm font-semibold p-2 rounded ${
          message.includes("correctamente") 
            ? "bg-green-50 text-green-600" 
            : "bg-red-50 text-red-500"
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}