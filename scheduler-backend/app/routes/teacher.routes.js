module.exports = (app) => {
  const teacher = require("../controllers/teacher.controller.js");

  // Retrieve all Customers
  app.get("/teacher", teacher.findAll);
};
