"use client"

import "../styles/navegacion.css"

export default function BarraNavegacion({ onCerrarSesion }) {
  return (
    <header className="navegacion">
      <div className="contenedor navegacion-contenedor">
        <div className="navegacion-logo">
          <span className="navegacion-icono">💊</span>
          <span className="navegacion-titulo">FarmaStock FDC </span>
        </div>
        <div className="navegacion-menu">
          <a href="/stock" className="navegacion-enlace">Stock</a>
          <a href="/productos" className="navegacion-enlace">Productos</a>
          <a href="/proveedores" className="navegacion-enlace">Proveedores</a>
          <a href="/clientes" className="navegacion-enlace">Clientes</a>
          <a href="/soporte" className="navegacion-enlace">Soporte</a>
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
