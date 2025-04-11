"use client"

import { useState, useEffect } from "react"
import PaginaBase from "@/components/pagina-base"
import { obtenerProductos } from "@/app/acciones"
import FormularioProducto from "@/components/formulario-producto"
import "../../styles/productos.css"

// Categorías simuladas para productos farmacéuticos
const CATEGORIAS = [
  { id: "analgesicos", nombre: "Analgésicos" },
  { id: "antibioticos", nombre: "Antibióticos" },
  { id: "antiinflamatorios", nombre: "Antiinflamatorios" },
  { id: "antialergicos", nombre: "Antialérgicos" },
  { id: "digestivos", nombre: "Digestivos" },
  { id: "otros", nombre: "Otros" },
]

// Asignar categoría a cada producto basado en su descripción
const asignarCategoria = (producto) => {
  const desc = producto.descripcion.toLowerCase()

  if (desc.includes("analgésico") || desc.includes("dolor") || desc.includes("analgesico")) {
    return "analgesicos"
  } else if (desc.includes("antibiótico") || desc.includes("antibiotico")) {
    return "antibioticos"
  } else if (desc.includes("antiinflamatorio") || desc.includes("inflamación") || desc.includes("inflamacion")) {
    return "antiinflamatorios"
  } else if (desc.includes("alergia") || desc.includes("antihistamínico") || desc.includes("antihistaminico")) {
    return "antialergicos"
  } else if (
    desc.includes("digestivo") ||
    desc.includes("estómago") ||
    desc.includes("estomago") ||
    desc.includes("acidez")
  ) {
    return "digestivos"
  } else {
    return "otros"
  }
}

export default function PaginaProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [vistaDetalle, setVistaDetalle] = useState(false)

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos()
  }, [])

  // Función para cargar productos
  const cargarProductos = async () => {
    try {
      setCargando(true)
      const datos = await obtenerProductos()

      // Asignar categoría a cada producto
      const productosConCategoria = datos.map((producto) => ({
        ...producto,
        categoria: asignarCategoria(producto),
      }))

      setProductos(productosConCategoria)
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

    // Filtrar por categoría
    const coincideCategoria = categoriaSeleccionada === "todas" || producto.categoria === categoriaSeleccionada

    return coincideBusqueda && coincideCategoria
  })

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

  // Cambiar entre vista de tarjetas y lista
  const cambiarVista = () => {
    setVistaDetalle(!vistaDetalle)
  }

  return (
    <PaginaBase titulo="Catálogo de Productos">
      {/* Controles de filtrado y acciones */}
      <div className="productos-controles">
        <div className="productos-filtros">
          <select
            className="productos-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <div className="productos-busqueda">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="login-input"
            />
          </div>
        </div>

        <div className="productos-acciones">
          <button
            className="productos-vista-btn"
            onClick={cambiarVista}
            title={vistaDetalle ? "Ver como tarjetas" : "Ver como lista"}
          >
            {vistaDetalle ? "Ver tarjetas" : "Ver lista"}
          </button>

          <button className="boton boton-primario" onClick={abrirFormularioNuevo}>
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Contenido principal - Productos */}
      {cargando ? (
        <div className="productos-cargando">Cargando productos...</div>
      ) : (
        <>
          {/* Mostrar número de resultados */}
          <div className="productos-resultados">{productosFiltrados.length} producto(s) encontrado(s)</div>

          {vistaDetalle ? (
            // Vista de lista detallada
            <div className="productos-lista-contenedor">
              <table className="productos-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                      <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{CATEGORIAS.find((cat) => cat.id === producto.categoria)?.nombre || "Sin categoría"}</td>
                        <td>{producto.descripcion}</td>
                        <td className="productos-precio">{producto.precio.toFixed(2)} €</td>
                        <td className={producto.cantidad < 30 ? "stock-bajo" : ""}>{producto.cantidad}</td>
                        <td>
                          <button
                            className="boton boton-secundario boton-sm"
                            onClick={() => abrirFormularioEditar(producto)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="productos-sin-resultados">
                        No se encontraron productos que coincidan con los criterios de búsqueda
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // Vista de tarjetas
            <div className="productos-grid">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <div key={producto.id} className="producto-tarjeta">
                    <div className="producto-tarjeta-categoria">
                      {CATEGORIAS.find((cat) => cat.id === producto.categoria)?.nombre || "Sin categoría"}
                    </div>
                    <h3 className="producto-tarjeta-nombre">{producto.nombre}</h3>
                    <p className="producto-tarjeta-descripcion">{producto.descripcion}</p>
                    <div className="producto-tarjeta-detalles">
                      <span className="producto-tarjeta-precio">{producto.precio.toFixed(2)} €</span>
                      <span className={`producto-tarjeta-stock ${producto.cantidad < 30 ? "stock-bajo" : ""}`}>
                        Stock: {producto.cantidad}
                      </span>
                    </div>
                    <button
                      className="boton boton-secundario producto-tarjeta-btn"
                      onClick={() => abrirFormularioEditar(producto)}
                    >
                      Editar
                    </button>
                  </div>
                ))
              ) : (
                <div className="productos-sin-resultados-grid">
                  No se encontraron productos que coincidan con los criterios de búsqueda
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Formulario para agregar/editar producto */}
      {mostrarFormulario && (
        <FormularioProducto producto={productoSeleccionado} onGuardar={guardarProducto} onCancelar={cerrarFormulario} />
      )}
    </PaginaBase>
  )
}
