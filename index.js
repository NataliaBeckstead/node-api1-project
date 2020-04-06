const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({api: 'running.....'});
});

const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));