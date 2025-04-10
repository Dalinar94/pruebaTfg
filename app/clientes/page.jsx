"use client"

import PaginaBase from "@/components/pagina-base"

export default function PaginaClientes() {
  return (
    <PaginaBase titulo="Gestión de Clientes">
      <div className="pagina-contenido">
        <p>Esta sección permitirá gestionar la información de los clientes de la farmacia.</p>
        <p>Aquí se podrán ver historiales de compras, información de contacto y gestionar fidelización.</p>
      </div>
    </PaginaBase>
  )
}
