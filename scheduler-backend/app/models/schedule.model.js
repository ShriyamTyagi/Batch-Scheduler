const sql = require("./db.js");

// constructor
const Schedule = function (schedule) {
  this.date = schedule.date;
  this.starttime = schedule.starttime;
  this.endtime = schedule.endtime;
  this.teacherId = schedule.teacherId;
};

Schedule.create = (newschedule, result) => {

  

  sql.query("INSERT INTO schedules SET ?", newschedule, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created schedule: ", { id: res.insertId, ...newschedule });
    result(null, { id: res.insertId, ...newschedule });
  });
};

Schedule.findByTeacher = (teacherId, result) => {
  sql.query(
    `SELECT * FROM schedules WHERE teacherId = ${teacherId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found schedule: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found schedule with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Schedule.getAll = (result) => {
  sql.query("SELECT * FROM schedules", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("schedules: ", res);
    result(null, res);
  });
};

module.exports = Schedule;
