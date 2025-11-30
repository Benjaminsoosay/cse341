const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students");

router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getStudent);
router.post("/", studentsController.createStudent);
router.put("/:id", studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudent);

module.exports = router;