"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import "../styles/navegacion.css"
import {TEXTOS} from "@/lib/constantes"

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
          <span className="navegacion-titulo">{TEXTOS.NOMBRE_EMPRESA}</span>
        </div>

        <div className="navegacion-menu">
          <Link href="/dashboard" className={`navegacion-enlace ${esEnlaceActivo("/dashboard")}`}>
            {TEXTOS.TITULO_DASHBOARD}
          </Link>
          <Link href="/stock" className={`navegacion-enlace ${esEnlaceActivo("/stock")}`}>
          {TEXTOS.TITULO_STOCK}

          </Link>
          <Link href="/productos" className={`navegacion-enlace ${esEnlaceActivo("/productos")}`}>
            {TEXTOS.TITULO_CATALOGO_PRODUCTOS}
          </Link>
          <Link href="/proveedores" className={`navegacion-enlace ${esEnlaceActivo("/proveedores")}`}>
            {TEXTOS.TITULO_PROVEEDORES}
          </Link>
          <Link href="/clientes" className={`navegacion-enlace ${esEnlaceActivo("/clientes")}`}>
            {TEXTOS.TITULO_CLIENTES}
          </Link>
          <Link href="/soporte" className={`navegacion-enlace ${esEnlaceActivo("/soporte")}`}>
            {TEXTOS.TITULO_SOPORTE}
          </Link>
        </div>

        <button className="navegacion-boton" onClick={onCerrarSesion}>
          {TEXTOS.BTN_CERRAR_SESION}
        </button>
      </div>
    </header>
  )
}
