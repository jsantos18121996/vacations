const express = require('express');
const cursosRoutes = require('./routes/cursosRoutes');

const { dbConnection } = require('./database/database');//importar de esta manera

const app = express();

//abro conexion a bd antes de llamar a las rutas
dbConnection();

app.use('/api/courses', cursosRoutes);

module.exports = app;