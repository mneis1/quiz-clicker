const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;
const users = require('./route/api/users');
const quizzes = require('./route/api/quiz');
const courses = require('./route/api/courses');
const register = require('./route/api/register');

app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/quiz', quizzes);
app.use('/api/courses', courses);
app.use('/api/register', register);


mongoose.connect(db)
    .then(
        () => console.log("Connected to mongodb")
    )
    .catch(
        () => console.log("An error occured connecting to mongodb")
    );

app.listen(port, () => console.log(`Server started on port ${port}`));
