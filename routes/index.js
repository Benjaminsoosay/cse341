const router = require("express").Router();
const passport = require("passport");


router.use("/", require("./swagger"));


router.use("/courses", require("./courses"));
router.use("/instructors", require("./instructors"));
router.use("/students", require("./students"));


router.get("/login", passport.authenticate("github"));

router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
