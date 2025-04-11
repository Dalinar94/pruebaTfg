"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { registrarUsuario } from "@/app/acciones"
import "../styles/registro.css"

export default function FormularioRegistro() {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const [exito, setExito] = useState(false)
  const router = useRouter()

  // Función para manejar el registro de usuario
  const manejarRegistro = async (e) => {
    e.preventDefault()

    try {
      const resultado = await registrarUsuario(nombre, apellido, usuario, contrasena)

      if (resultado.exito) {
        setExito(true)
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        setError(resultado.mensaje || "Error al registrar usuario")
      }
    } catch (error) {
      setError("Error en el servidor")
    }
  }

  return (
    <div className="registro-tarjeta">
      <div className="registro-encabezado">
        <h1 className="registro-titulo">Registro de Trabajador</h1>
        <p className="registro-descripcion">Complete el formulario para registrarse en el sistema</p>
      </div>
      <div className="registro-contenido">
        {exito ? (
          <div className="registro-exito">¡Registro exitoso! Redirigiendo al inicio de sesión...</div>
        ) : (
          <form onSubmit={manejarRegistro} className="registro-formulario">
            <div className="registro-grupo">
              <label htmlFor="nombre" className="registro-etiqueta">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingrese su nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="registro-input"
              />
            </div>
            <div className="registro-grupo">
              <label htmlFor="apellido" className="registro-etiqueta">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="Ingrese su apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                className="registro-input"
              />
            </div>
            <div className="registro-grupo">
              <label htmlFor="usuario" className="registro-etiqueta">
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                placeholder="Elija un nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                className="registro-input"
              />
            </div>
            <div className="registro-grupo">
              <label htmlFor="contrasena" className="registro-etiqueta">
                Contraseña
              </label>
              <input
                id="contrasena"
                type="password"
                placeholder="Elija una contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className="registro-input"
              />
            </div>
            {error && <p className="texto-error">{error}</p>}
            <button type="submit" className="boton boton-primario">
              Registrarse
            </button>
          </form>
        )}
      </div>
      <div className="registro-pie">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/" className="registro-enlace">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
