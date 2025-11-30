const getAllInstructors = (req, res) => {
  res.status(200).json({ message: "All instructors returned" });
};


const getInstructor = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Instructor with id ${id}` });
};


const createInstructor = (req, res) => {
  const instructorData = req.body;
  res.status(201).json({ message: "Instructor created", data: instructorData });
};

// PUT update an instructor
const updateInstructor = (req, res) => {
  const id = req.params.id;
  const instructorData = req.body;
  res.status(200).json({ message: `Instructor ${id} updated`, data: instructorData });
};


const deleteInstructor = (req, res) => {
  const id = req.params.id;
  res.status(204).json({ message: `Instructor ${id} deleted` });
};

module.exports = {
  getAllInstructors,
  getInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor
};

