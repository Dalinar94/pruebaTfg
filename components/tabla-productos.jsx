"use client"

import { useState, useEffect } from "react"
import { obtenerProductos, eliminarProducto } from "@/app/acciones"
import "../styles/dashboard.css"

export default function TablaProductos({ onEditar, busqueda = "" }) {
  const [productos, setProductos] = useState([])

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
                <td style={{ textAlign: "right" }}>{producto.cantidad}</td>
                <td style={{ textAlign: "right" }}>{producto.precio.toFixed(2)} €</td>
                <td>
                  <div className="dashboard-acciones">
                    <button className="boton boton-secundario" onClick={() => onEditar(producto)}>
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
  )
}
