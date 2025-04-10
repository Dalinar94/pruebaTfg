"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BarraNavegacion from "@/components/barra-navegacion"
import TablaProductos from "@/components/tabla-productos"
import FormularioProducto from "@/components/formulario-producto"
import "../../styles/dashboard.css"

export default function PaginaDashboard() {
  const [busqueda, setBusqueda] = useState("")
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const router = useRouter()

  // Abrir formulario para nuevo producto
  const abrirFormularioNuevo = () => {
    setProductoSeleccionado(null)
    setMostrarFormulario(true)
  }

  // Abrir formulario para editar producto
  const abrirFormularioEditar = (producto) => {
    setProductoSeleccionado(producto)
    setMostrarFormulario(true)
  }

  // Cerrar formulario
  const cerrarFormulario = () => {
    setMostrarFormulario(false)
    setProductoSeleccionado(null)
  }

  // Guardar producto y cerrar formulario
  const guardarProducto = () => {
    setMostrarFormulario(false)
    setProductoSeleccionado(null)
  }

  // Cerrar sesión
  const cerrarSesion = () => {
    router.push("/")
  }

  return (
    <div className="dashboard-contenedor">
      <BarraNavegacion onCerrarSesion={cerrarSesion} />

      <main className="contenedor dashboard-principal">
        <h1 className="dashboard-titulo">Control de Stock</h1>

        <div className="dashboard-controles">
          <div className="dashboard-busqueda">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="login-input"
            />
          </div>
          <button onClick={abrirFormularioNuevo} className="boton boton-primario">
            Agregar Producto
          </button>
        </div>

        <TablaProductos onEditar={abrirFormularioEditar} busqueda={busqueda} />
      </main>

      {mostrarFormulario && (
        <FormularioProducto producto={productoSeleccionado} onGuardar={guardarProducto} onCancelar={cerrarFormulario} />
      )}
    </div>
  )
}
