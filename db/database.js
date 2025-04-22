// Importa el paquete mysql2
const mysql = require('mysql2');

// Configura la conexión a tu base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',    // Si usas MySQL en tu máquina local
  user: 'root',   // El usuario que usas en MySQL Workbench
  password: '1234', // La contraseña de MySQL
  database: 'farmastock', // El nombre de tu base de datos
  port: 3306 // Especifica el puerto si no es el predeterminado
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión a MySQL establecida con éxito!');
});

// Realiza una consulta a la base de datos
connection.query('SELECT * FROM proveedores', (err, results) => {
  if (err) {
    console.error('Error al realizar la consulta: ' + err.stack);
    return;
  }
  console.log('Resultados:', results);
});

// Cierra la conexión
connection.end();
