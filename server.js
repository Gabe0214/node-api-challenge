const express = require('express');
const helmet = require('helmet');

const projectRoutes = require('./data/routes/projectRoutes')

const server = express();

server.use(express.json())


server.use('/api/project', projectRoutes);

server.use(helmet());




server.get('/', (req, res) => {
    res.send('hello')
})



module.exports = server; 