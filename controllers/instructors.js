const instructors = [
  { id: "1", name: "Bill Clements", email: "bill@example.com" },
  { id: "2", name: "Paul Smith", email: "paul@example.com" }
];

const getAllInstructors = (req, res) => {
  res.json(instructors);
};

const getInstructor = (req, res) => {
  const found = instructors.find(i => i.id === req.params.id);
  if (!found) return res.status(404).send("Instructor not found");
  res.json(found);
};

const createInstructor = (req, res) => {
  const body = req.body;
  if (!body.name || !body.email) {
    return res.status(400).send("Missing fields");
  }
  const newInstructor = { id: String(instructors.length + 1), ...body };
  instructors.push(newInstructor);
  res.status(201).json(newInstructor);
};

const updateInstructor = (req, res) => {
  const idx = instructors.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).send("Instructor not found");
  instructors[idx] = { ...instructors[idx], ...req.body };
  res.json(instructors[idx]);
};

const deleteInstructor = (req, res) => {
  const idx = instructors.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).send("Instructor not found");
  const removed = instructors.splice(idx, 1);
  res.json(removed[0]);
};

module.exports = {
  getAllInstructors,
  getInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor
};
