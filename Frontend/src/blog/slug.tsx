import { Link, useParams } from "react-router-dom"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react"
import NotFound from "@/error/NotFound"

const categories = [
  { id: "salud", label: "Salud General" },
  { id: "nutricion", label: "Nutrición" },
  { id: "prevencion", label: "Prevención" },
  { id: "tecnologia", label: "Tecnología Médica" },
  { id: "bienestar", label: "Bienestar" },
]

const articles = [
  {
    id: "1",
    slug: "importancia-chequeos-medicos-anuales",
    title: "La Importancia de los Chequeos Médicos Anuales",
    excerpt:
      "Descubre por qué realizar un chequeo médico anual puede salvar tu vida y detectar enfermedades a tiempo antes de que se conviertan en problemas graves.",
    content: `
      <p>Los chequeos médicos anuales son una de las herramientas más poderosas que tenemos para mantener nuestra salud en óptimas condiciones. A menudo, muchas enfermedades graves se desarrollan silenciosamente, sin síntomas aparentes, hasta que alcanzan etapas avanzadas donde el tratamiento se vuelve más complejo y costoso.</p>
      
      <h2>¿Por qué son importantes los chequeos anuales?</h2>
      
      <p>La detección temprana es clave para el tratamiento exitoso de muchas enfermedades. Durante un chequeo médico completo, los profesionales de la salud pueden identificar factores de riesgo y condiciones que podrían convertirse en problemas serios si no se abordan a tiempo.</p>
      
      <h3>Beneficios principales:</h3>
      
      <ul>
        <li><strong>Detección temprana de enfermedades:</strong> Condiciones como la diabetes, hipertensión, y ciertos tipos de cáncer pueden detectarse antes de que presenten síntomas.</li>
        <li><strong>Actualización del historial médico:</strong> Permite a tu médico tener un registro actualizado de tu salud.</li>
        <li><strong>Evaluación de factores de riesgo:</strong> Identificar hábitos o condiciones que podrían afectar tu salud a largo plazo.</li>
        <li><strong>Establecer una relación con tu médico:</strong> Las visitas regulares crean confianza y facilitan la comunicación sobre temas de salud.</li>
      </ul>
      
      <h2>¿Qué incluye un chequeo médico completo?</h2>
      
      <p>Un examen médico anual típicamente incluye:</p>
      
      <ul>
        <li>Medición de presión arterial y frecuencia cardíaca</li>
        <li>Análisis de sangre completo</li>
        <li>Evaluación del índice de masa corporal (IMC)</li>
        <li>Revisión de antecedentes familiares</li>
        <li>Exámenes específicos según edad y género</li>
        <li>Actualización de vacunas si es necesario</li>
      </ul>
      
      <h2>¿Con qué frecuencia debería hacerme un chequeo?</h2>
      
      <p>La frecuencia recomendada varía según la edad y los factores de riesgo individuales:</p>
      
      <ul>
        <li><strong>Adultos jóvenes (18-39 años):</strong> Cada 2-3 años si están sanos</li>
        <li><strong>Adultos de mediana edad (40-64 años):</strong> Anualmente</li>
        <li><strong>Adultos mayores (65+ años):</strong> Anualmente o según recomendación médica</li>
      </ul>
      
      <p>Recuerda que estas son pautas generales. Si tienes condiciones crónicas, antecedentes familiares de enfermedades específicas, o factores de riesgo particulares, tu médico puede recomendar chequeos más frecuentes.</p>
      
      <h2>Conclusión</h2>
      
      <p>Invertir tiempo en un chequeo médico anual es invertir en tu futuro. La prevención siempre será más económica y menos invasiva que el tratamiento de una enfermedad avanzada. No esperes a sentirte mal para visitar al médico; agenda tu próximo chequeo hoy.</p>
    `,
    image: "/blog/checkup.jpg",
    category: "prevencion",
    author: "Dra. María González",
    authorRole: "Cardióloga",
    authorImage: "/doctors/doctor-1.jpg",
    date: "2026-01-20",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "2",
    slug: "alimentacion-saludable-corazon",
    title: "10 Alimentos que Cuidan tu Corazón",
    excerpt:
      "Una guía completa sobre los mejores alimentos para mantener tu corazón sano y prevenir enfermedades cardiovasculares.",
    content: `
      <p>La alimentación juega un papel fundamental en la salud cardiovascular. Lo que comemos cada día puede fortalecer nuestro corazón o, por el contrario, aumentar el riesgo de desarrollar enfermedades cardíacas. Aquí te presentamos los 10 alimentos que deberías incluir en tu dieta para mantener un corazón sano.</p>
      
      <h2>1. Salmón y pescados grasos</h2>
      
      <p>Los pescados grasos como el salmón, la caballa, las sardinas y el atún son ricos en ácidos grasos omega-3. Estos nutrientes ayudan a reducir la inflamación, disminuir los triglicéridos y bajar la presión arterial.</p>
      
      <h2>2. Avena</h2>
      
      <p>La avena es una excelente fuente de fibra soluble, que ayuda a reducir el colesterol LDL (el "malo"). Un tazón de avena en el desayuno puede ser el comienzo perfecto para un día saludable para el corazón.</p>
      
      <h2>3. Frutas del bosque</h2>
      
      <p>Los arándanos, fresas, frambuesas y moras están cargados de antioxidantes que protegen el corazón. Además, son bajos en calorías y ricos en fibra.</p>
      
      <h2>4. Aguacate</h2>
      
      <p>El aguacate es rico en grasas monoinsaturadas saludables que pueden ayudar a reducir los niveles de colesterol malo y aumentar el colesterol bueno.</p>
      
      <h2>5. Frutos secos</h2>
      
      <p>Las nueces, almendras y otros frutos secos contienen fibra, proteínas y grasas saludables. Un puñado al día puede reducir significativamente el riesgo de enfermedades cardíacas.</p>
      
      <h2>6. Aceite de oliva extra virgen</h2>
      
      <p>Base de la dieta mediterránea, el aceite de oliva está lleno de antioxidantes y grasas monoinsaturadas que protegen el corazón.</p>
      
      <h2>7. Verduras de hoja verde</h2>
      
      <p>Espinacas, kale, acelgas y otras verduras de hoja verde son ricas en vitaminas, minerales y antioxidantes. Son especialmente altas en vitamina K, que ayuda a proteger las arterias.</p>
      
      <h2>8. Tomates</h2>
      
      <p>Los tomates son ricos en licopeno, un antioxidante que ayuda a reducir el colesterol malo y mantener los vasos sanguíneos abiertos.</p>
      
      <h2>9. Legumbres</h2>
      
      <p>Lentejas, garbanzos, frijoles y otras legumbres son excelentes fuentes de proteína vegetal, fibra y minerales que benefician la salud cardiovascular.</p>
      
      <h2>10. Chocolate negro</h2>
      
      <p>Con moderación, el chocolate negro (70% cacao o más) puede ayudar a reducir la presión arterial y mejorar el flujo sanguíneo gracias a sus flavonoides.</p>
      
      <h2>Conclusión</h2>
      
      <p>Incorporar estos alimentos en tu dieta diaria es un paso importante hacia un corazón más sano. Recuerda que una alimentación equilibrada, combinada con ejercicio regular y un estilo de vida saludable, es la mejor receta para la salud cardiovascular.</p>
    `,
    image: "/blog/heart-food.jpg",
    category: "nutricion",
    author: "Dr. Carlos Ruiz",
    authorRole: "Nutricionista",
    authorImage: "/doctors/doctor-2.jpg",
    date: "2026-01-18",
    readTime: "7 min",
    featured: true,
  },
  {
    id: "3",
    slug: "avances-telemedicina-2026",
    title: "Avances en Telemedicina: El Futuro de las Consultas Médicas",
    excerpt:
      "Exploramos las últimas innovaciones en telemedicina y cómo están transformando la manera en que recibimos atención médica.",
    content: `
      <p>La telemedicina ha experimentado un crecimiento exponencial en los últimos años, transformando radicalmente la forma en que pacientes y médicos interactúan. Lo que antes era una alternativa poco común, hoy se ha convertido en una parte integral del sistema de salud moderno.</p>
      
      <h2>La evolución de la telemedicina</h2>
      
      <p>Desde sus inicios con simples llamadas telefónicas hasta las actuales plataformas de videoconsulta con inteligencia artificial integrada, la telemedicina ha recorrido un largo camino. Hoy, los pacientes pueden recibir diagnósticos, recetas y seguimiento médico sin salir de casa.</p>
      
      <h2>Principales avances tecnológicos</h2>
      
      <h3>Inteligencia Artificial en diagnósticos</h3>
      
      <p>Los sistemas de IA pueden ahora analizar síntomas, imágenes médicas y datos de pacientes para asistir a los médicos en diagnósticos más precisos y rápidos.</p>
      
      <h3>Dispositivos de monitoreo remoto</h3>
      
      <p>Relojes inteligentes, monitores de presión arterial conectados y otros dispositivos permiten el seguimiento continuo de la salud del paciente desde cualquier lugar.</p>
      
      <h3>Realidad virtual en rehabilitación</h3>
      
      <p>La RV está revolucionando la fisioterapia y la rehabilitación, permitiendo ejercicios guiados y monitoreados de forma remota.</p>
      
      <h2>Beneficios para pacientes y médicos</h2>
      
      <ul>
        <li>Mayor acceso a especialistas sin importar la ubicación geográfica</li>
        <li>Reducción de tiempos de espera</li>
        <li>Menor riesgo de contagio de enfermedades infecciosas</li>
        <li>Ahorro en costos de transporte y tiempo</li>
        <li>Mejor gestión de enfermedades crónicas</li>
      </ul>
      
      <h2>El futuro de la telemedicina</h2>
      
      <p>Mirando hacia adelante, podemos esperar ver aún más integración de tecnologías emergentes como la realidad aumentada, diagnósticos basados en IA más sofisticados, y una mayor personalización en el cuidado de la salud.</p>
      
      <p>La telemedicina no reemplazará completamente las consultas presenciales, pero sin duda se convertirá en un complemento esencial de la atención médica tradicional.</p>
    `,
    image: "/blog/telemedicine.jpg",
    category: "tecnologia",
    author: "Dr. Luis Fernández",
    authorRole: "Director Médico",
    authorImage: "/doctors/doctor-3.jpg",
    date: "2026-01-15",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "4",
    slug: "manejo-estres-vida-moderna",
    title: "Cómo Manejar el Estrés en la Vida Moderna",
    excerpt:
      "Técnicas efectivas respaldadas por la ciencia para reducir el estrés y mejorar tu calidad de vida diaria.",
    content: `
      <p>El estrés se ha convertido en una constante en la vida moderna. Entre las demandas laborales, las responsabilidades familiares y el ritmo acelerado de la sociedad actual, es fácil sentirse abrumado. Sin embargo, existen estrategias probadas científicamente que pueden ayudarte a manejar el estrés de manera efectiva.</p>
      
      <h2>Entendiendo el estrés</h2>
      
      <p>El estrés no siempre es negativo. En pequeñas dosis, puede motivarnos y ayudarnos a alcanzar nuestras metas. El problema surge cuando el estrés se vuelve crónico, afectando nuestra salud física y mental.</p>
      
      <h2>Técnicas efectivas para manejar el estrés</h2>
      
      <h3>1. Meditación y mindfulness</h3>
      
      <p>La práctica regular de la meditación puede reducir significativamente los niveles de cortisol, la hormona del estrés. Incluso 10 minutos diarios pueden marcar una diferencia notable.</p>
      
      <h3>2. Ejercicio físico regular</h3>
      
      <p>El ejercicio libera endorfinas, los neurotransmisores del bienestar. Una caminata de 30 minutos puede mejorar tu estado de ánimo y reducir la ansiedad.</p>
      
      <h3>3. Técnicas de respiración</h3>
      
      <p>La respiración profunda y controlada activa el sistema nervioso parasimpático, ayudando al cuerpo a relajarse. Practica la respiración 4-7-8: inhala por 4 segundos, mantén por 7 y exhala por 8.</p>
      
      <h3>4. Establecer límites saludables</h3>
      
      <p>Aprender a decir "no" y establecer límites claros entre el trabajo y la vida personal es esencial para prevenir el agotamiento.</p>
      
      <h3>5. Mantener conexiones sociales</h3>
      
      <p>Las relaciones significativas son un factor protector contra el estrés. Dedica tiempo a cultivar amistades y conexiones familiares.</p>
      
      <h2>Cuándo buscar ayuda profesional</h2>
      
      <p>Si el estrés está afectando significativamente tu vida diaria, tus relaciones o tu salud física, es importante buscar ayuda de un profesional de salud mental. No hay vergüenza en pedir apoyo.</p>
      
      <h2>Conclusión</h2>
      
      <p>El manejo del estrés es una habilidad que se puede aprender y mejorar con la práctica. Incorpora estas técnicas gradualmente en tu rutina y observa cómo mejora tu bienestar general.</p>
    `,
    image: "/blog/stress.jpg",
    category: "bienestar",
    author: "Dra. Ana Martínez",
    authorRole: "Psicóloga Clínica",
    authorImage: "/doctors/doctor-4.jpg",
    date: "2026-01-12",
    readTime: "8 min",
    featured: false,
  },
  {
    id: "5",
    slug: "vacunacion-adultos-guia-completa",
    title: "Guía Completa de Vacunación para Adultos",
    excerpt:
      "Todo lo que necesitas saber sobre las vacunas recomendadas para adultos y cuándo debes aplicártelas.",
    content: `
      <p>Las vacunas no son solo para niños. Los adultos también necesitan mantenerse al día con sus inmunizaciones para protegerse contra enfermedades prevenibles. Esta guía te ayudará a entender qué vacunas necesitas según tu edad y condiciones de salud.</p>
      
      <h2>Vacunas recomendadas para todos los adultos</h2>
      
      <h3>Influenza (gripe)</h3>
      <p>Recomendada anualmente para todos los adultos. Es especialmente importante para personas mayores de 65 años y aquellos con condiciones crónicas.</p>
      
      <h3>Tétanos, difteria y tos ferina (Tdap/Td)</h3>
      <p>Una dosis de Tdap seguida de refuerzos de Td cada 10 años.</p>
      
      <h3>COVID-19</h3>
      <p>Vacunación primaria y refuerzos según las recomendaciones vigentes.</p>
      
      <h2>Vacunas según la edad</h2>
      
      <h3>Adultos de 50 años o más</h3>
      <ul>
        <li>Herpes zóster (culebrilla): Dos dosis recomendadas a partir de los 50 años</li>
      </ul>
      
      <h3>Adultos de 65 años o más</h3>
      <ul>
        <li>Neumocócica: Protege contra la neumonía y otras infecciones</li>
        <li>Dosis alta de influenza: Mayor protección para sistema inmune debilitado</li>
      </ul>
      
      <h2>Vacunas para situaciones especiales</h2>
      
      <p>Ciertas condiciones de salud, ocupaciones o viajes pueden requerir vacunas adicionales. Consulta con tu médico si:</p>
      
      <ul>
        <li>Trabajas en el sector salud</li>
        <li>Tienes enfermedades crónicas</li>
        <li>Planeas viajar a ciertas regiones del mundo</li>
        <li>Estás embarazada o planeas estarlo</li>
      </ul>
      
      <h2>Mitos y realidades sobre las vacunas</h2>
      
      <p>Es importante basar nuestras decisiones de salud en evidencia científica, no en mitos. Las vacunas son seguras, efectivas y han salvado millones de vidas en todo el mundo.</p>
      
      <h2>Conclusión</h2>
      
      <p>Mantener tu calendario de vacunación actualizado es una de las formas más efectivas de proteger tu salud y la de quienes te rodean. Habla con tu médico sobre qué vacunas necesitas.</p>
    `,
    image: "/blog/vaccines.jpg",
    category: "prevencion",
    author: "Dr. Roberto Sánchez",
    authorRole: "Médico Internista",
    authorImage: "/doctors/doctor-2.jpg",
    date: "2026-01-10",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "6",
    slug: "ejercicio-tercera-edad",
    title: "Ejercicio Físico en la Tercera Edad: Beneficios y Recomendaciones",
    excerpt:
      "Descubre cómo el ejercicio regular puede mejorar significativamente la calidad de vida en personas mayores.",
    content: `
      <p>El ejercicio físico es fundamental en todas las etapas de la vida, pero cobra especial importancia en la tercera edad. Mantenerse activo puede marcar la diferencia entre una vejez saludable e independiente y una marcada por limitaciones físicas.</p>
      
      <h2>Beneficios del ejercicio en adultos mayores</h2>
      
      <ul>
        <li><strong>Fortalecimiento óseo:</strong> Ayuda a prevenir la osteoporosis</li>
        <li><strong>Mejora del equilibrio:</strong> Reduce el riesgo de caídas</li>
        <li><strong>Salud cardiovascular:</strong> Fortalece el corazón y mejora la circulación</li>
        <li><strong>Bienestar mental:</strong> Reduce síntomas de depresión y ansiedad</li>
        <li><strong>Independencia:</strong> Mantiene la capacidad de realizar actividades diarias</li>
      </ul>
      
      <h2>Tipos de ejercicio recomendados</h2>
      
      <h3>Ejercicios aeróbicos</h3>
      <p>Caminar, nadar, bailar o andar en bicicleta estática. Se recomiendan al menos 150 minutos semanales de actividad moderada.</p>
      
      <h3>Ejercicios de fuerza</h3>
      <p>Usar bandas elásticas, pesas ligeras o el propio peso corporal. Dos sesiones semanales son ideales.</p>
      
      <h3>Ejercicios de equilibrio</h3>
      <p>Tai chi, yoga suave o ejercicios específicos de equilibrio ayudan a prevenir caídas.</p>
      
      <h3>Ejercicios de flexibilidad</h3>
      <p>Estiramientos suaves mejoran la movilidad articular y reducen la rigidez.</p>
      
      <h2>Precauciones importantes</h2>
      
      <ul>
        <li>Consultar con el médico antes de iniciar un programa de ejercicios</li>
        <li>Comenzar gradualmente y aumentar la intensidad poco a poco</li>
        <li>Calentar antes de ejercitarse y enfriar después</li>
        <li>Mantenerse hidratado</li>
        <li>Usar calzado adecuado</li>
      </ul>
      
      <h2>Conclusión</h2>
      
      <p>Nunca es tarde para comenzar a ejercitarse. Los beneficios del ejercicio se pueden experimentar a cualquier edad. Lo importante es encontrar actividades que disfrutes y mantener la constancia.</p>
    `,
    image: "/blog/elderly-exercise.jpg",
    category: "salud",
    author: "Dra. Patricia López",
    authorRole: "Geriatra",
    authorImage: "/doctors/doctor-1.jpg",
    date: "2026-01-08",
    readTime: "5 min",
    featured: false,
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function getCategoryLabel(categoryId: string) {
  const category = categories.find((c) => c.id === categoryId)
  return category?.label || categoryId
}

// export async function generateStaticParams() {
//   return articles.map((article) => ({
//     slug: article.slug,
//   }))
// }

export default function SlugPage() {

  const { slug } = useParams<{ slug: string }>()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return <NotFound />
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      <main className="pt-20">
        {/* Article Header */}
        <section className="bg-[#2C3E50] py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
            <Badge className="mb-4 bg-primary/20 text-primary border-none">
              {getCategoryLabel(article.category)}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              {article.title}
            </h1>
            <p className="text-lg text-white/80 mb-8 text-pretty">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <img
                        src={article.authorImage || "/placeholder.svg"}
                        alt={article.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div>
                  <p className="font-medium text-white">{article.author}</p>
                  <p className="text-white/60 text-sm">{article.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} de lectura
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl bg-muted">
            <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Social Share Sidebar */}
              <aside className="lg:w-16 shrink-0">
                <div className="lg:sticky lg:top-28 flex lg:flex-col gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </aside>

              {/* Content */}
              <div className="flex-1">
                <div
                  className="prose prose-lg max-w-none 
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:text-muted-foreground prose-ul:my-6
                    prose-li:my-2
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Author Box */}
                <div className="mt-12 p-6 bg-card rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted overflow-hidden shrink-0">
                        <img
                            src={article.authorImage || "/placeholder.svg"}
                            alt={article.author}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Escrito por
                      </p>
                      <h3 className="font-semibold text-foreground">
                        {article.author}
                      </h3>
                      <p className="text-primary text-sm mb-2">
                        {article.authorRole}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Especialista en MediCare Plus con amplia experiencia en
                        el cuidado de pacientes y divulgación médica.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 lg:py-16 bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Artículos Relacionados
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow border-border">
                      <div className="aspect-video relative bg-muted">
                        <img
                            src={related.image || "/placeholder.svg"}
                            alt={related.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                      </div>
                      <CardContent className="p-5">
                        <Badge
                          variant="secondary"
                          className="mb-3 bg-primary/10 text-primary border-none"
                        >
                          {getCategoryLabel(related.category)}
                        </Badge>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {related.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {related.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <Link to="/blog">
                    Ver todos los artículos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 text-balance">
              ¿Necesitas una consulta con un especialista?
            </h2>
            <p className="text-white/80 mb-8 text-pretty">
              Nuestro equipo médico está listo para atenderte y resolver todas
              tus dudas.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/agendar-cita">
                Agendar una Cita
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
