const sql = require("./db.js");

// constructor
const Teacher = function (teacher) {
  this.name = teacher.name;
};

Teacher.getAll = (result) => {
  sql.query("SELECT * FROM teachers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("teachers: ", res);
    result(null, res);
  });
};

module.exports = Teacher;
