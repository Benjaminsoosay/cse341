const instructors = [
  { id: "1", name: "Bill Clements", email: "bill@clenment.com" },
  { id: "2", name: "Paul Smith", email: "paul@Smith.com" },
  { id: "3", name: "Sarah Johnson", email: "sarah@Johnson.com" },
  { id: "4", name: "Michael Brown", email: "michael@Brown.com" },
  { id: "5", name: "Emily Davis", email: "emily@Davis.com" },
  { id: "6", name: "David Wilson", email: "david@Wilson.com" },
  { id: "7", name: "Laura Martinez", email: "laura@martinez.com" },
  { id: "8", name: "James Taylor", email: "james@Taylor.com" },
  { id: "9", name: "Olivia Anderson", email: "olivia@Anderson.com" },
  { id: "10", name: "Robert Thomas", email: "robert@Thomas.com" },
  { id: "11", name: "Sophia Moore", email: "sophia@Moore.com" },
  { id: "12", name: "Daniel Jackson", email: "daniel@Jackson.com" }
];


const getAllInstructors = (req, res) => {
  try {
    res.status(200).json(instructors);
  } catch (err) {
    console.error("Error in getAllInstructors:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getInstructor = (req, res) => {
  try {
    const found = instructors.find(i => i.id === req.params.id);
    if (!found) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json(found);
  } catch (err) {
    console.error("Error in getInstructor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createInstructor = (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const newInstructor = { id: String(instructors.length + 1), ...req.body };
    instructors.push(newInstructor);
    res.status(201).json(newInstructor);
  } catch (err) {
    console.error("Error in createInstructor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateInstructor = (req, res) => {
  try {
    const idx = instructors.findIndex(i => i.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    instructors[idx] = { ...instructors[idx], ...req.body };
    res.status(200).json(instructors[idx]);
  } catch (err) {
    console.error("Error in updateInstructor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteInstructor = (req, res) => {
  try {
    const idx = instructors.findIndex(i => i.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    const removed = instructors.splice(idx, 1);
    res.status(200).json(removed[0]);
  } catch (err) {
    console.error("Error in deleteInstructor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllInstructors,
  getInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor
};
