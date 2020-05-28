const express = require('express');
const bodyParse = require('body-parser');

const usersRoutes = require('./routes/usersRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const projectRoutes = require('./routes/projectsRoutes');
const tagsRoutes = require('./routes/tagsRoutes');
const tasksTaggedRoutes = require('./routes/tasksTaggedRoutes');

const db = require('./config/database');

// DB Authentication
db.authenticate()
    .then(() => console.log('DB Connected'))
    .catch(error => console.log(error));

const app = express();


app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha;
    return next();
});

app.use(bodyParse.urlencoded({ extended: true }));

// Preventing CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Routes
app.use('/users', usersRoutes());
app.use('/tasks', tasksRoutes());
app.use('/projects', projectRoutes());
app.use('/tags', tagsRoutes());
app.use('/tasksTagged', tasksTaggedRoutes());

module.exports = app;