// Import express
const express = require('express');

// Import uuid to generate an id
const {uuid, isUuid} = require('uuidv4');

// Execute express
const app = express();

// User express.json to parse the request body
app.use(express.json());

// Data
const projects = [
    {
        title: 'Shell script',
        owner: "Anakin Skywalker",
    },
    {
        title: 'Apple app dev',
        owner: "José Alcides",
    }
]

// Setup a log middleware
function logRequest (req, res, next) {
    const {method, url} = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

function validateProjectId (req, res, next) {
    const {id} = req.params;

    if (!isUuid(id)) return res.status(400).json({error: 'Invalid project ID'});


    return next();
}

app.use(logRequest);

app.use('/projects/:id', validateProjectId);

// Set route "/projects" to GET requests
app.get('/projects', (req, res) => {
    const {title} = req.query;

    const results = title 
        ? projects.filter(item => item.title.includes(title)) 
        : results = projects;

    return res.json(results)
})

// Set route "/projects" to POST requests
app.post('/projects', (req, res) => {
    const {title, owner} = req.body;
    const project = {id: uuid(), title, owner};

    projects.push(project);

    return res.json(project);
})

// Set route "/projects" to PUT requests
app.put('/projects/:id', (req, res) => {
    const {id} = req.params;
    const {title, owner} = req.body;

    const projectIndex = projects.findIndex(item => item.id === id);

    if (projectIndex < 0) return res.status(404).json({error: "Project not found"});

    const project  = {id, title, owner};
    projects[projectIndex] = project;

    return res.json(project);
})

// Set route "/projects" to DELETE requests
app.delete('/projects/:id', (req, res) => {
    const {id} = req.params;
    const {title, owner} = req.body;

    const projectIndex = projects.findIndex(item => item.id === id);

    if (projectIndex < 0) return res.status(404).json({error: "Project not found"});

    projects.splice(projectIndex, 1);

    return res.status(204).send();
})

// Listen to port 3333 on localhost
app.listen(3333, (req, res) => {
    console.log('Server up');
});