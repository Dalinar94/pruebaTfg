"use client"

import { useState, useEffect } from "react"
import PaginaBase from "@/components/pagina-base"
import { obtenerClientes, agregarCliente } from "@/app/acciones"
import "../../styles/clientes.css"

export default function PaginaClientes() {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

  // Cargar clientes al iniciar
  useEffect(() => {
    cargarClientes()
  }, [])

  // Función para cargar clientes
  const cargarClientes = async () => {
    try {
      setCargando(true)
      const datos = await obtenerClientes()
      setClientes(datos)
    } catch (error) {
      console.error("Error al cargar clientes:", error)
    } finally {
      setCargando(false)
    }
  }

  // Filtrar clientes según la búsqueda
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busqueda.toLowerCase()),
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
      setError("El nombre del cliente es obligatorio")
      return
    }

    try {
      setEnviando(true)

      const resultado = await agregarCliente(formulario)

      if (resultado.exito) {
        // Limpiar formulario y recargar clientes
        setFormulario({
          nombre: "",
          telefono: "",
          email: "",
          direccion: "",
        })
        setMostrarFormulario(false)
        cargarClientes()
      } else {
        setError(resultado.mensaje || "Error al agregar cliente")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Error al procesar la solicitud")
    } finally {
      setEnviando(false)
    }
  }

  // Ver detalles de un cliente
  const verDetallesCliente = (cliente) => {
    setClienteSeleccionado(cliente === clienteSeleccionado ? null : cliente)
  }

  // Formatear fecha
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES")
  }

  return (
    <PaginaBase titulo="Gestión de Clientes">
      {/* Controles */}
      <div className="clientes-controles">
        <div className="clientes-busqueda">
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="login-input"
          />
        </div>
        <button className="boton boton-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? "Cancelar" : "Nuevo Cliente"}
        </button>
      </div>

      {/* Formulario para agregar cliente */}
      {mostrarFormulario && (
        <div className="clientes-formulario-contenedor">
          <h3>Agregar Nuevo Cliente</h3>
          <form onSubmit={manejarEnvio} className="clientes-formulario">
            <div className="clientes-formulario-grupo">
              <label htmlFor="nombre">Nombre Completo *</label>
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

            <div className="clientes-formulario-fila">
              <div className="clientes-formulario-grupo">
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

              <div className="clientes-formulario-grupo">
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
            </div>

            <div className="clientes-formulario-grupo">
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

            {error && <p className="texto-error">{error}</p>}

            <div className="clientes-formulario-acciones">
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
                {enviando ? "Guardando..." : "Guardar Cliente"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de clientes */}
      <div className="clientes-lista">
        {cargando ? (
          <div className="clientes-cargando">Cargando clientes...</div>
        ) : clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <div key={cliente.id} className="cliente-tarjeta">
              <div className="cliente-tarjeta-encabezado" onClick={() => verDetallesCliente(cliente)}>
                <h3 className="cliente-tarjeta-nombre">{cliente.nombre}</h3>
                <div className="cliente-tarjeta-fecha">Cliente desde: {formatearFecha(cliente.fechaRegistro)}</div>
                <button className="cliente-tarjeta-toggle">{clienteSeleccionado === cliente ? "▲" : "▼"}</button>
              </div>

              <div className={`cliente-tarjeta-contenido ${clienteSeleccionado === cliente ? "expandido" : ""}`}>
                <div className="cliente-tarjeta-info">
                  <p>
                    <strong>Teléfono:</strong> {cliente.telefono}
                  </p>
                  <p>
                    <strong>Email:</strong> {cliente.email}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {cliente.direccion}
                  </p>
                </div>

                <div className="cliente-tarjeta-compras">
                  <h4>Historial de Compras:</h4>
                  {cliente.compras.length > 0 ? (
                    <table className="cliente-compras-tabla">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cliente.compras.map((compra, index) => (
                          <tr key={index}>
                            <td>{formatearFecha(compra.fecha)}</td>
                            <td>{compra.producto}</td>
                            <td>{compra.cantidad}</td>
                            <td>{compra.total.toFixed(2)} €</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="cliente-compras-total-label">
                            Total Gastado:
                          </td>
                          <td className="cliente-compras-total-valor">
                            {cliente.compras.reduce((sum, compra) => sum + compra.total, 0).toFixed(2)} €
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  ) : (
                    <p className="cliente-sin-compras">No hay compras registradas</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="clientes-sin-resultados">
            {busqueda ? "No se encontraron clientes que coincidan con la búsqueda" : "No hay clientes registrados"}
          </div>
        )}
      </div>
    </PaginaBase>
  )
}
