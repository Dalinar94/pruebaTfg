"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { verificarCredenciales } from "@/app/acciones"
import "../styles/login.css"
import {TEXTOS} from "@/lib/constantes"

export default function FormularioLogin() {
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Función para manejar el inicio de sesión
  const manejarInicioSesion = async (e) => {
    e.preventDefault()

    try {
      const resultado = await verificarCredenciales(usuario, contrasena)

      if (resultado.exito) {
        // Redirigir al dashboard si las credenciales son correctas
        router.push("/dashboard")
      } else {
        setError("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      setError("Error al iniciar sesión")
    }
  }
 /*EJEMPLO EXPLICACION PROFESORADO: TEXTOS.NOMBRE_EMPRESA 
  *Sirve para llamar a una variable TEXTOS que esta en la carpeta lib en la clase 
   de js constantes.js, donde ahi pongo "constantes que son variables fijas", cuyo
   objetivo es evitar redundancias en los textos, que en mi app se van a repetir mas 
   a menudo.
  */
return (
    <div className="login-tarjeta">
      <div className="login-encabezado">
        <h1 className="login-titulo">{TEXTOS.NOMBRE_EMPRESA}</h1>
        <p className="login-descripcion">{TEXTOS.MSG_LOGIN}</p>
      </div>
      <div className="login-contenido">
        <form onSubmit={manejarInicioSesion} className="login-formulario">
          <div className="login-grupo">
            <label htmlFor="usuario" className="login-etiqueta">
              {TEXTOS.LABEL_USUARIO}
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="login-grupo">
            <label htmlFor="contrasena" className="login-etiqueta">
              {TEXTOS.LABEL_CONTRASENA}
            </label>
            <input
              id="contrasena"
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="login-input"
            />
          </div>
          {error && <p className="texto-error">{error}</p>}
          <button type="submit" className="boton boton-primario">
            {TEXTOS.BTN_INICIAR_SESION}
          </button>
        </form>
      </div>
      <div className="login-pie">
        <p>
          {TEXTOS.PREGUNTA_NUEVA_CUENTA}{" "}
          <Link href="/registro" className="login-enlace">
            {TEXTOS.BTN_REGISTRARSE}
          </Link>
        </p>
      </div>
    </div>
  )
}
