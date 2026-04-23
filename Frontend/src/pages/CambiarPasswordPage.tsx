import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CambiarPasswordPage() {

  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [cambiosRealizados, setCambiosRealizados] = useState(0);
  const [ultimoCambio, setUltimoCambio] = useState("");

  const fetchHistorial = async () => {
    try {

        const token = localStorage.getItem("auth_token");

        const res = await fetch(
        "http://localhost:3000/api/auth/password/history",
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );

        const data = await res.json();

        setCambiosRealizados(data.cambios);

        if (data.ultimoCambio) {
        const fecha = new Date(data.ultimoCambio);
        setUltimoCambio(fecha.toLocaleDateString());
        }

    } catch (error) {
        console.error("Error obteniendo historial");
    }
    };

    useEffect(() => {
        fetchHistorial();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordNueva !== confirmarPassword) {
        setMensaje("Las contraseñas no coinciden");
        return;
    }

    try {

        const token = localStorage.getItem("auth_token");

        const res = await fetch(
        "http://localhost:3000/api/auth/change-password",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            passwordActual,
            passwordNueva
            })
        }
        );

        const data = await res.json();

        if (!res.ok) {
        setMensaje(data.message);
        return;
        }

        setMensaje("Contraseña actualizada correctamente");

        setPasswordActual("");
        setPasswordNueva("");
        setConfirmarPassword("");

        // actualizar historial
        fetchHistorial();

    } catch (error) {
        console.error(error);
        setMensaje("Error al cambiar contraseña");
    }
    };

  return (
    <>
      <Header />

      <section className="relative overflow-hidden min-h-screen bg-linear-to-br from-blue-800 via-blue-600 to-blue-400 text-white">

        {/* BLOBS */}
        <div className="absolute -top-52 -right-52 w-136 h-136 bg-white/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-52 w-lg h-128 bg-blue-300/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/3 w-[24rem] h-96 bg-sky-300/30 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-6 py-32">

          {/* TITULO */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Cambiar contraseña
            </h1>

            <p className="text-blue-100">
              Mantén segura tu cuenta actualizando tu contraseña periódicamente
            </p>
          </div>

          {/* TARJETA */}
          <div className="max-w-xl mx-auto bg-white/95 backdrop-blur text-slate-800 rounded-3xl shadow-2xl p-12">

            <div className="mb-10 text-sm text-slate-600 space-y-1">
              <p>
                Cambios realizados:
                <span className="font-semibold text-blue-600 ml-1">
                  {cambiosRealizados}
                </span>
              </p>

              <p>
                Último cambio:
                <span className="font-semibold ml-1">
                  {ultimoCambio}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Contraseña actual
                </label>

                <input
                  type="password"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nueva contraseña
                </label>

                <input
                  type="password"
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Confirmar nueva contraseña
                </label>

                <input
                  type="password"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {mensaje && (
                <p className="text-sm text-red-600 font-medium">
                  {mensaje}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
              >
                Actualizar contraseña
              </button>

            </form>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}