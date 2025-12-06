const students = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "2", name: "Bob Smith", email: "bob@example.com" }
];

const getAllStudents = (req, res) => {
  res.json(students);
};

const getStudent = (req, res) => {
  const found = students.find(s => s.id === req.params.id);
  if (!found) return res.status(404).send("Student not found");
  res.json(found);
};

const createStudent = (req, res) => {
  const body = req.body;
  if (!body.name || !body.email) {
    return res.status(400).send("Missing fields");
  }
  const newStudent = { id: String(students.length + 1), ...body };
  students.push(newStudent);
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const idx = students.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).send("Student not found");
  students[idx] = { ...students[idx], ...req.body };
  res.json(students[idx]);
};

const deleteStudent = (req, res) => {
  const idx = students.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).send("Student not found");
  const removed = students.splice(idx, 1);
  res.json(removed[0]);
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
