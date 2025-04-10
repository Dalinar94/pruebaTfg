"use server"

// Simulación de base de datos en memoria
// En una aplicación real, aquí se conectaría a una base de datos
const usuarios = [{ id: 1, nombre: "Usuario", apellido: "Predeterminado", usuario: "user", contrasena: "1234" }]

let productos = [
  { id: 1, nombre: "Paracetamol", descripcion: "Analgésico y antipirético", cantidad: 100, precio: 5.99 },
  { id: 2, nombre: "Ibuprofeno", descripcion: "Antiinflamatorio no esteroideo", cantidad: 80, precio: 7.5 },
  { id: 3, nombre: "Amoxicilina", descripcion: "Antibiótico", cantidad: 50, precio: 12.75 },
  { id: 4, nombre: "Omeprazol", descripcion: "Inhibidor de la bomba de protones", cantidad: 65, precio: 8.25 },
  { id: 5, nombre: "Loratadina", descripcion: "Antihistamínico", cantidad: 45, precio: 6.8 },
]

// Función para verificar credenciales de inicio de sesión
export async function verificarCredenciales(usuario, contrasena) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Buscar usuario en la "base de datos"
  const usuarioEncontrado = usuarios.find((u) => u.usuario === usuario && u.contrasena === contrasena)

  if (usuarioEncontrado) {
    return { exito: true, mensaje: "Inicio de sesión exitoso" }
  } else {
    return { exito: false, mensaje: "Credenciales incorrectas" }
  }
}

// Función para registrar un nuevo usuario
export async function registrarUsuario(nombre, apellido, usuario, contrasena) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Verificar si el usuario ya existe
  const usuarioExistente = usuarios.find((u) => u.usuario === usuario)

  if (usuarioExistente) {
    return { exito: false, mensaje: "El nombre de usuario ya está en uso" }
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    apellido,
    usuario,
    contrasena,
  }

  // Agregar a la "base de datos"
  usuarios.push(nuevoUsuario)

  return { exito: true, mensaje: "Usuario registrado correctamente" }
}

// Función para obtener todos los productos
export async function obtenerProductos() {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [...productos]
}

// Función para agregar un nuevo producto
export async function agregarProducto(producto) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const nuevoProducto = {
    id: productos.length + 1,
    ...producto,
  }

  productos.push(nuevoProducto)

  return { exito: true, producto: nuevoProducto }
}

// Función para actualizar un producto existente
export async function actualizarProducto(producto) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const indice = productos.findIndex((p) => p.id === producto.id)

  if (indice === -1) {
    return { exito: false, mensaje: "Producto no encontrado" }
  }

  productos[indice] = { ...productos[indice], ...producto }

  return { exito: true, producto: productos[indice] }
}

// Función para eliminar un producto
export async function eliminarProducto(id) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const indiceInicial = productos.length
  productos = productos.filter((p) => p.id !== id)

  if (productos.length === indiceInicial) {
    return { exito: false, mensaje: "Producto no encontrado" }
  }

  return { exito: true, mensaje: "Producto eliminado correctamente" }
}
