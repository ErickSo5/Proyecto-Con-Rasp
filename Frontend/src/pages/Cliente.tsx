export default function ClientHome() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a Clínica Victorio
        </h1>
        <p className="max-w-xl mx-auto text-lg">
          Agenda tus citas médicas, consulta especialistas y gestiona tu información
          de forma sencilla y segura.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="font-semibold text-xl mb-2">Agendar Cita</h3>
          <p className="text-gray-600">
            Programa tu consulta médica en pocos pasos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="font-semibold text-xl mb-2">Mis Citas</h3>
          <p className="text-gray-600">
            Consulta el historial y próximas citas.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="font-semibold text-xl mb-2">Perfil</h3>
          <p className="text-gray-600">
            Actualiza tus datos personales y de contacto.
          </p>
        </div>
      </section>
    </main>
  )
}
