const Schedule = require("../models/schedule.model.js");

// Create and Save a new schedule
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Schedule.findByTeacher(req.params.teacherId, (err, data) => {
    let teacherSchedules = data;

    for (let teacherSchedule of teacherSchedules) {
      let startTemp = teacherSchedule.starttime;
      let endTemp = teacherSchedule.endtime;
      let startTimeParts = startTemp.split(/[- :]/);
      let endTimeParts = endTemp.split(/[- :]/);
      startTimeParts[1]--;
      endTimeParts[1]--;
      let startTime = new Date(...startTimeParts);
      let endTime = new Date(...endTimeParts);
      if (req.params.starttime.getTime() < startTime.getTime()) {
        if (req.params.endtime.getTime() >= startTime.getTime()) {
          res.status(400).send({
            message: "This slot is already booked",
          });
          return;
        }
      } else if (
        req.params.starttime.getTime() >= startTime.getTime() &&
        req.params.starttime.getTime() <= endTime.getTime()
      ) {
        res.status(400).send({
          message: "This slot is already booked",
        });
        return;
      }
    }

    // lets convert time in mysql format
    let startTime = req.params.starttime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    let endTime = req.params.endtime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Create a schedule
    const schedule = new Schedule({
      starttime: startTime,
      endtime: endTime,
      teacherId: req.body.teacherId,
    });

    // Save schedule in the database
    Schedule.create(schedule, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the schedule.",
        });
      else res.send(data);
    });
  });
};

// Retrieve all schedules from the database.
exports.findAll = (req, res) => {
  Schedule.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving schedules.",
      });
    else res.send(data);
  });
};

// Find schedules with a teacherId
exports.findByTeacher = (req, res) => {
  Schedule.findByTeacher(req.params.teacherId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found schedule with id ${req.params.scheduleId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving schedule with id " + req.params.scheduleId,
        });
      }
    } else res.send(data);
  });
};
