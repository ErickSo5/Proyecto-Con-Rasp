import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const categories = [
  { id: "all", label: "Todos", count: 12 },
  { id: "salud", label: "Salud General", count: 4 },
  { id: "nutricion", label: "Nutrición", count: 3 },
  { id: "prevencion", label: "Prevención", count: 2 },
  { id: "tecnologia", label: "Tecnología Médica", count: 2 },
  { id: "bienestar", label: "Bienestar", count: 1 },
]

const articles = [
  {
    id: "1",
    slug: "importancia-chequeos-medicos-anuales",
    title: "La Importancia de los Chequeos Médicos Anuales",
    excerpt: "Descubre por qué realizar un chequeo médico anual puede salvar tu vida y detectar enfermedades a tiempo antes de que se conviertan en problemas graves.",
    content: "",
    image: "/blog/checkup.jpg",
    category: "prevencion",
    author: "Dra. María González",
    authorRole: "Cardióloga",
    date: "2026-01-20",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "2",
    slug: "alimentacion-saludable-corazon",
    title: "10 Alimentos que Cuidan tu Corazón",
    excerpt: "Una guía completa sobre los mejores alimentos para mantener tu corazón sano y prevenir enfermedades cardiovasculares.",
    content: "",
    image: "/blog/heart-food.jpg",
    category: "nutricion",
    author: "Dr. Carlos Ruiz",
    authorRole: "Nutricionista",
    date: "2026-01-18",
    readTime: "7 min",
    featured: true,
  },
  {
    id: "3",
    slug: "avances-telemedicina-2026",
    title: "Avances en Telemedicina: El Futuro de las Consultas Médicas",
    excerpt: "Exploramos las últimas innovaciones en telemedicina y cómo están transformando la manera en que recibimos atención médica.",
    content: "",
    image: "/blog/telemedicine.jpg",
    category: "tecnologia",
    author: "Dr. Luis Fernández",
    authorRole: "Director Médico",
    date: "2026-01-15",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "4",
    slug: "manejo-estres-vida-moderna",
    title: "Cómo Manejar el Estrés en la Vida Moderna",
    excerpt: "Técnicas efectivas respaldadas por la ciencia para reducir el estrés y mejorar tu calidad de vida diaria.",
    content: "",
    image: "/blog/stress.jpg",
    category: "bienestar",
    author: "Dra. Ana Martínez",
    authorRole: "Psicóloga Clínica",
    date: "2026-01-12",
    readTime: "8 min",
    featured: false,
  },
  {
    id: "5",
    slug: "vacunacion-adultos-guia-completa",
    title: "Guía Completa de Vacunación para Adultos",
    excerpt: "Todo lo que necesitas saber sobre las vacunas recomendadas para adultos y cuándo debes aplicártelas.",
    content: "",
    image: "/blog/vaccines.jpg",
    category: "prevencion",
    author: "Dr. Roberto Sánchez",
    authorRole: "Médico Internista",
    date: "2026-01-10",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "6",
    slug: "ejercicio-tercera-edad",
    title: "Ejercicio Físico en la Tercera Edad: Beneficios y Recomendaciones",
    excerpt: "Descubre cómo el ejercicio regular puede mejorar significativamente la calidad de vida en personas mayores.",
    content: "",
    image: "/blog/elderly-exercise.jpg",
    category: "salud",
    author: "Dra. Patricia López",
    authorRole: "Geriatra",
    date: "2026-01-08",
    readTime: "5 min",
    featured: false,
  },
  {
    id: "7",
    slug: "diabetes-prevencion-control",
    title: "Diabetes: Prevención y Control Efectivo",
    excerpt: "Información esencial sobre cómo prevenir la diabetes tipo 2 y mantenerla bajo control si ya la padeces.",
    content: "",
    image: "/blog/diabetes.jpg",
    category: "salud",
    author: "Dr. Carlos Ruiz",
    authorRole: "Endocrinólogo",
    date: "2026-01-05",
    readTime: "7 min",
    featured: false,
  },
  {
    id: "8",
    slug: "sueno-reparador-consejos",
    title: "7 Consejos para un Sueño Reparador",
    excerpt: "Mejora la calidad de tu descanso con estos consejos avalados por especialistas en medicina del sueño.",
    content: "",
    image: "/blog/sleep.jpg",
    category: "salud",
    author: "Dra. María González",
    authorRole: "Neuróloga",
    date: "2026-01-03",
    readTime: "4 min",
    featured: false,
  },
  {
    id: "9",
    slug: "inteligencia-artificial-diagnostico",
    title: "Inteligencia Artificial en el Diagnóstico Médico",
    excerpt: "Cómo la IA está revolucionando la precisión y velocidad de los diagnósticos médicos en todo el mundo.",
    content: "",
    image: "/blog/ai-medicine.jpg",
    category: "tecnologia",
    author: "Dr. Luis Fernández",
    authorRole: "Director Médico",
    date: "2025-12-28",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "10",
    slug: "superfoods-mitos-realidades",
    title: "Superfoods: Mitos y Realidades",
    excerpt: "Analizamos científicamente los llamados superalimentos y separamos los hechos de la ficción.",
    content: "",
    image: "/blog/superfoods.jpg",
    category: "nutricion",
    author: "Dr. Carlos Ruiz",
    authorRole: "Nutricionista",
    date: "2025-12-25",
    readTime: "5 min",
    featured: false,
  },
  {
    id: "11",
    slug: "salud-mental-trabajo",
    title: "Cuidando tu Salud Mental en el Trabajo",
    excerpt: "Estrategias prácticas para mantener tu bienestar emocional en entornos laborales exigentes.",
    content: "",
    image: "/blog/mental-health.jpg",
    category: "salud",
    author: "Dra. Ana Martínez",
    authorRole: "Psicóloga Clínica",
    date: "2025-12-22",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "12",
    slug: "hidratacion-importancia",
    title: "La Importancia de una Correcta Hidratación",
    excerpt: "Aprende cuánta agua realmente necesitas y cómo la hidratación afecta todas las funciones de tu cuerpo.",
    content: "",
    image: "/blog/hydration.jpg",
    category: "nutricion",
    author: "Dr. Roberto Sánchez",
    authorRole: "Médico Internista",
    date: "2025-12-20",
    readTime: "4 min",
    featured: false,
  },
]

const ITEMS_PER_PAGE = 6

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const featuredArticles = articles.filter((a) => a.featured)

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-[#2C3E50] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-none">
              Blog y Noticias
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Noticias y Consejos de Salud
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 text-pretty">
              Mantente informado con las últimas noticias médicas, consejos de
              salud y artículos escritos por nuestros especialistas.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-12 py-6 bg-white border-none text-foreground"
              />
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {searchQuery === "" && selectedCategory === "all" && currentPage === 1 && (
          <section className="py-12 lg:py-16 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Artículos Destacados
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow border-border">
                      <div className="aspect-video relative bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 to-transparent z-10" />
                            <img
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                          <Badge className="mb-2 bg-primary text-primary-foreground">
                            {getCategoryLabel(article.category)}
                          </Badge>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors text-balance">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar */}
              <aside className="lg:w-72 shrink-0">
                <div className="lg:sticky lg:top-28">
                  {/* Categories */}
                  <div className="bg-card rounded-xl p-6 border border-border mb-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Categorías
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => {
                              setSelectedCategory(category.id)
                              setCurrentPage(1)
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedCategory === category.id
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <span>{category.label}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                selectedCategory === category.id
                                  ? "bg-white/20"
                                  : "bg-muted"
                              }`}
                            >
                              {category.count}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-[#2C3E50] rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-2">
                      Suscríbete a nuestro boletín
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      Recibe las últimas noticias y consejos de salud directamente en tu correo.
                    </p>
                    <Input
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="mb-3 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Suscribirse
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Articles Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedCategory === "all"
                      ? "Todos los Artículos"
                      : getCategoryLabel(selectedCategory)}
                    <span className="text-muted-foreground font-normal ml-2">
                      ({filteredArticles.length})
                    </span>
                  </h2>
                </div>

                {paginatedArticles.length > 0 ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {paginatedArticles.map((article) => (
                        <Link
                          key={article.id}
                          to={`/blog/${article.slug}`}
                          className="group"
                        >
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow border-border">
                            <div className="aspect-video relative bg-muted">
                                <img
                                    src={article.image || "/placeholder.svg"}
                                    alt={article.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <CardContent className="p-5">
                              <Badge
                                variant="secondary"
                                className="mb-3 bg-primary/10 text-primary border-none"
                              >
                                {getCategoryLabel(article.category)}
                              </Badge>
                              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 text-balance">
                                {article.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(article.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {article.readTime}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-10">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="border-border"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="icon"
                              onClick={() => setCurrentPage(page)}
                              className={
                                currentPage === page
                                  ? "bg-primary text-primary-foreground"
                                  : "border-border"
                              }
                            >
                              {page}
                            </Button>
                          )
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="border-border"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No se encontraron artículos
                    </h3>
                    <p className="text-muted-foreground">
                      Intenta con otros términos de búsqueda o selecciona otra categoría.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 text-balance">
              ¿Tienes preguntas sobre tu salud?
            </h2>
            <p className="text-white/80 mb-8 text-pretty">
              Nuestros especialistas están disponibles para atenderte y resolver todas tus dudas.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/cliente/cita">
                Agendar una Consulta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
