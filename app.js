const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const multer = require('multer');
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

// Enable static files
app.use(express.static('public'));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

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
app.post('/addStudent', upload.single('image'), (req, res) => {

    const { name, dob, contact } = req.body;

    let image;

    if (req.file) {
        image = req.file.filename;
    } else {
        image = null;
    }

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

app.get('/editStudent/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = 'SELECT * FROM students WHERE studentId = ?';

    connection.query(sql, [studentId], (error, results) => {

        if (error) {
            console.error(error);
            return res.send('Error retrieving student');
        }

        if (results.length > 0) {
            res.render('editStudent', {
                student: results[0]
            });
        } else {
            res.send('Student not found');
        }

    });

});

app.post('/editStudent/:id', (req, res) => {

    const studentId = req.params.id;

    const { name, dob, contact } = req.body;

    const sql = `
        UPDATE students
        SET name = ?, dob = ?, contact = ?
        WHERE studentId = ?
    `;

    connection.query(
        sql,
        [name, dob, contact, studentId],
        (error, results) => {

            if (error) {
                console.error(error);
                return res.send('Error updating student');
            }

            res.redirect('/');
        }
    );

});

app.get('/deleteStudent/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = 'DELETE FROM students WHERE studentId = ?';

    connection.query(sql, [studentId], (error, results) => {

        if (error) {
            console.error(error);
            return res.send('Error deleting student');
        }

        res.redirect('/');

    });

});

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {

    console.log(`Server started at http://localhost:3002/`);

});