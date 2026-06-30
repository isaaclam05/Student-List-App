const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// ==============================
// Middleware
// ==============================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// ==============================
// View Engine
// ==============================
app.set("view engine", "ejs");

// ==============================
// Database Connection
// ==============================
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL Database');
});

// ==============================
// Home Page
// ==============================
app.get('/', (req, res) => {

    const sql = 'SELECT * FROM students';

    connection.query(sql, (error, results) => {

        if (error) {
            console.error(error);
            return res.send('Error retrieving students');
        }

        res.render('index', {
            students: results
        });

    });

});

// ==============================
// Student Details
// ==============================
app.get('/student/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = 'SELECT * FROM students WHERE studentId = ?';

    connection.query(sql, [studentId], (error, results) => {

        if (error) {
            console.error(error);
            return res.send('Error retrieving student');
        }

        if (results.length > 0) {

            res.render('student', {
                student: results[0]
            });

        } else {

            res.send('Student not found');

        }

    });

});

// ==============================
// Display Add Student Page
// ==============================
app.get('/addStudent', (req, res) => {

    res.render('addStudent');

});

// ==============================
// Add Student
// ==============================
app.post('/addStudent', (req, res) => {

    console.log(req.body);

    const { name, dob, contact, image } = req.body;

    const sql = `
        INSERT INTO students
        (name, dob, contact, image)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [name, dob, contact, image],
        (error, results) => {

            if (error) {
                console.error(error);
                return res.send('Error adding student');
            }

            res.redirect('/');

        }
    );

});

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server started at http://localhost:${PORT}/`);

});