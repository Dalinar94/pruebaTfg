"use client"

import PaginaBase from "@/components/pagina-base"

export default function PaginaProductos() {
  return (
    <PaginaBase titulo="Catálogo de Productos">
      <div className="pagina-contenido">
        <p>Esta sección mostrará el catálogo completo de productos farmacéuticos.</p>
        <p>Aquí se podrán ver detalles de productos, filtrar por categorías y gestionar el catálogo.</p>
      </div>
    </PaginaBase>
  )
}
