const router = require("express").Router();
const coursesController = require("../controllers/courses");
const { isAuthenticated } = require("../helpers/middleware/authenticate");

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getCourse);
router.post("/", isAuthenticated, coursesController.createCourse);
router.put("/:id", isAuthenticated, coursesController.updateCourse);
router.delete("/:id", isAuthenticated, coursesController.deleteCourse);

module.exports = router;
