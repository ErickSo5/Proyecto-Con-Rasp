import { useState } from "react";
import { Link, useParams } from  "react-router-dom";
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
  Star,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Phone,
  MapPin,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  ChevronRight,
  BadgeCheck
} from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/error/NotFound";

interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string
  icon: ComponentType<{ className?: string }>;
  category: "servicios" | "productos";
  price: string;
  duration?: string;
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  inStock?: boolean;
}

const services: ServiceItem[] = [
  {
    id: 1,
    slug: "cardiologia",
    name: "Cardiología",
    description:
      "Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.",
    longDescription:
      "Nuestro departamento de cardiología cuenta con tecnología de última generación para el diagnóstico y tratamiento de todas las patologías cardiovasculares. Ofrecemos evaluaciones completas del corazón, incluyendo electrocardiogramas, ecocardiogramas, pruebas de esfuerzo y monitoreo Holter.",
    icon: Heart,
    category: "servicios",
    price: "Desde $80",
    duration: "45 min",
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    slug: "neurologia",
    name: "Neurología",
    description: "Especialistas en el sistema nervioso central y periférico.",
    longDescription:
      "Tratamiento integral de trastornos neurológicos con equipos de diagnóstico avanzados. Nuestros neurólogos están capacitados para diagnosticar y tratar condiciones como migrañas, epilepsia, esclerosis múltiple, Parkinson y trastornos del sueño.",
    icon: Brain,
    category: "servicios",
    price: "Desde $90",
    duration: "60 min",
    rating: 4.8,
    reviews: 95,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 3,
    slug: "traumatologia",
    name: "Traumatología",
    description: "Atención de lesiones musculoesqueléticas y rehabilitación.",
    longDescription:
      "Especialistas en fracturas, lesiones deportivas y rehabilitación física completa. Contamos con servicios de diagnóstico por imagen, cirugía ortopédica y programas de rehabilitación personalizados.",
    icon: Bone,
    category: "servicios",
    price: "Desde $75",
    duration: "40 min",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 4,
    slug: "pediatria",
    name: "Pediatría",
    description: "Cuidado integral de la salud infantil desde el nacimiento.",
    longDescription:
      "Atención especializada para bebés, niños y adolescentes con enfoque preventivo. Ofrecemos consultas de control, vacunación, evaluación del desarrollo y tratamiento de enfermedades pediátricas.",
    icon: Baby,
    category: "servicios",
    price: "Desde $60",
    duration: "30 min",
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 5,
    slug: "oftalmologia",
    name: "Oftalmología",
    description: "Exámenes visuales y tratamiento de enfermedades oculares.",
    longDescription:
      "Diagnóstico y tratamiento de problemas visuales con tecnología láser y cirugía refractiva. Realizamos exámenes completos de la vista, tratamiento de cataratas, glaucoma y enfermedades de la retina.",
    icon: Eye,
    category: "servicios",
    price: "Desde $70",
    duration: "35 min",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 6,
    slug: "medicina-general",
    name: "Medicina General",
    description: "Consultas médicas generales y chequeos preventivos.",
    longDescription:
      "Atención primaria de salud con enfoque en prevención y bienestar general. Nuestros médicos generales realizan evaluaciones completas, chequeos de rutina y derivaciones a especialistas cuando sea necesario.",
    icon: Stethoscope,
    category: "servicios",
    price: "Desde $45",
    duration: "25 min",
    rating: 4.6,
    reviews: 312,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 7,
    slug: "laboratorio-clinico",
    name: "Laboratorio Clínico",
    description: "Análisis clínicos y pruebas de diagnóstico especializadas.",
    longDescription:
      "Resultados precisos y rápidos con equipos de última generación. Ofrecemos análisis de sangre, orina, pruebas hormonales, marcadores tumorales y más de 500 tipos de exámenes.",
    icon: Microscope,
    category: "servicios",
    price: "Desde $25",
    duration: "15 min",
    rating: 4.9,
    reviews: 445,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 8,
    slug: "vacunacion",
    name: "Vacunación",
    description: "Programa completo de inmunización para todas las edades.",
    longDescription:
      "Vacunas para niños, adultos y viajeros con calendario actualizado. Contamos con todas las vacunas del esquema nacional e internacionales para viajeros.",
    icon: Syringe,
    category: "servicios",
    price: "Desde $20",
    duration: "10 min",
    rating: 4.8,
    reviews: 267,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
];

const products: ServiceItem[] = [
  {
    id: 101,
    slug: "monitor-presion-arterial",
    name: "Monitor de Presión Arterial",
    description: "Dispositivo digital para monitoreo de presión en casa.",
    longDescription:
      "Monitor de presión arterial de brazo con memoria para 2 usuarios y 120 lecturas. Pantalla LCD grande, detección de arritmia, indicador de hipertensión y promedio de las últimas 3 lecturas. Incluye brazalete universal ajustable.",
    icon: Activity,
    category: "productos",
    price: "$65",
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=600",
    inStock: true,
    featured: true,
  },
  {
    id: 102,
    slug: "kit-primeros-auxilios",
    name: "Kit de Primeros Auxilios",
    description: "Kit completo con 150 artículos esenciales para emergencias.",
    longDescription:
      "Incluye vendajes, gasas, antisépticos, tijeras y guía de primeros auxilios. Estuche resistente al agua con compartimentos organizados. Ideal para el hogar, oficina, auto o viajes.",
    icon: ShieldPlus,
    category: "productos",
    price: "$45",
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=600",
    inStock: true,
    featured: true,
  },
  {
    id: 103,
    slug: "termometro-infrarrojo",
    name: "Termómetro Infrarrojo",
    description: "Medición de temperatura sin contacto en 1 segundo.",
    longDescription:
      "Termómetro digital infrarrojo con pantalla LCD retroiluminada y alarma de fiebre. Mide temperatura corporal y de superficies. Memoria de 32 lecturas y apagado automático.",
    icon: Thermometer,
    category: "productos",
    price: "$35",
    rating: 4.6,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=600",
    inStock: true,
    featured: false,
  },
  {
    id: 104,
    slug: "vitaminas-multivitaminico",
    name: "Multivitamínico Premium",
    description: "Suplemento diario con 23 vitaminas y minerales esenciales.",
    longDescription:
      "Fórmula completa para adultos con vitaminas A, C, D, E, K y complejo B. Incluye minerales como hierro, calcio, zinc y magnesio. 90 tabletas para 3 meses de uso.",
    icon: Pill,
    category: "productos",
    price: "$28",
    rating: 4.9,
    reviews: 312,
    image: "/placeholder.svg?height=400&width=600",
    inStock: true,
    featured: true,
  },
  {
    id: 105,
    slug: "oximetro-pulso",
    name: "Oxímetro de Pulso",
    description: "Medidor portátil de saturación de oxígeno en sangre.",
    longDescription:
      "Oxímetro de dedo con pantalla OLED, muestra SpO2 y frecuencia cardíaca. Lectura instantánea, portátil y fácil de usar. Incluye cordón y estuche protector.",
    icon: Activity,
    category: "productos",
    price: "$40",
    rating: 4.7,
    reviews: 178,
    image: "/placeholder.svg?height=400&width=600",
    inStock: false,
    featured: false,
  },
  {
    id: 106,
    slug: "glucometro-digital",
    name: "Glucómetro Digital",
    description: "Monitor de glucosa en sangre con tiras reactivas incluidas.",
    longDescription:
      "Kit completo con glucómetro, 50 tiras reactivas, lancetas y estuche. Resultados en 5 segundos, memoria de 500 lecturas con fecha y hora. Conectividad Bluetooth para app móvil.",
    icon: Activity,
    category: "productos",
    price: "$55",
    rating: 4.8,
    reviews: 145,
    image: "/placeholder.svg?height=400&width=600",
    inStock: true,
    featured: false,
  },
];

const allItems = [...services, ...products];

const serviceDetails: Record<
  string,
  {
    benefits: string[];
    includes: string[];
    requirements: string[];
    faqs: { question: string; answer: string }[];
    doctors?: { name: string; specialty: string; image: string }[];
  }
> = {
  cardiologia: {
    benefits: [
      "Diagnóstico temprano de enfermedades cardíacas",
      "Tecnología de imagen de última generación",
      "Equipo de cardiólogos certificados",
      "Seguimiento personalizado del paciente",
      "Programas de rehabilitación cardíaca",
    ],
    includes: [
      "Consulta con especialista",
      "Electrocardiograma (ECG)",
      "Evaluación de factores de riesgo",
      "Plan de tratamiento personalizado",
      "Recomendaciones de estilo de vida",
    ],
    requirements: [
      "Ayuno de 4 horas para exámenes de sangre",
      "Traer estudios previos si los tiene",
      "Lista de medicamentos actuales",
      "Ropa cómoda para prueba de esfuerzo",
    ],
    faqs: [
      {
        question: "¿Con qué frecuencia debo hacerme un chequeo cardíaco?",
        answer:
          "Se recomienda un chequeo anual a partir de los 40 años, o antes si tiene factores de riesgo como hipertensión, diabetes, colesterol alto o antecedentes familiares.",
      },
      {
        question: "¿Qué síntomas requieren atención cardiológica urgente?",
        answer:
          "Dolor en el pecho, dificultad para respirar, palpitaciones irregulares, mareos frecuentes o hinchazón en las piernas requieren evaluación inmediata.",
      },
      {
        question: "¿Los estudios cardiológicos son dolorosos?",
        answer:
          "La mayoría de los estudios son indoloros y no invasivos. El ECG y ecocardiograma no causan ninguna molestia.",
      },
    ],
    doctors: [
      {
        name: "Dr. Carlos Mendoza",
        specialty: "Cardiólogo Intervencionista",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Dra. Ana García",
        specialty: "Cardiología Clínica",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  neurologia: {
    benefits: [
      "Diagnóstico preciso con neuroimagen avanzada",
      "Tratamiento de trastornos neurológicos complejos",
      "Evaluación neuropsicológica completa",
      "Manejo integral del dolor crónico",
      "Seguimiento continuo del paciente",
    ],
    includes: [
      "Consulta neurológica completa",
      "Evaluación cognitiva básica",
      "Examen neurológico detallado",
      "Interpretación de estudios previos",
      "Plan de tratamiento",
    ],
    requirements: [
      "Traer estudios de imagen previos (TAC, RMN)",
      "Lista de medicamentos actuales",
      "Descripción detallada de síntomas",
      "Acompañante si tiene problemas de memoria",
    ],
    faqs: [
      {
        question: "¿Cuándo debo consultar a un neurólogo?",
        answer:
          "Ante dolores de cabeza frecuentes o severos, mareos, problemas de memoria, temblores, adormecimiento o debilidad en extremidades.",
      },
      {
        question: "¿Qué es un electroencefalograma?",
        answer:
          "Es un estudio indoloro que registra la actividad eléctrica del cerebro, útil para diagnosticar epilepsia y otros trastornos.",
      },
    ],
    doctors: [
      {
        name: "Dr. Roberto Silva",
        specialty: "Neurología General",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
};

const defaultDetails = {
  benefits: [
    "Atención personalizada por especialistas certificados",
    "Tecnología médica de última generación",
    "Diagnóstico preciso y oportuno",
    "Seguimiento continuo del tratamiento",
    "Ambiente cómodo y seguro",
  ],
  includes: [
    "Consulta con especialista",
    "Evaluación completa",
    "Plan de tratamiento personalizado",
    "Recomendaciones de seguimiento",
  ],
  requirements: [
    "Documento de identidad",
    "Traer estudios previos si los tiene",
    "Lista de medicamentos actuales",
  ],
  faqs: [
    {
      question: "¿Necesito cita previa?",
      answer:
        "Sí, recomendamos agendar cita para garantizar atención oportuna. También atendemos urgencias.",
    },
    {
      question: "¿Aceptan seguros médicos?",
      answer:
        "Sí, trabajamos con las principales aseguradoras. Consulte nuestra lista de convenios.",
    },
    {
      question: "¿Cuánto dura la consulta?",
      answer:
        "El tiempo varía según la especialidad, generalmente entre 20 y 60 minutos.",
    },
  ],
};

const productDetails: Record<
  string,
  {
    specifications: { label: string; value: string }[];
    features: string[];
    warranty: string;
    shipping: string;
  }
> = {
  "monitor-presion-arterial": {
    specifications: [
      { label: "Tipo", value: "Digital de brazo" },
      { label: "Pantalla", value: "LCD grande retroiluminada" },
      { label: "Memoria", value: "2 usuarios x 120 lecturas" },
      { label: "Alimentación", value: "4 pilas AA o adaptador AC" },
      { label: "Brazalete", value: "22-42 cm ajustable" },
      { label: "Precisión", value: "±3 mmHg" },
    ],
    features: [
      "Detección de arritmia cardíaca",
      "Indicador de hipertensión según OMS",
      "Promedio de últimas 3 lecturas",
      "Indicador de posición del brazalete",
      "Apagado automático",
      "Modo silencioso disponible",
    ],
    warranty: "2 años de garantía del fabricante",
    shipping: "Envío gratis en pedidos mayores a $50",
  },
};

const defaultProductDetails = {
  specifications: [
    { label: "Marca", value: "MediCare Plus" },
    { label: "Garantía", value: "1 año" },
    { label: "Origen", value: "Importado" },
  ],
  features: [
    "Alta calidad certificada",
    "Fácil de usar",
    "Manual en español incluido",
    "Servicio técnico disponible",
  ],
  warranty: "1 año de garantía",
  shipping: "Envío estándar 3-5 días hábiles",
};

export default function ServicioDetallePage() {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);

  if (!slug) {
    return (
        <div className="min-h-screen pt-32 text-center">
        <h1 className="text-xl font-semibold">
            Ruta inválida
        </h1>
        </div>
    );
    }

  const item = allItems.find((i) => i.slug === slug);

  if (!item) {
    return <NotFound />
  }

  const Icon = item.icon;
  const isService = item.category === "servicios";
  const details = isService
    ? serviceDetails[slug] || defaultDetails
    : productDetails[slug] || defaultProductDetails;

  const relatedItems = allItems
    .filter((i) => i.category === item.category && i.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border pt-24 pb-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-[#3B82F6]">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/servicios" className="hover:text-[#3B82F6]">
              {isService ? "Servicios" : "Productos"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Image/Icon */}
            <div>
              <Card className="overflow-hidden border-border">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#EAF2FE] to-[#d1e3f8] flex items-center justify-center">
                  <Icon className="h-40 w-40 text-[#3B82F6]" />
                  {item.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white border-0">
                      Destacado
                    </Badge>
                  )}
                  {!isService && "inStock" in item && (
                    <Badge
                      className={`absolute top-4 right-4 ${
                        item.inStock
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white border-0`}
                    >
                      {item.inStock ? "En Stock" : "Agotado"}
                    </Badge>
                  )}
                </div>
              </Card>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm text-muted-foreground">Compartir:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="capitalize border-[#3B82F6] text-[#3B82F6]"
                >
                  {isService ? "Servicio Médico" : "Producto"}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="text-muted-foreground">
                    ({item.reviews} reseñas)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {item.name}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {item.longDescription}
              </p>

              {/* Price and Duration */}
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <span className="text-sm text-muted-foreground">Precio</span>
                  <div className="text-3xl font-bold text-[#3B82F6]">
                    {item.price}
                  </div>
                </div>
                {isService && item.duration && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Duración
                    </span>
                    <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
                      <Clock className="h-5 w-5 text-[#60A6FA]" />
                      {item.duration}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              {isService ? (
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                  >
                    <Link to="/cliente/cita">
                      <Calendar className="mr-2 h-5 w-5" />
                      Agendar Cita
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="flex-1 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 bg-transparent"
                  >
                    <Link to="/contacto">
                      <Phone className="mr-2 h-5 w-5" />
                      Consultar
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">
                      Cantidad:
                    </span>
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="flex-1 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                      disabled={!isService && "inStock" in item && !item.inStock}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {!isService && "inStock" in item && !item.inStock
                        ? "Agotado"
                        : "Agregar al Carrito"}
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="flex-1 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 bg-transparent"
                    >
                      <Link to="/contacto">
                        <Phone className="mr-2 h-5 w-5" />
                        Consultar
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-[#EAF2FE] flex items-center justify-center">
                      <BadgeCheck className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Certificado
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Alta calidad
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-[#EAF2FE] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Ubicación
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Sede principal
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={isService ? "beneficios" : "especificaciones"}>
            <TabsList className="mb-8 flex-wrap h-auto gap-2">
              {isService ? (
                <>
                  <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
                  <TabsTrigger value="incluye">Qué Incluye</TabsTrigger>
                  <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                  <TabsTrigger value="preguntas">Preguntas Frecuentes</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="especificaciones">
                    Especificaciones
                  </TabsTrigger>
                  <TabsTrigger value="caracteristicas">
                    Características
                  </TabsTrigger>
                  <TabsTrigger value="envio">Envío y Garantía</TabsTrigger>
                </>
              )}
            </TabsList>

            {isService ? (
              <>
                <TabsContent value="beneficios">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Beneficios del Servicio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {(details as typeof defaultDetails).benefits.map(
                          (benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{benefit}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="incluye">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Qué Incluye la Consulta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {(details as typeof defaultDetails).includes.map(
                          (item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requisitos">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Requisitos para la Consulta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {(details as typeof defaultDetails).requirements.map(
                          (req, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#EAF2FE] flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-[#3B82F6]">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-foreground">{req}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preguntas">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Preguntas Frecuentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {(details as typeof defaultDetails).faqs.map(
                          (faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                              <AccordionTrigger className="text-left text-foreground">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="especificaciones">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Especificaciones Técnicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {(
                          details as typeof defaultProductDetails
                        ).specifications.map((spec, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-3 border-b border-border last:border-0"
                          >
                            <span className="text-muted-foreground">
                              {spec.label}
                            </span>
                            <span className="font-medium text-foreground">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="caracteristicas">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Características</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {(details as typeof defaultProductDetails).features.map(
                          (feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="envio">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Envío y Garantía</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Garantía
                        </h4>
                        <p className="text-muted-foreground">
                          {(details as typeof defaultProductDetails).warranty}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Envío
                        </h4>
                        <p className="text-muted-foreground">
                          {(details as typeof defaultProductDetails).shipping}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </section>

      {/* Doctors Section (for services) */}
      {isService &&
        "doctors" in (serviceDetails[slug] || {}) &&
        serviceDetails[slug]?.doctors && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Especialistas en {item.name}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceDetails[slug].doctors?.map((doctor, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EAF2FE] to-[#d1e3f8] flex items-center justify-center">
                        <Users className="h-8 w-8 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {doctor.specialty}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Related Items */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {isService ? "Otros Servicios" : "Productos Relacionados"}
            </h2>
            <Button
              asChild
              variant="outline"
              className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 bg-transparent"
            >
              <Link to="/cliente/servicios">Ver todos</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedItems.map((related) => {
              const RelatedIcon = related.icon;
              return (
                <Link key={related.id} to={`/servicios/${related.slug}`}>
                  <Card className="group h-full overflow-hidden border-border hover:border-[#3B82F6] hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-5">
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#EAF2FE] to-[#d1e3f8] flex items-center justify-center group-hover:from-[#3B82F6] group-hover:to-[#60A6FA] transition-all duration-300">
                          <RelatedIcon className="h-7 w-7 text-[#3B82F6] group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#3B82F6] transition-colors">
                            {related.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {related.description}
                          </p>
                          <span className="font-bold text-[#3B82F6]">
                            {related.price}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="border-0 bg-gradient-to-br from-[#3B82F6] to-[#60A6FA]">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Nuestro equipo está disponible para ayudarte. Contáctanos para
                más información sobre este{" "}
                {isService ? "servicio" : "producto"}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#3B82F6] hover:bg-white/90"
                >
                  <Link to="/contacto">
                    <Phone className="mr-2 h-5 w-5" />
                    Contactar
                  </Link>
                </Button>
                {isService && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link to="/cliente/cita">
                      <Calendar className="mr-2 h-5 w-5" />
                      Agendar Cita
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
