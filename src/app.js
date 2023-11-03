const express = require('express');
const cursosRoutes = require('./routes/cursosRoutes');
const familiesRoutes = require('./routes/familiesRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const bingosRoutes = require('./routes/bingosRoutes');

const { dbConnection } = require('./database/database');//importar de esta manera

const app = express();

//abro conexion a bd antes de llamar a las rutas
dbConnection();

//middlewares
app.use(express.json()) //lectura y parseo del body

app.use('/api/courses', cursosRoutes);
app.use('/api/families', familiesRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/bingos', bingosRoutes);

module.exports = app;