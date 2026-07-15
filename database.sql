CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO students (name, department, email)
VALUES
('Adarsh Krishna', 'Computer Science', 'adarsh@gmail.com');