"use client"

import PaginaBase from "@/components/pagina-base"
import FormularioSoporte from "@/components/soporte/formulario-soporte"

export default function PaginaSoporte() {
  return (
    <PaginaBase titulo="Soporte Técnico">
      <FormularioSoporte />
    </PaginaBase>
  )
}
