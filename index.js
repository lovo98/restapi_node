const express = require('express');
const routers = require('./routers')
const sequelize = require('./db/index');
const Usuario = require('./models/User');
const bodyParse = require('body-parser')

const app = express();
app.use('/', routers())
app.use(bodyParse.json)
app.use(bodyParse.urlencoded({extends: true}))

// Sincroniza todos los modelos definidos con la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });

app.listen(5001);