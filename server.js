const express = require('express');
const helmet = require('helmet');

const projectRoutes = require('./data/routes/projectRoutes')
const actionRoutes = require('./data/routes/actionRoutes')
const server = express();

server.use(express.json())


server.use('/api/project', projectRoutes);
server.use('/api/action', actionRoutes)
server.use(helmet());




server.get('/', (req, res) => {
    res.send('hello')
})



module.exports = server; 