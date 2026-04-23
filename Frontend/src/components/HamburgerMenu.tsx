import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, FileText, Shield, Phone, LogIn } from "lucide-react";

const menuItems = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Términos y Condiciones", href: "/terminos", icon: FileText },
  { label: "Política de Privacidad", href: "/privacidad", icon: Shield },
  { label: "Contacto", href: "/contacto", icon: Phone },
  { label: "Iniciar Sesión", href: "/", icon: LogIn },
];

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded text-[#2C3E50] hover:bg-[#EAF2FE]"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-6 border-b">
          <span className="font-semibold">Clínica</span>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EAF2FE]"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
