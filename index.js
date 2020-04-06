const express = require('express');
const server = express();

server.use(express.json());

let users = [
    {
        id: 1, 
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane"
    },
    {
        id: 2,
        name: "Cheburashka",
        bio: "Was found in oranges"
    },
    {
        id: 3,
        name: "Baba Yaga",
        bio: "Lives in a chicken-leg house in the middle of the forest"
    }
]

server.get('/', (req, res) => {
    res.json({api: 'running.....'});
});

server.get('/api/users', (req, res) => {
    res.json(users);
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    users.push(userInfo);
    res.status(201).json(users);
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id == userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found"});
    }
});

server.delete('/api/users/:id', (req, res) => {
    const reqId = req.params.id;
    let user = users.filter(user => {
        return user.id == reqId;
    })[0];
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json(users);
});

const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));