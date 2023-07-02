import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { Paper, Button } from "@material-ui/core";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };

  const [data, setData] = useState({
    name: "",
    address: "",
  });

  const [students, setStudents] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log("Added student successfully");
      })
      .catch((error) => {
        console.error("Error adding student: " + error.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getall")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Student</u>
        </h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student's Name"
            variant="outlined"
            fullWidth
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Box mt={2} />
          <TextField
            id="outlined-basic"
            label="Student's Address"
            variant="outlined"
            fullWidth
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </Box>
        <Box mt={2} />
        <Button variant="contained" color="secondary" onClick={handleAdd}>
          Submit
        </Button>
      </Paper>

      <h3>Students list</h3>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "35px", textgAlign: "left" }}
            key={student.id}
          >
            Id: {student.id}, 
            Name: {student.name},
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
