"use client"

import PaginaBase from "@/components/pagina-base"

export default function PaginaStock() {
  return (
    <PaginaBase titulo="Control de Stock">
      <div className="pagina-contenido">
        <p>Esta sección permitirá gestionar el inventario y control de stock de la farmacia.</p>
        <p>Aquí se mostrarán estadísticas de inventario, alertas de stock bajo y movimientos de productos.</p>
      </div>
    </PaginaBase>
  )
}