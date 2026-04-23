const services = [
  "Consulta General",
  "Especialidades Médicas",
  "Atención Preventiva",
  "Seguimiento Clínico",
]

export default function Services() {
  return (
    <section id="servicios" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
          Nuestros Servicios
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <p className="font-semibold text-blue-600">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
