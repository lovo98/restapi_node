const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize con tus credenciales de base de datos
const sequelize = new Sequelize('restapi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // o 'postgres', 'sqlite', etc.
});

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
