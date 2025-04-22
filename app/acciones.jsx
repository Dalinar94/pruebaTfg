"use client"

// Datos simulados en memoria
const usuarios = [{ id: 1, nombre: "Usuario", apellido: "Predeterminado", usuario: "user", contrasena: "1234" }]

let productos = [
  { id: 1, nombre: "Paracetamol", descripcion: "Analgésico y antipirético", cantidad: 100, precio: 5.99 },
  { id: 2, nombre: "Ibuprofeno", descripcion: "Antiinflamatorio no esteroideo", cantidad: 80, precio: 7.5 },
  { id: 3, nombre: "Amoxicilina", descripcion: "Antibiótico", cantidad: 50, precio: 12.75 },
  { id: 4, nombre: "Omeprazol", descripcion: "Inhibidor de la bomba de protones", cantidad: 65, precio: 8.25 },
  { id: 5, nombre: "Loratadina", descripcion: "Antihistamínico", cantidad: 45, precio: 6.8 },
]

// Datos simulados para proveedores
const proveedores = [
  {
    id: 1,
    nombre: "Farmacéutica Quart de Poblet",
    contacto: "Francisco Davó",
    telefono: "687591208",
    email: "frandavowork@farma.com",
    direccion: "Calle Principal 123, Valencia",
    productos: ["Paracetamol", "Ibuprofeno", "Omeprazol"],
  },
  {
    id: 2,
    nombre: "Laboratorios MediSalud",
    contacto: "Carlos Rodríguez",
    telefono: "934567890",
    email: "ventas@medisalud.com",
    direccion: "Avenida Central 45, Barcelona",
    productos: ["Amoxicilina", "Loratadina"],
  },
  {
    id: 3,
    nombre: "Distribuidora Farmacéutica",
    contacto: "Ana Martínez",
    telefono: "956789012",
    email: "pedidos@distrifarm.com",
    direccion: "Plaza Mayor 8, Valencia",
    productos: ["Paracetamol", "Loratadina"],
  },
  {
    id: 4,
    nombre: "Importaciones Médicas",
    contacto: "Javier Sánchez",
    telefono: "978901234",
    email: "info@importmed.com",
    direccion: "Calle Comercio 56, Sevilla",
    productos: ["Ibuprofeno", "Amoxicilina"],
  },
]

// Datos simulados para clientes
const clientes = [
  {
    id: 1,
    nombre: "Juan Pérez",
    telefono: "611234567",
    email: "juan.perez@email.com",
    direccion: "Calle Roble 23, Madrid",
    fechaRegistro: "2023-01-15",
    compras: [
      { fecha: "2023-05-10", producto: "Paracetamol", cantidad: 2, total: 11.98 },
      { fecha: "2023-06-22", producto: "Ibuprofeno", cantidad: 1, total: 7.5 },
    ],
  },
  {
    id: 2,
    nombre: "María García",
    telefono: "622345678",
    email: "maria.garcia@email.com",
    direccion: "Avenida Pino 45, Barcelona",
    fechaRegistro: "2023-02-20",
    compras: [
      { fecha: "2023-04-05", producto: "Amoxicilina", cantidad: 1, total: 12.75 },
      { fecha: "2023-07-15", producto: "Loratadina", cantidad: 2, total: 13.6 },
    ],
  },
  {
    id: 3,
    nombre: "Pedro Martínez",
    telefono: "633456789",
    email: "pedro.martinez@email.com",
    direccion: "Plaza Central 8, Valencia",
    fechaRegistro: "2023-03-10",
    compras: [{ fecha: "2023-05-18", producto: "Omeprazol", cantidad: 1, total: 8.25 }],
  },
  {
    id: 4,
    nombre: "Laura Sánchez",
    telefono: "644567890",
    email: "laura.sanchez@email.com",
    direccion: "Calle Mayor 12, Sevilla",
    fechaRegistro: "2023-04-05",
    compras: [
      { fecha: "2023-06-10", producto: "Paracetamol", cantidad: 3, total: 17.97 },
      { fecha: "2023-07-22", producto: "Amoxicilina", cantidad: 1, total: 12.75 },
      { fecha: "2023-08-15", producto: "Ibuprofeno", cantidad: 2, total: 15.0 },
    ],
  },
]

// Contador para generar IDs únicos
let nextId = 6
let nextProveedorId = 5
let nextClienteId = 5

/**
 * Verifica las credenciales de inicio de sesión
 * @param {string} usuario - Nombre de usuario
 * @param {string} contrasena - Contraseña del usuario
 * @returns {Object} Resultado de la verificación
 */
export async function verificarCredenciales(usuario, contrasena) {
  try {
    // Buscar usuario en el array de usuarios
    const usuarioEncontrado = usuarios.find((u) => u.usuario === usuario && u.contrasena === contrasena)

    if (usuarioEncontrado) {
      return { exito: true, mensaje: "Inicio de sesión exitoso" }
    } else {
      return { exito: false, mensaje: "Credenciales incorrectas" }
    }
  } catch (error) {
    console.error("Error al verificar credenciales:", error)
    return { exito: false, mensaje: "Error al iniciar sesión" }
  }
}

/**
 * Registra un nuevo usuario en el sistema
 * @param {string} nombre - Nombre del usuario
 * @param {string} apellido - Apellido del usuario
 * @param {string} usuario - Nombre de usuario para iniciar sesión
 * @param {string} contrasena - Contraseña del usuario
 * @returns {Object} Resultado del registro
 */
export async function registrarUsuario(nombre, apellido, usuario, contrasena) {
  try {
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

    // Agregar a la lista de usuarios
    usuarios.push(nuevoUsuario)

    return { exito: true, mensaje: "Usuario registrado correctamente" }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return { exito: false, mensaje: "Error al registrar usuario" }
  }
}

/**
 * Obtiene todos los productos del inventario
 * @returns {Array} Lista de productos
 */
export async function obtenerProductos() {
  try {
    // Simular un pequeño retraso para emular la consulta a la base de datos
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...productos]
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}

/**
 * Agrega un nuevo producto al inventario
 * @param {Object} producto - Datos del producto a agregar
 * @returns {Object} Resultado de la operación
 */
export async function agregarProducto(producto) {
  try {
    // Crear nuevo producto con ID único
    const nuevoProducto = {
      id: nextId++,
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      cantidad: producto.cantidad,
      precio: producto.precio,
    }

    // Agregar a la lista de productos
    productos.push(nuevoProducto)

    // Simular un pequeño retraso para emular la escritura en la base de datos
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      exito: true,
      producto: nuevoProducto,
    }
  } catch (error) {
    console.error("Error al agregar producto:", error)
    return { exito: false, mensaje: "Error al agregar producto" }
  }
}

/**
 * Actualiza un producto existente en el inventario
 * @param {Object} producto - Datos actualizados del producto
 * @returns {Object} Resultado de la operación
 */
export async function actualizarProducto(producto) {
  try {
    // Buscar índice del producto
    const index = productos.findIndex((p) => p.id === producto.id)

    if (index === -1) {
      return { exito: false, mensaje: "Producto no encontrado" }
    }

    // Actualizar producto
    productos[index] = {
      ...productos[index],
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      cantidad: producto.cantidad,
      precio: producto.precio,
    }

    // Simular un pequeño retraso para emular la escritura en la base de datos
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { exito: true, producto: productos[index] }
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return { exito: false, mensaje: "Error al actualizar producto" }
  }
}

/**
 * Elimina un producto del inventario
 * @param {number} id - ID del producto a eliminar
 * @returns {Object} Resultado de la operación
 */
export async function eliminarProducto(id) {
  try {
    // Filtrar productos para eliminar el que coincide con el ID
    const productosActualizados = productos.filter((p) => p.id !== id)

    // Verificar si se eliminó algún producto
    if (productosActualizados.length === productos.length) {
      return { exito: false, mensaje: "Producto no encontrado" }
    }

    // Actualizar lista de productos
    productos = productosActualizados

    // Simular un pequeño retraso para emular la escritura en la base de datos
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { exito: true, mensaje: "Producto eliminado correctamente" }
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return { exito: false, mensaje: "Error al eliminar producto" }
  }
}

/**
 * Obtiene todos los proveedores
 * @returns {Array} Lista de proveedores
 */
export async function obtenerProveedores() {
  try {
    // Simular un pequeño retraso para emular la consulta a la base de datos
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...proveedores]
  } catch (error) {
    console.error("Error al obtener proveedores:", error)
    return []
  }
}

/**
 * Agrega un nuevo proveedor
 * @param {Object} proveedor - Datos del proveedor a agregar
 * @returns {Object} Resultado de la operación
 */
export async function agregarProveedor(proveedor) {
  try {
    // Crear nuevo proveedor con ID único
    const nuevoProveedor = {
      id: nextProveedorId++,
      nombre: proveedor.nombre,
      contacto: proveedor.contacto || "",
      telefono: proveedor.telefono || "",
      email: proveedor.email || "",
      direccion: proveedor.direccion || "",
      productos: proveedor.productos || [],
    }

    // Agregar a la lista de proveedores
    proveedores.push(nuevoProveedor)

    // Simular un pequeño retraso para emular la escritura en la base de datos
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      exito: true,
      proveedor: nuevoProveedor,
    }
  } catch (error) {
    console.error("Error al agregar proveedor:", error)
    return { exito: false, mensaje: "Error al agregar proveedor" }
  }
}

/**
 * Obtiene todos los clientes
 * @returns {Array} Lista de clientes
 */
export async function obtenerClientes() {
  try {
    // Simular un pequeño retraso para emular la consulta a la base de datos
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...clientes]
  } catch (error) {
    console.error("Error al obtener clientes:", error)
    return []
  }
}

/**
 * Agrega un nuevo cliente
 * @param {Object} cliente - Datos del cliente a agregar
 * @returns {Object} Resultado de la operación
 */
export async function agregarCliente(cliente) {
  try {
    // Obtener fecha actual para el registro
    const fechaActual = new Date().toISOString().split("T")[0]

    // Crear nuevo cliente con ID único
    const nuevoCliente = {
      id: nextClienteId++,
      nombre: cliente.nombre,
      telefono: cliente.telefono || "",
      email: cliente.email || "",
      direccion: cliente.direccion || "",
      fechaRegistro: fechaActual,
      compras: [],
    }

    // Agregar a la lista de clientes
    clientes.push(nuevoCliente)

    // Simular un pequeño retraso para emular la escritura en la base de datos
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      exito: true,
      cliente: nuevoCliente,
    }
  } catch (error) {
    console.error("Error al agregar cliente:", error)
    return { exito: false, mensaje: "Error al agregar cliente" }
  }
}
