import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 pt-20">
      <Header />

      <div className="grow">
        <Hero />
      </div>

      <Footer />
    </main>
  )
}
