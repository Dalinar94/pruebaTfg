"use client"

import { useState } from "react"
import "../../styles/soporte.css"

export default function FormularioSoporte() {
  const [formulario, setFormulario] = useState({
    asunto: "",
    mensaje: "",
    tipoConsulta: "general",
  })
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    setEnviando(true)

    // Simulamos el envío con un timeout
    setTimeout(() => {
      setEnviando(false)
      setEnviado(true)

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setEnviado(false)
        setFormulario({
          asunto: "",
          mensaje: "",
          tipoConsulta: "general",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="soporte-contenedor">
      <div className="soporte-info">
        <h2>Centro de Soporte</h2>
        <p>
          Utilice este formulario para enviar sus consultas, reportar problemas o solicitar asistencia técnica. Nuestro
          equipo de soporte le responderá a la brevedad.
        </p>

        <div className="soporte-contacto">
          <h3>Información de contacto</h3>
          <p>
            <strong>Teléfono:</strong> 900 123 456 (Lunes a Viernes, 9:00 - 18:00)
          </p>
          <p>
            <strong>Email:</strong> soporte@farmacialocal.com
          </p>
        </div>
      </div>

      <div className="soporte-formulario-contenedor">
        {enviado ? (
          <div className="soporte-exito">
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>Gracias por contactarnos. Responderemos a su consulta lo antes posible.</p>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="soporte-formulario">
            <div className="soporte-campo">
              <label htmlFor="asunto">Asunto</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formulario.asunto}
                onChange={manejarCambio}
                className="soporte-input"
                required
                disabled={enviando}
              />
            </div>

            <div className="soporte-campo">
              <label htmlFor="tipoConsulta">Tipo de consulta</label>
              <select
                id="tipoConsulta"
                name="tipoConsulta"
                value={formulario.tipoConsulta}
                onChange={manejarCambio}
                className="soporte-input"
                required
                disabled={enviando}
              >
                <option value="general">Consulta general</option>
                <option value="problema">Reporte de problema</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="tecnico">Soporte técnico</option>
              </select>
            </div>

            <div className="soporte-campo">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formulario.mensaje}
                onChange={manejarCambio}
                className="soporte-textarea"
                rows="6"
                required
                disabled={enviando}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`soporte-boton ${enviando ? "soporte-boton-enviando" : ""}`}
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
