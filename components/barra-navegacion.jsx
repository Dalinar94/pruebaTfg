"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import "../styles/navegacion.css"

export default function BarraNavegacion({ onCerrarSesion }) {
  const pathname = usePathname()

  // Función para determinar si un enlace está activo
  const esEnlaceActivo = (ruta) => {
    return pathname === ruta ? "navegacion-enlace-activo" : ""
  }

  return (
    <header className="navegacion">
      <div className="contenedor navegacion-contenedor">
        <div className="navegacion-logo">
          <span className="navegacion-titulo">FarmaStock</span>
        </div>

        <div className="navegacion-menu">
          <Link href="/dashboard" className={`navegacion-enlace ${esEnlaceActivo("/dashboard")}`}>
            Dashboard
          </Link>
          <Link href="/stock" className={`navegacion-enlace ${esEnlaceActivo("/stock")}`}>
            Stock
          </Link>
          <Link href="/productos" className={`navegacion-enlace ${esEnlaceActivo("/productos")}`}>
            Productos
          </Link>
          <Link href="/proveedores" className={`navegacion-enlace ${esEnlaceActivo("/proveedores")}`}>
            Proveedores
          </Link>
          <Link href="/clientes" className={`navegacion-enlace ${esEnlaceActivo("/clientes")}`}>
            Clientes
          </Link>
          <Link href="/soporte" className={`navegacion-enlace ${esEnlaceActivo("/soporte")}`}>
            Soporte
          </Link>
        </div>

        <button className="navegacion-boton" onClick={onCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}
