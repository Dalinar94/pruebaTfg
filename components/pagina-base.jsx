"use client"

import { useRouter } from "next/navigation"
import BarraNavegacion from "./barra-navegacion"
import "../styles/dashboard.css"

// Componente base para todas las páginas que requieren navegación
export default function PaginaBase({ titulo, children }) {
  const router = useRouter()

  // Cerrar sesión
  const cerrarSesion = () => {
    router.push("/")
  }

  return (
    <div className="dashboard-contenedor">
      <BarraNavegacion onCerrarSesion={cerrarSesion} />

      <main className="contenedor dashboard-principal">
        <h1 className="dashboard-titulo">{titulo}</h1>
        {children}
      </main>
    </div>
  )
}
