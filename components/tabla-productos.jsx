"use client"

import { useState } from "react"
import { eliminarProducto } from "@/app/acciones"

export default function TablaProductos({
  productos = [],
  onEditar,
  busqueda = "",
  onProductosActualizados,
  cargando = false,
}) {
  const [eliminando, setEliminando] = useState(false)

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()),
  )

  // Eliminar un producto
  const manejarEliminarProducto = async (id) => {
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
      try {
        setEliminando(true)
        await eliminarProducto(id)
        if (onProductosActualizados) {
          onProductosActualizados()
        }
      } catch (error) {
        console.error("Error al eliminar producto:", error)
        alert("Error al eliminar el producto")
      } finally {
        setEliminando(false)
      }
    }
  }

  if (cargando) {
    return (
      <div className="dashboard-tabla-contenedor">
        <div className="dashboard-cargando">
          <p>Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
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
                <td style={{ textAlign: "right" }} className={producto.cantidad < 30 ? "stock-bajo" : ""}>
                  {producto.cantidad}
                </td>
                <td style={{ textAlign: "right" }}>{producto.precio.toFixed(2)} €</td>
                <td>
                  <div className="dashboard-acciones">
                    <button className="boton boton-secundario" onClick={() => onEditar(producto)} disabled={eliminando}>
                      Editar
                    </button>
                    <button
                      className="boton boton-peligro"
                      onClick={() => manejarEliminarProducto(producto.id)}
                      disabled={eliminando}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
                {busqueda
                  ? "No se encontraron productos que coincidan con la búsqueda"
                  : "No hay productos registrados"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
