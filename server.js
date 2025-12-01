require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/courses", require("./routes/courses"));
console.log(" Courses route mounted at /courses");

app.use("/instructors", require("./routes/instructors"));
console.log(" Instructors route mounted at /instructors");

app.use("/students", require("./routes/students"));
console.log(" Students route mounted at /students");

app.use("/", require("./routes/auth"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to CSE341 Project API by Benjamin Soosay");
});


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});


(async () => {
  try {
    await mongodb.initDb();
    app.listen(port, () => {
      console.log(`Database is connected and server is running on port ${port}`);
    });
  } catch (err) {
    console.error("🚨 Failed to start server:", err);
  }
})();

module.exports = app;
