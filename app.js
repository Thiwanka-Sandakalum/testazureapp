const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // Corrected the process.env.PORT
const cors = require('cors');
app.use(cors());

const {
    createStudent,
    createCourse,
    getAllStudents,
    updateStudent,
    deleteStudent,
} = require('./service');

app.use(express.json()); // Enable JSON request body parsing

app.get('/', (req, res) => {
    console.log('Request is received');
    res.send('Welcome to my Azure WebApp');
});

// Create a new student
app.post('/', (req, res) => {
    const { name, age } = req.body;
     res.json({name,age});
});

app.post('/students', (req, res) => {
    const { name, age } = req.body;
    createStudent(name, age);
    res.send('Student created successfully!');
});

// Create a new course
app.post('/courses', (req, res) => {
    const { title } = req.body;
    createCourse(title);
    res.send('Course created successfully!');
});

// Get all students
app.get('/students', (req, res) => {
    getAllStudents()
        .then((students) => res.json(students))
        .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

// Update student by ID
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    updateStudent(id, name, age)
        .then(() => res.send('Student updated successfully!'))
        .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

// Delete student by ID
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    deleteStudent(id)
        .then(() => res.send('Student deleted successfully!'))
        .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

app.listen(port, () => {
    console.log(`Server starting on port ${port}`);
});

module.exports = app;
