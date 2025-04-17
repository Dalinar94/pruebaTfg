"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BarraNavegacion from "@/components/barra-navegacion"
import TablaProductos from "@/components/tabla-productos"
import FormularioProducto from "@/components/formulario-producto"
import { obtenerProductos } from "@/app/acciones"
import "../../styles/dashboard.css"
import {TEXTOS} from "@/lib/constantes"

export default function PaginaDashboard() {
  const [busqueda, setBusqueda] = useState("")
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [productos, setProductos] = useState([])
  const [estadisticas, setEstadisticas] = useState({
    totalProductos: 0,
    valorTotal: 0,
    stockBajo: 0,
    ventasHoy: 12, // Valor simulado
  })
  const [cargando, setCargando] = useState(true)
  const router = useRouter()

  // Efecto para cargar productos al iniciar
  useEffect(() => {
    cargarProductos()
  }, [])

  // Función para cargar productos y calcular estadísticas
  const cargarProductos = async () => {
    try {
      setCargando(true)
      const datos = await obtenerProductos()
      setProductos(datos)

      // Calcular estadísticas
      const total = datos.length
      const valor = datos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0)
      const bajo = datos.filter((p) => p.cantidad < 30).length

      setEstadisticas({
        totalProductos: total,
        valorTotal: valor,
        stockBajo: bajo,
        ventasHoy: 15, // Valor simulado,aqui puedo cambiar el valor manualmente
      })
    } catch (error) {
      console.error("Error al cargar productos:", error)
    } finally {
      setCargando(false)
    }
  }

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
    cargarProductos() // Recargar productos para actualizar la tabla
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
        <h1 className="dashboard-titulo">{TEXTOS.TITULO_DASHBOARD}</h1>

        <div className="dashboard-estadisticas">
          <div className="dashboard-estadistica-tarjeta">
            <h3>{TEXTOS.TITULO_PRODUCTOS}</h3>
            <p className="dashboard-estadistica-valor">{cargando ? "..." : estadisticas.totalProductos}</p>
          </div>
          <div className="dashboard-estadistica-tarjeta">
            <h3>{TEXTOS.TITULO_VENTAS_HOY}</h3>
            <p className="dashboard-estadistica-valor">{cargando ? "..." : estadisticas.ventasHoy}</p>
          </div>
          <div className="dashboard-estadistica-tarjeta">
            <h3>{TEXTOS.TITULO_VALOR_INVENTARIO}</h3>
            <p className="dashboard-estadistica-valor">
              {cargando ? "..." : `${estadisticas.valorTotal.toFixed(2)} €`}
            </p>
          </div>
          <div className="dashboard-estadistica-tarjeta">
            <h3>{TEXTOS.TITULO_STOCK_BAJO}</h3>
            <p className="dashboard-estadistica-valor">{cargando ? "..." : estadisticas.stockBajo}</p>
            <p className="dashboard-estadistica-detalle">{TEXTOS.PRO_MENOS_30UNIDADES}</p>
          </div>
        </div>

        <h2 className="dashboard-subtitulo">{TEXTOS.TITULO_PRODUCTOS}</h2>
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
            {TEXTOS.BTN_AGREGAR_PRODUCTO}
          </button>
        </div>

        <TablaProductos
          productos={productos}
          onEditar={abrirFormularioEditar}
          busqueda={busqueda}
          onProductosActualizados={cargarProductos}
          cargando={cargando}
        />
      </main>

      {mostrarFormulario && (
        <FormularioProducto producto={productoSeleccionado} onGuardar={guardarProducto} onCancelar={cerrarFormulario} />
      )}
    </div>
  )
}
