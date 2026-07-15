import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  // Fetch Students
  const getStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);


  const addStudent = async () => {

    if (!name || !department || !email) {
      alert("Please fill all fields!");
      return;
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/students", {
        name,
        department,
        email,
      });

      alert("Student Added Successfully!");

      setName("");
      setDepartment("");
      setEmail("");

      getStudents();

    } catch (err) {
      console.log(err);
    }
  };

  
  const updateStudent = async (student) => {

    const newName = prompt("Enter New Name", student.name);
    const newDepartment = prompt("Enter New Department", student.department);
    const newEmail = prompt("Enter New Email", student.email);

    if (!newName || !newDepartment || !newEmail) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmail)) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/students/${student.id}`,
        {
          name: newName,
          department: newDepartment,
          email: newEmail,
        }
      );

      alert("Student Updated Successfully!");

      getStudents();

    } catch (err) {
      console.log(err);
    }
  };

  
  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`http://localhost:5000/students/${id}`);

      alert("Student Deleted Successfully!");

      getStudents();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        textAlign: "center",
        paddingTop: "20px",
      }}
    >
      <h1>College Management System</h1>

      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={addStudent}>
        Add Student
      </button>

      <hr />

      <h2>Student List</h2>

      {students.map((student) => (

        <div
          key={student.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >

          <h3>{student.name}</h3>

          <p>
            <strong>Department:</strong> {student.department}
          </p>

          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <button
            onClick={() => updateStudent(student)}
            style={{
              marginRight: "10px"
            }}
          >
            Update
          </button>

          <button
            onClick={() => deleteStudent(student.id)}
            style={{
              backgroundColor: "red",
              color: "white"
            }}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default App;