const Teacher = require("../models/teacher.model.js");

// Retrieve all teachers from the database.
exports.findAll = (req, res) => {
  Teacher.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving schedules.",
      });
    else res.send(data);
  });
};
