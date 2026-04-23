import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ShieldCheck, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

  const sendResetCode = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message ?? "No se pudo enviar el correo.");
      }

      setSent(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo enviar el correo.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetCode();
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code.trim()) {
      setError("Ingresa el codigo recibido por correo.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La nueva contrasena debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          codigo: code,
          nueva_contrasena: newPassword,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message ?? "No se pudo restablecer la contrasena.");
      }

      setResetDone(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudo restablecer la contrasena.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C3E50] via-[#3B82F6] to-[#60A6FA] pt-32 pb-24 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Recuperar contrasena</h1>

          <p className="text-white/90 text-lg">
            Te enviaremos un enlace para restablecer tu contrasena de forma
            segura.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Formulario */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-md">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {!sent ? (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-center">
                    Olvidaste tu contrasena?
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error ? (
                      <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                        {error}
                      </div>
                    ) : null}

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Correo electronico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="correo@clinicavictorio.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                      disabled={loading}
                    >
                      {loading ? "Enviando..." : "Enviar enlace de recuperacion"}
                    </Button>
                  </form>
                </>
              ) : resetDone ? (
                <div className="text-center">
                  <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Contrasena restablecida
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Ya puedes iniciar sesion con tu nueva contrasena.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Codigo enviado</h3>
                  <p className="text-muted-foreground mb-6">
                    Revisa tu correo e ingresa el codigo de verificacion para
                    restablecer tu contrasena.
                  </p>
                  <form onSubmit={handleReset} className="space-y-4 text-left">
                    {error ? (
                      <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                        {error}
                      </div>
                    ) : null}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Codigo de verificacion
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Ej. 123456"
                          className="pl-10"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nueva contrasena
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nueva contrasena"
                          className="pl-10 pr-10"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Confirmar contrasena
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirmar contrasena"
                          className="pl-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                      disabled={loading}
                    >
                      {loading ? "Actualizando..." : "Restablecer contrasena"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => void sendResetCode()}
                      disabled={loading}
                    >
                      Reenviar codigo
                    </Button>
                  </form>
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver a iniciar sesion
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
