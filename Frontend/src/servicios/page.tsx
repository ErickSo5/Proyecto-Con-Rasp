import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Stethoscope,
  Activity,
  Pill,
  Microscope,
  Syringe,
  Thermometer,
  ShieldPlus,
  Search,
  ArrowRight,
  Star,
  Clock,
  Users,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    id: 1,
    slug: "cardiologia",
    name: "Cardiología",
    description: "Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.",
    longDescription: "Nuestro departamento de cardiología cuenta con tecnología de última generación para el diagnóstico y tratamiento de todas las patologías cardiovasculares.",
    icon: Heart,
    category: "servicios",
    price: "Desde $80",
    duration: "45 min",
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 2,
    slug: "neurologia",
    name: "Neurología",
    description: "Especialistas en el sistema nervioso central y periférico.",
    longDescription: "Tratamiento integral de trastornos neurológicos con equipos de diagnóstico avanzados.",
    icon: Brain,
    category: "servicios",
    price: "Desde $90",
    duration: "60 min",
    rating: 4.8,
    reviews: 95,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 3,
    slug: "traumatologia",
    name: "Traumatología",
    description: "Atención de lesiones musculoesqueléticas y rehabilitación.",
    longDescription: "Especialistas en fracturas, lesiones deportivas y rehabilitación física completa.",
    icon: Bone,
    category: "servicios",
    price: "Desde $75",
    duration: "40 min",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: 4,
    slug: "pediatria",
    name: "Pediatría",
    description: "Cuidado integral de la salud infantil desde el nacimiento.",
    longDescription: "Atención especializada para bebés, niños y adolescentes con enfoque preventivo.",
    icon: Baby,
    category: "servicios",
    price: "Desde $60",
    duration: "30 min",
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 5,
    slug: "oftalmologia",
    name: "Oftalmología",
    description: "Exámenes visuales y tratamiento de enfermedades oculares.",
    longDescription: "Diagnóstico y tratamiento de problemas visuales con tecnología láser y cirugía refractiva.",
    icon: Eye,
    category: "servicios",
    price: "Desde $70",
    duration: "35 min",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: 6,
    slug: "medicina-general",
    name: "Medicina General",
    description: "Consultas médicas generales y chequeos preventivos.",
    longDescription: "Atención primaria de salud con enfoque en prevención y bienestar general.",
    icon: Stethoscope,
    category: "servicios",
    price: "Desde $45",
    duration: "25 min",
    rating: 4.6,
    reviews: 312,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: 7,
    slug: "laboratorio-clinico",
    name: "Laboratorio Clínico",
    description: "Análisis clínicos y pruebas de diagnóstico especializadas.",
    longDescription: "Resultados precisos y rápidos con equipos de última generación.",
    icon: Microscope,
    category: "servicios",
    price: "Desde $25",
    duration: "15 min",
    rating: 4.9,
    reviews: 445,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 8,
    slug: "vacunacion",
    name: "Vacunación",
    description: "Programa completo de inmunización para todas las edades.",
    longDescription: "Vacunas para niños, adultos y viajeros con calendario actualizado.",
    icon: Syringe,
    category: "servicios",
    price: "Desde $20",
    duration: "10 min",
    rating: 4.8,
    reviews: 267,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
];

const products = [
  {
    id: 101,
    slug: "monitor-presion-arterial",
    name: "Monitor de Presión Arterial",
    description: "Dispositivo digital para monitoreo de presión en casa.",
    longDescription: "Monitor de presión arterial de brazo con memoria para 2 usuarios y 120 lecturas.",
    icon: Activity,
    category: "productos",
    price: "$65",
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    inStock: true,
    featured: true,
  },
  {
    id: 102,
    slug: "kit-primeros-auxilios",
    name: "Kit de Primeros Auxilios",
    description: "Kit completo con 150 artículos esenciales para emergencias.",
    longDescription: "Incluye vendajes, gasas, antisépticos, tijeras y guía de primeros auxilios.",
    icon: ShieldPlus,
    category: "productos",
    price: "$45",
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    inStock: true,
    featured: true,
  },
  {
    id: 103,
    slug: "termometro-infrarrojo",
    name: "Termómetro Infrarrojo",
    description: "Medición de temperatura sin contacto en 1 segundo.",
    longDescription: "Termómetro digital infrarrojo con pantalla LCD retroiluminada y alarma de fiebre.",
    icon: Thermometer,
    category: "productos",
    price: "$35",
    rating: 4.6,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=400",
    inStock: true,
    featured: false,
  },
  {
    id: 104,
    slug: "vitaminas-multivitaminico",
    name: "Multivitamínico Premium",
    description: "Suplemento diario con 23 vitaminas y minerales esenciales.",
    longDescription: "Fórmula completa para adultos con vitaminas A, C, D, E, K y complejo B.",
    icon: Pill,
    category: "productos",
    price: "$28",
    rating: 4.9,
    reviews: 312,
    image: "/placeholder.svg?height=300&width=400",
    inStock: true,
    featured: true,
  },
  {
    id: 105,
    slug: "oximetro-pulso",
    name: "Oxímetro de Pulso",
    description: "Medidor portátil de saturación de oxígeno en sangre.",
    longDescription: "Oxímetro de dedo con pantalla OLED, muestra SpO2 y frecuencia cardíaca.",
    icon: Activity,
    category: "productos",
    price: "$40",
    rating: 4.7,
    reviews: 178,
    image: "/placeholder.svg?height=300&width=400",
    inStock: false,
    featured: false,
  },
  {
    id: 106,
    slug: "glucometro-digital",
    name: "Glucómetro Digital",
    description: "Monitor de glucosa en sangre con tiras reactivas incluidas.",
    longDescription: "Kit completo con glucómetro, 50 tiras reactivas, lancetas y estuche.",
    icon: Activity,
    category: "productos",
    price: "$55",
    rating: 4.8,
    reviews: 145,
    image: "/placeholder.svg?height=300&width=400",
    inStock: true,
    featured: false,
  },
];

const allItems = [...services, ...products];

export default function ServiciosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeTab === "todos" || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const featuredItems = allItems.filter((item) => item.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C3E50] via-[#3B82F6] to-[#60A6FA] pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-0">
              Catálogo Completo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Servicios Médicos y Productos de Salud
            </h1>
            <p className="text-xl text-white/90 mb-8 text-pretty">
              Encuentra todos nuestros servicios especializados y productos
              médicos de alta calidad para el cuidado de tu salud.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar servicios o productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white border-0 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3B82F6] mb-2">
                {services.length}+
              </div>
              <div className="text-muted-foreground">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3B82F6] mb-2">
                {products.length}+
              </div>
              <div className="text-muted-foreground">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3B82F6] mb-2">
                15k+
              </div>
              <div className="text-muted-foreground">Pacientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3B82F6] mb-2">
                4.8
              </div>
              <div className="text-muted-foreground">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Destacados
              </h2>
              <p className="text-muted-foreground">
                Nuestros servicios y productos más solicitados
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} to={`/servicios/${item.slug}`}>
                  <Card className="group h-full overflow-hidden border-border hover:border-[#3B82F6] hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-48 bg-gradient-to-br from-[#EAF2FE] to-[#d1e3f8] flex items-center justify-center">
                      <Icon className="h-20 w-20 text-[#3B82F6] group-hover:scale-110 transition-transform duration-300" />
                      {item.category === "productos" && "inStock" in item && (
                        <Badge
                          className={`absolute top-3 right-3 ${
                            item.inStock
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          } text-white border-0`}
                        >
                          {item.inStock ? "En Stock" : "Agotado"}
                        </Badge>
                      )}
                      {item.featured && (
                        <Badge className="absolute top-3 left-3 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white border-0">
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs capitalize border-[#3B82F6] text-[#3B82F6]"
                        >
                          {item.category === "servicios"
                            ? "Servicio"
                            : "Producto"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                          <span className="text-xs">({item.reviews})</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-[#3B82F6] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#3B82F6]">
                          {item.price}
                        </span>
                        {"duration" in item && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Items Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Catálogo Completo
              </h2>
              <p className="text-muted-foreground">
                Explora todos nuestros servicios y productos
              </p>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="servicios">Servicios</TabsTrigger>
                <TabsTrigger value="productos">Productos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground mb-6">
                Intenta con otros términos de búsqueda
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveTab("todos");
                }}
                className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
              >
                Ver todo el catálogo
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.id} to={`/servicios/${item.slug}`}>
                    <Card className="group h-full overflow-hidden border-border hover:border-[#3B82F6] hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-0">
                        <div className="flex gap-4 p-5">
                          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#EAF2FE] to-[#d1e3f8] flex items-center justify-center group-hover:from-[#3B82F6] group-hover:to-[#60A6FA] transition-all duration-300">
                            <Icon className="h-8 w-8 text-[#3B82F6] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className="text-xs capitalize border-[#3B82F6]/50 text-[#3B82F6]"
                              >
                                {item.category === "servicios"
                                  ? "Servicio"
                                  : "Producto"}
                              </Badge>
                              {item.category === "productos" &&
                                "inStock" in item && (
                                  <Badge
                                    className={`text-xs ${
                                      item.inStock
                                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                                        : "bg-red-100 text-red-700 hover:bg-red-100"
                                    } border-0`}
                                  >
                                    {item.inStock ? "Disponible" : "Agotado"}
                                  </Badge>
                                )}
                            </div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#3B82F6] transition-colors truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-[#3B82F6]">
                                  {item.price}
                                </span>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  <span>{item.rating}</span>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-[#3B82F6] to-[#60A6FA]">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">
                    ¿No encuentras lo que buscas?
                  </h2>
                  <p className="text-white/90 mb-6 text-pretty">
                    Contáctanos y te ayudaremos a encontrar el servicio o
                    producto que necesitas. Nuestro equipo está disponible para
                    asesorarte.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-[#3B82F6] hover:bg-white/90"
                    >
                      <Link to="/cliente/cita">Agendar Consulta</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 bg-transparent"
                    >
                      <Link to="/contacto">Contactar</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                        <BadgeCheck className="h-8 w-8 text-white" />
                        <div>
                          <div className="font-semibold text-white">
                            Certificados
                          </div>
                          <div className="text-sm text-white/80">
                            Alta calidad
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                        <Clock className="h-8 w-8 text-white" />
                        <div>
                          <div className="font-semibold text-white">
                            24/7
                          </div>
                          <div className="text-sm text-white/80">
                            Emergencias
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                      <div className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                        <Users className="h-8 w-8 text-white" />
                        <div>
                          <div className="font-semibold text-white">+50</div>
                          <div className="text-sm text-white/80">
                            Especialistas
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                        <Star className="h-8 w-8 text-white" />
                        <div>
                          <div className="font-semibold text-white">4.9</div>
                          <div className="text-sm text-white/80">
                            Calificación
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
