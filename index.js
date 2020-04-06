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
    if (users) {
        res.json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

server.post('/api/users', (req, res) => {
    const body = req.body;

    if (!body.name || !body.bio) {
		res
			.status(400).json({ errorMessage: "Please provide name and bio for the user." });
	} else {
        users.push(body);
        const newUser = users.find((user) => user.id == body.id);
		if (newUser) {
            res.status(201).json(users);
        } else {
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
        }
    }
});

server.get('/api/users/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const user = users.find((user) => user.id == userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        } 
    } catch (err) {
		res.status(500).json({ errorMessage: "The user information could not be retrieved." });
	}
    
});

server.delete('/api/users/:id', (req, res) => {
    const reqId = req.params.id;
    let user = users.filter(user => {
        return user.id == reqId;
    })[0];
    if (user) {
        const index = users.indexOf(user);
        users.splice(index, 1);
        const deletedUser = users.find((user) => user.id === req.params.id);
        if (deletedUser) {
            res.status(500).json({ errorMessage: "The user could not be removed." });
        } else {
            res.json(users);
        }
	} else {
		res.status(404).json({ message: "The user with the specified ID does not exist." });
	}
});

server.put("/api/users/:id", (req, res) => {
	const body = req.body;
	const id = req.params.id;

	if (!body.name || !body.bio) {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
	} else {
		const user = users.find((user) => user.id == id);
		if (user) {
			users = users.map((user) => {
				return user.id == id ? { ...body, id } : user;
			});
			const newUser = users.find((user) => user.id == id);
			if (newUser) {
                res.json(users);
            } else {
                res.status(500).json({ errorMessage: "The information could not be modified." });
            }	 
		} else {
			res.status(404).json({ message: "The user with the specified ID does not exist." });
		}
	}
});

const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));