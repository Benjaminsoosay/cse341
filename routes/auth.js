const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get("/login", passport.authenticate("github"));


router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    
    req.session.user = req.user;
    res.redirect("/");
  }
);


router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;