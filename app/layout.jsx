import "../styles/globals.css"

export const metadata = {
  title: "Control de Stock Farmacia",
  description: "Aplicación para gestionar el inventario de una farmacia local",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
