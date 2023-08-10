var express = require('express');
var app = express();
const storage = require('node-persist');

const bodyParser = require('body-parser'); // Import the body-parser module

app.use(bodyParser.json()); // Use the json middleware
storage.init();

app.post("/allstudents", async (req, res) => {
  const {student_id, name, gpa } = req.body;
  await storage.setItem( student_id, {name, gpa});
  res.send("Added student successfully.");
});

app.get("/allstudents", async (req, res) => {
  const allstudents = await storage.values();
  res.send(allstudents);
});

app.get("/allstudents/:student_id", async (req, res) => {
  const student_id = req.params.student_id;
  const resp = await storage.getItem(student_id);

  const result= `<h1> Student Details ${student_id}</h1>
                 <h2> Student_id: ${student_id}</h2>
                 <h2> Name: ${resp.name}</h2>
                 <h2> gpa: ${resp.gpa}</h2>
                `
});

app.listen(5001, () => {
  console.log("Server has started");
});
