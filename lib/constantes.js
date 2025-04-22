/**
 * Constantes de texto para toda la aplicación
 * Centraliza los textos para facilitar cambios y posible internacionalización futura
 */

export const TEXTOS = {
    // Información de la empresa
    NOMBRE_EMPRESA: "FarmaStock",
    SLOGAN: "Su salud, nuestra prioridad",
  
    // Títulos de páginas
    TITULO_LOGIN: "Acceso al Sistema",
    TITULO_REGISTRO: "Registro de Trabajador",
    TITULO_DASHBOARD: "Panel de Control",
    TITULO_STOCK: "Stock",
    TITULO_CATALOGO_PRODUCTOS: "Catalogo de Productos",
    TITULO_PRODUCTOS: "Productos",
    TITULO_PROVEEDORES: "Proveedores",
    TITULO_CLIENTES: "Clientes",
    TITULO_SOPORTE: "Soporte",
    TITULO_VENTAS_HOY: "Ventas Hoy",
    TITULO_VALOR_INVENTARIO: "Valor del Inventario",
    TITULO_STOCK_BAJO: "Stock Bajo",
    TITULO_AGREGAR_PROVEEDOR: "Agregar Nuevo Proveedor",
    TITULO_AGREGAR_CLIENTE:"Agregar Nuevo Cliente",
    TITULO_NOMBRE_EMPRESA: "Nombre de la Empresa *",
    TITULO_PRODUCTO_SUMINISTRADO: "Productos suministrados:",
    TITULO_HISTORIAL_COMPRAS: "Historial de Compras:",


    // Mensajes comunes
    MSG_BIENVENIDA: "Bienvenido al sistema de gestión",
    MSG_LOGIN: "Ingrese sus credenciales para acceder al sistema",
    MSG_REGISTRO: "Complete el formulario para registrarse en el sistema",
    MSG_REGISTRO_EXITO: "¡Registro exitoso! Redirigiendo al inicio de sesión...",
    MSG_ERROR_CREDENCIALES: "Usuario o contraseña incorrectos",
    MSG_ERROR_SERVIDOR: "Error en el servidor",
    MSG_COMPLETAR_PRODUCTOS: "Complete los detalles del producto y guarde los cambios.",
    MSG_NO_SE_ENCONTRARON_PRODUCTOS: "No se encontraron productos que coincidan con los criteriaos de búsqueda",
    MSG_NO_HAY_COMPRAS_REGISTRADAS: "No hay compras registradas",
    MSG_RECOMENDACIÓN_REABASTECIMIENTO: "Se recomienda reabastecer los siguientes productos:",

    // Botones y acciones
    BTN_INICIAR_SESION: "Iniciar Sesión",
    BTN_REGISTRARSE: "Registrarse",
    BTN_CERRAR_SESION: "Cerrar Sesión",
    BTN_GUARDAR: "Guardar",
    BTN_CANCELAR: "Cancelar",
    BTN_AGREGAR: "Agregar",
    BTN_EDITAR: "Editar",
    BTN_ELIMINAR: "Eliminar",
    BTN_AGREGAR_PRODUCTO:"Agregar Producto",
    BTN_TODOS:"Todos",
    BTN_AGOTADOS:"Agotados",
    BTN_NUEVO_PRODUCTO: "Nuevo Producto",

    //Productos
    PRO_CARGANDO_PRODUCTOS: "Cargando productos...",
    PRO_INVENTARIO_PRODUCTOS: "Inventario actual de productos",
    PRO_MENOS_30UNIDADES: "Productos con menos de 30 unidades",

    //options
    OP_TODAS_LAS_CATEGORIAS: "Todas las categorías",
    
    // Preguntas
    PREGUNTA_NUEVA_CUENTA: "¿No tienes una cuenta?",
    PREGUNTA_CUENTA_EXISTENTE: "¿Ya tienes una cuenta?",
  
    // Etiquetas de formularios
    LABEL_USUARIO: "Usuario",
    LABEL_CONTRASENA: "Contraseña",
    LABEL_NOMBRE: "Nombre",
    LABEL_APELLIDO: "Apellido",
    LABEL_EMAIL: "Email",
    LABEL_CONTACTO:"Contacto",
    LABEL_TELEFONO: "Teléfono",
    LABEL_DIRECCION: "Dirección",
    LABEL_DESCRIPCION: "Descripción",
    LABEL_CANTIDAD:"Cantidad",
    LABEL_PRECIO: "Precio",
    LABEL_ACCION: "Acciones",
    LABEL_CATEGORIA: "Categoria",
    LABEL_PRECIO: "Precio",
    LABEL_STOCK: "Stock",
    LABEL_PERSONA_CONTACTO:"Persona de Contacto",
    LABEL_NOMBRE_COMPLETO: "Nombre Completo *",
    LABEL_FECHA: "Fecha",
    LABEL_PRODUCTO: "Producto",
    LABEL_CANTIDAD: "Cantidad",
    LABEL_TOTAL:"Total",
    LABEL_TOTAL_GASTADO: "Total Gastado:",
    LABEL_VALOR: "Valor",
    LABEL_ESTADO: "Estado",


    //proveedores/clientes
    DIV_CARGANDO_PROVEEDORES: "Cargando proveedores...",
    DIV_CARGANDO_CLIENTES: "Cargando clientes...",
    DIV_CLIENTE_DESDE: "Cliente desde:",
    DIV_CARGANDO_INVENTARIO: "Cargando inventario...",


    //stock
    STOCK_TOTAL_PRODUCTOS: "Total Productos",
    
  }
  
  /**
   * Función para formatear moneda (Euro)
   * @param {number} valor - Valor a formatear
   * @returns {string} Valor formateado como moneda
   */
  export const formatearMoneda = (valor) => {
    return `${valor.toFixed(2)} €`
  }
  
  /**
   * Función para formatear fecha
   * @param {string} fechaStr - Fecha en formato string (YYYY-MM-DD)
   * @returns {string} Fecha formateada en formato local
   */
  export const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES")
  }
  