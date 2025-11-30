const courses = [
  {
    courseId: "CSE-100",
    courseTitle: "Introduction to Computer Science",
    instructor: "Bill Clements",
    classMax: 50,
    currentEnrollment: 48,
    startDate: "2023-04-17",
    endDate: "2023-07-24"
  },
  {
    courseId: "MATH-101",
    courseTitle: "Intermediate Algebra",
    instructor: "Paul Smith",
    classMax: 30,
    currentEnrollment: 31,
    startDate: "2023-04-17",
    endDate: "2023-07-24"
  },
  {
    courseId: "ENGL-340",
    courseTitle: "Technical Writing",
    instructor: "Steve Williams",
    classMax: 25,
    currentEnrollment: 24,
    startDate: "2023-04-17",
    endDate: "2023-07-24"
  },
  {
    courseId: "BIO-210",
    courseTitle: "Human Anatomy",
    instructor: "Dr. Linda Green",
    classMax: 40,
    currentEnrollment: 38,
    startDate: "2023-05-01",
    endDate: "2023-08-15"
  },
  {
    courseId: "CHEM-101",
    courseTitle: "General Chemistry",
    instructor: "Dr. Raj Patel",
    classMax: 35,
    currentEnrollment: 33,
    startDate: "2023-05-01",
    endDate: "2023-08-15"
  },
  {
    courseId: "PHYS-150",
    courseTitle: "Physics I",
    instructor: "Dr. Emily Zhao",
    classMax: 45,
    currentEnrollment: 42,
    startDate: "2023-05-01",
    endDate: "2023-08-15"
  },
  {
    courseId: "HIST-202",
    courseTitle: "World History",
    instructor: "Dr. Marcus Lee",
    classMax: 30,
    currentEnrollment: 28,
    startDate: "2023-06-01",
    endDate: "2023-09-01"
  },
  {
    courseId: "PSY-101",
    courseTitle: "Introduction to Psychology",
    instructor: "Dr. Karen Brooks",
    classMax: 40,
    currentEnrollment: 39,
    startDate: "2023-06-01",
    endDate: "2023-09-01"
  },
  {
    courseId: "ART-110",
    courseTitle: "Fundamentals of Drawing",
    instructor: "Prof. James Carter",
    classMax: 20,
    currentEnrollment: 18,
    startDate: "2023-06-15",
    endDate: "2023-09-15"
  },
  {
    courseId: "MUS-120",
    courseTitle: "Music Theory",
    instructor: "Prof. Alicia Keys",
    classMax: 25,
    currentEnrollment: 22,
    startDate: "2023-06-15",
    endDate: "2023-09-15"
  },
  {
    courseId: "CSE-220",
    courseTitle: "Data Structures",
    instructor: "Dr. Alan Turing",
    classMax: 50,
    currentEnrollment: 47,
    startDate: "2023-07-01",
    endDate: "2023-10-01"
  },
  {
    courseId: "CSE-330",
    courseTitle: "Operating Systems",
    instructor: "Dr. Grace Hopper",
    classMax: 45,
    currentEnrollment: 44,
    startDate: "2023-07-01",
    endDate: "2023-10-01"
  },
  {
    courseId: "CSE-410",
    courseTitle: "Machine Learning",
    instructor: "Dr. Andrew Ng",
    classMax: 40,
    currentEnrollment: 36,
    startDate: "2023-07-15",
    endDate: "2023-10-15"
  },
  {
    courseId: "BUS-101",
    courseTitle: "Principles of Management",
    instructor: "Prof. Susan Clark",
    classMax: 35,
    currentEnrollment: 34,
    startDate: "2023-08-01",
    endDate: "2023-11-01"
  },
  {
    courseId: "LAW-201",
    courseTitle: "Business Law",
    instructor: "Dr. Robert King",
    classMax: 30,
    currentEnrollment: 29,
    startDate: "2023-08-01",
    endDate: "2023-11-01"
  }
];

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const course = courses.find(c => c.courseId === req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

const createCourse = (req, res) => {
  const {
    courseId,
    courseTitle,
    instructor,
    classMax,
    currentEnrollment,
    startDate,
    endDate
  } = req.body;

  if (!courseId || !courseTitle || !instructor || !classMax || !startDate || !endDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newCourse = {
    courseId,
    courseTitle,
    instructor,
    classMax,
    currentEnrollment: currentEnrollment || 0,
    startDate,
    endDate
  };

  courses.push(newCourse);
  res.status(201).json({ message: "Course created", data: newCourse });
};

const updateCourse = (req, res) => {
  const course = courses.find(c => c.courseId === req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const {
    courseTitle,
    instructor,
    classMax,
    currentEnrollment,
    startDate,
    endDate
  } = req.body;

  course.courseTitle = courseTitle || course.courseTitle;
  course.instructor = instructor || course.instructor;
  course.classMax = classMax || course.classMax;
  course.currentEnrollment = currentEnrollment || course.currentEnrollment;
  course.startDate = startDate || course.startDate;
  course.endDate = endDate || course.endDate;

  res.json({ message: `Course ${req.params.id} updated`, data: course });
};

const deleteCourse = (req, res) => {
  const index = courses.findIndex(c => c.courseId === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }
  const deleted = courses.splice(index, 1);
  res.json({ message: `Course ${req.params.id} deleted`, data: deleted });
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
