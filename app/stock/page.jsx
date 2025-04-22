"use client"

import { useState, useEffect } from "react"
import PaginaBase from "@/components/pagina-base"
import { obtenerProductos } from "@/app/acciones"
import "../../styles/stock.css"
import {TEXTOS} from "@/lib/constantes"

export default function PaginaStock() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState("todos") // todos, bajo, agotado
  const [busqueda, setBusqueda] = useState("")
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    stockBajo: 0,
    agotados: 0,
    valorTotal: 0,
  })

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos()
  }, [])

  // Función para cargar productos
  const cargarProductos = async () => {
    try {
      setCargando(true)
      const datos = await obtenerProductos()
      setProductos(datos)

      // Calcular estadísticas
      const stockBajo = datos.filter((p) => p.cantidad < 30 && p.cantidad > 0).length
      const agotados = datos.filter((p) => p.cantidad === 0).length
      const valorTotal = datos.reduce((sum, p) => sum + p.precio * p.cantidad, 0)

      setEstadisticas({
        total: datos.length,
        stockBajo,
        agotados,
        valorTotal,
      })
    } catch (error) {
      console.error("Error al cargar productos:", error)
    } finally {
      setCargando(false)
    }
  }

  // Filtrar productos según criterios
  const productosFiltrados = productos.filter((producto) => {
    // Filtrar por búsqueda
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())

    // Filtrar por estado de stock
    let coincideFiltro = true
    if (filtro === "bajo") {
      coincideFiltro = producto.cantidad < 30 && producto.cantidad > 0
    } else if (filtro === "agotado") {
      coincideFiltro = producto.cantidad === 0
    }

    return coincideBusqueda && coincideFiltro
  })

  // Obtener clase CSS según nivel de stock
  const obtenerClaseStock = (cantidad) => {
    if (cantidad === 0) return "stock-agotado"
    if (cantidad < 30) return "stock-bajo"
    return "stock-normal"
  }

  // Obtener texto de estado según nivel de stock
  const obtenerEstadoStock = (cantidad) => {
    if (cantidad === 0) return "Agotado"
    if (cantidad < 30) return "Stock Bajo"
    return "Normal"
  }

  return (
    <PaginaBase titulo="Control de Stock">
      {/* Estadísticas de Stock */}
      <div className="stock-estadisticas">
        <div className="stock-estadistica-tarjeta">
          <h3>{TEXTOS.STOCK_TOTAL_PRODUCTOS}</h3>
          <p className="stock-estadistica-valor">{cargando ? "..." : estadisticas.total}</p>
        </div>
        <div className="stock-estadistica-tarjeta stock-bajo-tarjeta">
          <h3>{TEXTOS.TITULO_STOCK_BAJO}</h3>
          <p className="stock-estadistica-valor">{cargando ? "..." : estadisticas.stockBajo}</p>
        </div>
        <div className="stock-estadistica-tarjeta stock-agotado-tarjeta">
          <h3>{TEXTOS.BTN_AGOTADOS}</h3>
          <p className="stock-estadistica-valor">{cargando ? "..." : estadisticas.agotados}</p>
        </div>
        <div className="stock-estadistica-tarjeta">
          <h3>{TEXTOS.TITULO_VALOR_INVENTARIO}</h3>
          <p className="stock-estadistica-valor">{cargando ? "..." : `${estadisticas.valorTotal.toFixed(2)} €`}</p>
        </div>
      </div>

      {/* Controles de filtrado */}
      <div className="stock-controles">
        <div className="stock-filtros">
          <button
            className={`stock-filtro-btn ${filtro === "todos" ? "activo" : ""}`}
            onClick={() => setFiltro("todos")}
          >
            {TEXTOS.BTN_TODOS}
          </button>
          <button className={`stock-filtro-btn ${filtro === "bajo" ? "activo" : ""}`} onClick={() => setFiltro("bajo")}>
          {TEXTOS.TITULO_STOCK_BAJO}
          </button>
          <button
            className={`stock-filtro-btn ${filtro === "agotado" ? "activo" : ""}`}
            onClick={() => setFiltro("agotado")}
          >
            {TEXTOS.BTN_AGOTADOS}
          </button>
        </div>
        <div className="stock-busqueda">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="login-input"
          />
        </div>
      </div>

      {/* Tabla de Stock */}
      <div className="stock-tabla-contenedor">
        {cargando ? (
          <div className="stock-cargando">{TEXTOS.DIV_CARGANDO_INVENTARIO}</div>
        ) : (
          <table className="stock-tabla">
            <thead>
              <tr>
                <th>{TEXTOS.LABEL_PRODUCTO}</th>
                <th>{TEXTOS.LABEL_DESCRIPCION}</th>
                <th>{TEXTOS.LABEL_PRECIO}</th>
                <th>{TEXTOS.LABEL_CANTIDAD}</th>
                <th>{TEXTOS.LABEL_VALOR}</th>
                <th>{TEXTOS.LABEL_ESTADO}</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td className="stock-producto-nombre">{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td className="stock-precio">{producto.precio.toFixed(2)} €</td>
                    <td className="stock-cantidad">{producto.cantidad}</td>
                    <td className="stock-valor">{(producto.precio * producto.cantidad).toFixed(2)} €</td>
                    <td>
                      <span className={`stock-estado ${obtenerClaseStock(producto.cantidad)}`}>
                        {obtenerEstadoStock(producto.cantidad)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="stock-sin-resultados">
                    {busqueda || filtro !== "todos"
                      ? "No se encontraron productos que coincidan con los criterios de búsqueda"
                      : "No hay productos en el inventario"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Recomendaciones de reabastecimiento */}
      {filtro === "bajo" && productosFiltrados.length > 0 && (
        <div className="stock-recomendaciones">
          <h3>Recomendaciones de Reabastecimiento</h3>
          <p>Se recomienda reabastecer los siguientes productos:</p>
          <ul>
            {productosFiltrados.slice(0, 5).map((producto) => (
              <li key={producto.id}>
                <strong>{producto.nombre}</strong>: Pedir al menos {Math.max(50 - producto.cantidad, 10)} unidades
              </li>
            ))}
          </ul>
        </div>
      )}
    </PaginaBase>
  )
}
