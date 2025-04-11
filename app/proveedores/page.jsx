"use client"

import { useState, useEffect } from "react"
import PaginaBase from "@/components/pagina-base"
import { obtenerProveedores, agregarProveedor } from "@/app/acciones"
import "../../styles/proveedores.css"

export default function PaginaProveedores() {
  const [proveedores, setProveedores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [formulario, setFormulario] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
    productos: "",
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

  // Cargar proveedores al iniciar
  useEffect(() => {
    cargarProveedores()
  }, [])

  // Función para cargar proveedores
  const cargarProveedores = async () => {
    try {
      setCargando(true)
      const datos = await obtenerProveedores()
      setProveedores(datos)
    } catch (error) {
      console.error("Error al cargar proveedores:", error)
    } finally {
      setCargando(false)
    }
  }

  // Filtrar proveedores según la búsqueda
  const proveedoresFiltrados = proveedores.filter(
    (proveedor) =>
      proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      proveedor.contacto.toLowerCase().includes(busqueda.toLowerCase()) ||
      proveedor.productos.some((p) => p.toLowerCase().includes(busqueda.toLowerCase())),
  )

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  // Manejar envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!formulario.nombre.trim()) {
      setError("El nombre del proveedor es obligatorio")
      return
    }

    try {
      setEnviando(true)

      // Convertir string de productos a array
      const productosArray = formulario.productos
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")

      const resultado = await agregarProveedor({
        ...formulario,
        productos: productosArray,
      })

      if (resultado.exito) {
        // Limpiar formulario y recargar proveedores
        setFormulario({
          nombre: "",
          contacto: "",
          telefono: "",
          email: "",
          direccion: "",
          productos: "",
        })
        setMostrarFormulario(false)
        cargarProveedores()
      } else {
        setError(resultado.mensaje || "Error al agregar proveedor")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Error al procesar la solicitud")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PaginaBase titulo="Gestión de Proveedores">
      {/* Controles */}
      <div className="proveedores-controles">
        <div className="proveedores-busqueda">
          <input
            type="text"
            placeholder="Buscar proveedores..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="login-input"
          />
        </div>
        <button className="boton boton-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? "Cancelar" : "Nuevo Proveedor"}
        </button>
      </div>

      {/* Formulario para agregar proveedor */}
      {mostrarFormulario && (
        <div className="proveedores-formulario-contenedor">
          <h3>Agregar Nuevo Proveedor</h3>
          <form onSubmit={manejarEnvio} className="proveedores-formulario">
            <div className="proveedores-formulario-grupo">
              <label htmlFor="nombre">Nombre de la Empresa *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                className="login-input"
                required
                disabled={enviando}
              />
            </div>

            <div className="proveedores-formulario-fila">
              <div className="proveedores-formulario-grupo">
                <label htmlFor="contacto">Persona de Contacto</label>
                <input
                  type="text"
                  id="contacto"
                  name="contacto"
                  value={formulario.contacto}
                  onChange={manejarCambio}
                  className="login-input"
                  disabled={enviando}
                />
              </div>

              <div className="proveedores-formulario-grupo">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={manejarCambio}
                  className="login-input"
                  disabled={enviando}
                />
              </div>
            </div>

            <div className="proveedores-formulario-grupo">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formulario.email}
                onChange={manejarCambio}
                className="login-input"
                disabled={enviando}
              />
            </div>

            <div className="proveedores-formulario-grupo">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formulario.direccion}
                onChange={manejarCambio}
                className="login-input"
                disabled={enviando}
              />
            </div>

            <div className="proveedores-formulario-grupo">
              <label htmlFor="productos">Productos (separados por comas)</label>
              <input
                type="text"
                id="productos"
                name="productos"
                value={formulario.productos}
                onChange={manejarCambio}
                className="login-input"
                placeholder="Ej: Paracetamol, Ibuprofeno, Amoxicilina"
                disabled={enviando}
              />
            </div>

            {error && <p className="texto-error">{error}</p>}

            <div className="proveedores-formulario-acciones">
              <button
                type="button"
                className="boton boton-secundario"
                onClick={() => setMostrarFormulario(false)}
                disabled={enviando}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`boton boton-primario ${enviando ? "boton-enviando" : ""}`}
                disabled={enviando}
              >
                {enviando ? "Guardando..." : "Guardar Proveedor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de proveedores */}
      <div className="proveedores-lista">
        {cargando ? (
          <div className="proveedores-cargando">Cargando proveedores...</div>
        ) : proveedoresFiltrados.length > 0 ? (
          proveedoresFiltrados.map((proveedor) => (
            <div key={proveedor.id} className="proveedor-tarjeta">
              <div className="proveedor-tarjeta-encabezado">
                <h3 className="proveedor-tarjeta-nombre">{proveedor.nombre}</h3>
              </div>

              <div className="proveedor-tarjeta-contenido">
                <div className="proveedor-tarjeta-info">
                  <p>
                    <strong>Contacto:</strong> {proveedor.contacto}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {proveedor.telefono}
                  </p>
                  <p>
                    <strong>Email:</strong> {proveedor.email}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {proveedor.direccion}
                  </p>
                </div>

                <div className="proveedor-tarjeta-productos">
                  <h4>Productos suministrados:</h4>
                  <ul>
                    {proveedor.productos.map((producto, index) => (
                      <li key={index}>{producto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="proveedores-sin-resultados">
            {busqueda
              ? "No se encontraron proveedores que coincidan con la búsqueda"
              : "No hay proveedores registrados"}
          </div>
        )}
      </div>
    </PaginaBase>
  )
}
