"use client"

import "../styles/navegacion.css"

export default function BarraNavegacion({ onCerrarSesion }) {
  return (
    <header className="navegacion">
      <div className="contenedor navegacion-contenedor">
        <div className="navegacion-logo">
          <span className="navegacion-icono">💊</span>
          <span className="navegacion-titulo">Farmacia Local</span>
        </div>

        <nav className="navegacion-menu">
          <button className="navegacion-boton" onClick={onCerrarSesion}>
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  )
}
