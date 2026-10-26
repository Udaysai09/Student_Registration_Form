const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

//configure the ejs
app.set("view engine", "ejs");

//reading submitted data through html forms
app.use(express.urlencoded({ extended: true }));

//Serve CSS files
app.use(express.static("public"));

//Display the registration forms
app.get("/", (req, res) => {
  res.render("index");
});

//handle form submission
app.post("/register", (req, res) => {
  const {
    name,
    Gender,
    email,
    password,
    confirmpassword,
    Mobile,
    alternate,
    Course,
  } = req.body;

  //validate password confirmation
  if (password !== confirmpassword) {
    return res.status(400).send("Password do not match.");
  }
  // Validate the selected course
  const allowedCourses = [
    "Java Full Stack",
    "Python Full Stack",
    "Web Development",
    "Manual Testing",
    "Power BI",
    "API Testing",
  ];

  if (!allowedCourses.includes(Course)) {
    return res.status(400).send("Please select a valid course.");
  }

  //Display registration success page
  res.render("success", {
    Name: name,
    Course: Course,
  });
});

//Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
