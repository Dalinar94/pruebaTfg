"use client"

import { useState, useEffect } from "react"
import { agregarProducto, actualizarProducto } from "@/app/acciones"
import "../styles/dashboard.css"
import {TEXTOS} from "@/lib/constantes"

export default function FormularioProducto({ producto = null, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    precio: 0,
  })
  const [modoEdicion, setModoEdicion] = useState(false)

  // Inicializar formulario si se recibe un producto para editar
  useEffect(() => {
    if (producto) {
      setFormulario({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        cantidad: producto.cantidad,
        precio: producto.precio,
      })
      setModoEdicion(true)
    } else {
      setFormulario({
        nombre: "",
        descripcion: "",
        cantidad: 0,
        precio: 0,
      })
      setModoEdicion(false)
    }
  }, [producto])

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario({
      ...formulario,
      [name]: name === "cantidad" || name === "precio" ? Number.parseFloat(value) : value,
    })
  }

  // Guardar producto (nuevo o editado)
  const manejarGuardar = async (e) => {
    e.preventDefault()

    try {
      if (modoEdicion) {
        await actualizarProducto(formulario)
      } else {
        await agregarProducto(formulario)
      }
      onGuardar()
    } catch (error) {
      console.error("Error al guardar producto:", error)
    }
  }

  return (
    <div className="dashboard-dialogo">
      <div className="dashboard-dialogo-contenido">
        <div className="dashboard-dialogo-encabezado">
          <h2 className="dashboard-dialogo-titulo">{modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
          <p className="dashboard-dialogo-descripcion">{TEXTOS.MSG_COMPLETAR_PRODUCTOS}</p>
        </div>

        <div className="dashboard-dialogo-cuerpo">
          <form onSubmit={manejarGuardar} className="dashboard-formulario">
            <div className="dashboard-formulario-grupo">
              <label htmlFor="nombre" className="login-etiqueta">
                {TEXTOS.LABEL_NOMBRE}
              </label>
              <input
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Nombre del producto"
                className="login-input"
                required
              />
            </div>

            <div className="dashboard-formulario-grupo">
              <label htmlFor="descripcion" className="login-etiqueta">
                {TEXTOS.LABEL_DESCRIPCION}
              </label>
              <input
                id="descripcion"
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                placeholder="Descripción del producto"
                className="login-input"
              />
            </div>

            <div className="dashboard-formulario-fila">
              <div className="dashboard-formulario-grupo">
                <label htmlFor="cantidad" className="login-etiqueta">
                  {TEXTOS.LABEL_CANTIDAD}
                </label>
                <input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min="0"
                  value={formulario.cantidad}
                  onChange={manejarCambio}
                  className="login-input"
                  required
                />
              </div>

              <div className="dashboard-formulario-grupo">
                <label htmlFor="precio" className="login-etiqueta">
                  {TEXTOS.LABEL_CANTIDAD} (€)
                </label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  className="login-input"
                  required
                />
              </div>
            </div>

            <div className="dashboard-dialogo-pie">
              <button type="button" className="boton boton-secundario" onClick={onCancelar}>
                {TEXTOS.BTN_CANCELAR}
              </button>
              <button type="submit" className="boton boton-primario">
                {modoEdicion ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
