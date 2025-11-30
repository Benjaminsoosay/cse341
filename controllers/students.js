const getAllStudents = (req, res) => {
  res.status(200).json({ message: "All students returned" });
};


const getStudent = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Student with id ${id}` });
};

const createStudent = (req, res) => {
  const studentData = req.body;
  res.status(201).json({ message: "Student created", data: studentData });
};

const updateStudent = (req, res) => {
  const id = req.params.id;
  const studentData = req.body;
  res.status(200).json({ message: `Student ${id} updated`, data: studentData });
};


const deleteStudent = (req, res) => {
  const id = req.params.id;
  res.status(204).json({ message: `Student ${id} deleted` });
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
