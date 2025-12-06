
const courses = [
  { courseId: "CSE-100", courseTitle: "Intro to CS", instructor: "Bill Clements", classMax: 50, currentEnrollment: 48, startDate: "2023-04-17", endDate: "2023-07-24" },
  { courseId: "MATH-101", courseTitle: "Intermediate Algebra", instructor: "Paul Smith", classMax: 30, currentEnrollment: 31, startDate: "2023-04-17", endDate: "2023-07-24" }
];


const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const found = courses.find(c => c.courseId === req.params.id);
  if (!found) return res.status(404).send("Course not found");
  res.json(found);
};

// create
const createCourse = (req, res) => {
  const body = req.body;
  if (!body.courseId || !body.courseTitle) {
    return res.status(400).send("Missing fields");
  }
  courses.push(body);
  res.status(201).json(body);
};


const updateCourse = (req, res) => {
  const idx = courses.findIndex(c => c.courseId === req.params.id);
  if (idx === -1) return res.status(404).send("Course not found");
  courses[idx] = { ...courses[idx], ...req.body };
  res.json(courses[idx]);
};


const deleteCourse = (req, res) => {
  const idx = courses.findIndex(c => c.courseId === req.params.id);
  if (idx === -1) return res.status(404).send("Course not found");
  const removed = courses.splice(idx, 1);
  res.json(removed[0]);
};

module.exports = { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse };
