module.exports = (app) => {
  const schedule = require("../controllers/schedule.controller.js");

  // Create a new schedule
  app.post("/schedule", schedule.create);

  // Retrieve all schedule
  app.get("/schedule", schedule.findAll);

  // Retrieve a single schedule with teacherId
  app.get("/schedule/:teacherId", schedule.findByTeacher);
};
