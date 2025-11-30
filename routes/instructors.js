const router = require("express").Router();
const instructorsController = require("../controllers/instructors");
const { isAuthenticated } = require("../helpers/middleware/authenticate");

router.get("/", instructorsController.getAllInstructors);
router.get("/:id", instructorsController.getInstructor);
router.post("/", isAuthenticated, instructorsController.createInstructor);
router.put("/:id", isAuthenticated, instructorsController.updateInstructor);
router.delete("/:id", isAuthenticated, instructorsController.deleteInstructor);

module.exports = router;
