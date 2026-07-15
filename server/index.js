const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to College Management Server!");
});


app.get("/students", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM college_students ORDER BY id"
        );

        res.json(result.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


app.post("/students", async (req, res) => {
    try {
        const { name, department, email } = req.body;

        const result = await pool.query(
            "INSERT INTO college_students (name, department, email) VALUES ($1, $2, $3) RETURNING *",
            [name, department, email]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department, email } = req.body;

        const result = await pool.query(
            `UPDATE college_students
             SET name = $1,
                 department = $2,
                 email = $3
             WHERE id = $4
             RETURNING *`,
            [name, department, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM college_students WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully!",
            student: result.rows[0]
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});