"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from "../acciones"
import BarraNavegacion from "@/components/barra-navegacion"
import "../../styles/dashboard.css"

export default function PaginaDashboard() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [formularioProducto, setFormularioProducto] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    precio: 0,
  })
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const router = useRouter()

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos()
  }, [])

  // Función para cargar productos
  const cargarProductos = async () => {
    try {
      const datos = await obtenerProductos()
      setProductos(datos)
    } catch (error) {
      console.error("Error al cargar productos:", error)
    }
  }

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()),
  )

  // Manejar cambios en el formulario
  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target
    setFormularioProducto({
      ...formularioProducto,
      [name]: name === "cantidad" || name === "precio" ? Number.parseFloat(value) : value,
    })
  }

  // Abrir formulario para nuevo producto
  const abrirFormularioNuevo = () => {
    setFormularioProducto({
      nombre: "",
      descripcion: "",
      cantidad: 0,
      precio: 0,
    })
    setModoEdicion(false)
    setDialogoAbierto(true)
  }

  // Abrir formulario para editar producto
  const abrirFormularioEditar = (producto) => {
    setFormularioProducto({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      precio: producto.precio,
    })
    setModoEdicion(true)
    setDialogoAbierto(true)
  }

  // Guardar producto (nuevo o editado)
  const guardarProducto = async () => {
    try {
      if (modoEdicion) {
        await actualizarProducto(formularioProducto)
      } else {
        await agregarProducto(formularioProducto)
      }
      setDialogoAbierto(false)
      cargarProductos()
    } catch (error) {
      console.error("Error al guardar producto:", error)
    }
  }

  // Eliminar un producto
  const manejarEliminarProducto = async (id) => {
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
      try {
        await eliminarProducto(id)
        cargarProductos()
      } catch (error) {
        console.error("Error al eliminar producto:", error)
      }
    }
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

        <div className="dashboard-tabla-contenedor">
          <table className="dashboard-tabla">
            <caption className="dashboard-tabla-caption">Inventario actual de productos</caption>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th style={{ textAlign: "right" }}>Cantidad</th>
                <th style={{ textAlign: "right" }}>Precio (€)</th>
                <th style={{ textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td className="font-medium">{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td style={{ textAlign: "right" }}>{producto.cantidad}</td>
                    <td style={{ textAlign: "right" }}>{producto.precio.toFixed(2)} €</td>
                    <td>
                      <div className="dashboard-acciones">
                        <button className="boton boton-secundario" onClick={() => abrirFormularioEditar(producto)}>
                          Editar
                        </button>
                        <button className="boton boton-peligro" onClick={() => manejarEliminarProducto(producto.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
                    No se encontraron productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {dialogoAbierto && (
        <div className="dashboard-dialogo">
          <div className="dashboard-dialogo-contenido">
            <div className="dashboard-dialogo-encabezado">
              <h2 className="dashboard-dialogo-titulo">{modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
              <p className="dashboard-dialogo-descripcion">Complete los detalles del producto y guarde los cambios.</p>
            </div>

            <div className="dashboard-dialogo-cuerpo">
              <div className="dashboard-formulario">
                <div className="dashboard-formulario-grupo">
                  <label htmlFor="nombre" className="login-etiqueta">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={formularioProducto.nombre}
                    onChange={manejarCambioFormulario}
                    placeholder="Nombre del producto"
                    className="login-input"
                  />
                </div>

                <div className="dashboard-formulario-grupo">
                  <label htmlFor="descripcion" className="login-etiqueta">
                    Descripción
                  </label>
                  <input
                    id="descripcion"
                    name="descripcion"
                    value={formularioProducto.descripcion}
                    onChange={manejarCambioFormulario}
                    placeholder="Descripción del producto"
                    className="login-input"
                  />
                </div>

                <div className="dashboard-formulario-fila">
                  <div className="dashboard-formulario-grupo">
                    <label htmlFor="cantidad" className="login-etiqueta">
                      Cantidad
                    </label>
                    <input
                      id="cantidad"
                      name="cantidad"
                      type="number"
                      min="0"
                      value={formularioProducto.cantidad}
                      onChange={manejarCambioFormulario}
                      className="login-input"
                    />
                  </div>

                  <div className="dashboard-formulario-grupo">
                    <label htmlFor="precio" className="login-etiqueta">
                      Precio (€)
                    </label>
                    <input
                      id="precio"
                      name="precio"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formularioProducto.precio}
                      onChange={manejarCambioFormulario}
                      className="login-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-dialogo-pie">
              <button className="boton boton-secundario" onClick={() => setDialogoAbierto(false)}>
                Cancelar
              </button>
              <button className="boton boton-primario" onClick={guardarProducto}>
                {modoEdicion ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
