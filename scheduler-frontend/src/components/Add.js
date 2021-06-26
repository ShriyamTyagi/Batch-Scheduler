/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Add.css";

function Add({ currdate }) {
    const [start_time_object, setStartTimeObject] = useState("");
    const [end_time_object, setEndTimeObject] = useState("");
    const [curr_date, setCurr_Date] = useState();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [teachers, setTeachers] = useState([]); 
    const [teacher_id, setTeacherId] = useState();
    const [start_hour, setStartHour] = useState();
    const [start_min, setStartMin] = useState();
    const [end_hour, setEndHour] = useState();
    const [end_min, setEndMin] = useState();
    const [prevSelected, setPrevSelected] = useState("");  
    
    // console.log("Date is " + currdate);
    
      useEffect(() => {
        if(currdate){
          let m = currdate.getMonth();
          let d = currdate.getDate();
          if(m < 10){
            m = "0" + m;
          }
          if(currdate.getDate() < 10){
            d = "0" + currdate.getDate();
          }
          setPrevSelected(currdate.getFullYear() + "-" + m + "-" + d);
        }
    },[currdate])

    useEffect(() => {
          if(curr_date){
          let m1 = curr_date.getMonth();
          let d1 = curr_date.getDate();
          m1 = m1 + 1;
          if(m1 < 10){  
            m1 = "0" + m1;
          }
          if(d1 < 10){
            d1 = "0" + curr_date.getDate();
          }
          setPrevSelected(curr_date.getFullYear() + "-" + m1 + "-" + d1);
          }
    },[curr_date])
    async function handleSubmit(e){
      e.preventDefault();
      if(!teacher_id || !start_time_object || !end_time_object || (!curr_date && !prevSelected)){
        setError("Enter all required details");
        return;
      }
      let start_time,end_time;
      if(!curr_date){
        let new_date = new Date(prevSelected);
        start_time = new Date(new_date.getFullYear(),new_date.getMonth(),new_date.getDate(),start_hour,start_min);
        end_time = new Date(new_date.getFullYear(),new_date.getMonth(),new_date.getDate(),end_hour,end_min);
      }
      else{
        start_time = new Date(curr_date.getFullYear(),curr_date.getMonth(),curr_date.getDate(),start_hour,start_min);
        end_time = new Date(curr_date.getFullYear(),curr_date.getMonth(),curr_date.getDate(),end_hour,end_min);
      }
      // console.log(start_time);  
      // console.log(end_time);

      const req = {starttime: start_time,endtime: end_time, teacherId: teacher_id};
      console.log(req);

      try{
          const res = await axios.post(`https://scheduler-slanski.herokuapp.com/schedule`,req);
          setMessage("Schedule added successfully");
          // console.log(res.data);
      }
      catch(err){
        setError("A batch is already scheduled at this time");
      }
    }

    useEffect(() => {
        async function fetch_data(){
            const response = await axios.get(`https://scheduler-slanski.herokuapp.com/teacher`);
            setTeachers(response.data);
        }
        fetch_data();
    },[]);

    function handleStart(e){
      setError("");
      setMessage("");
      const st = e.target.value;
      const temp_start_hour = st[0] + st[1];
      const temp_start_min = st[3] + st[4];

      const date_object1 = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),parseInt(temp_start_hour),parseInt(temp_start_min),0 ,0);
      // console.log(date_object1);
      setStartTimeObject(date_object1);
      setStartHour(parseInt(temp_start_hour));
      setStartMin(parseInt(temp_start_min));
    }

    function handleEnd(e){
      setError("");
      setMessage("");
      const st = e.target.value;
      const temp_end_hour = st[0] + st[1];
      const temp_end_min = st[3] + st[4];

      const date_object2 = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),parseInt(temp_end_hour),parseInt(temp_end_min), 0, 0);
      // console.log(date_object2);
      setEndTimeObject(date_object2);
      setEndHour(parseInt(temp_end_hour));
      setEndMin(parseInt(temp_end_min));
    }

   function handleDate(e){
      setError("");
      setMessage("");
      setCurr_Date(new Date(e.target.value));
    }

    function handleTeacher(e){
      setError("");
      setMessage("");
      setTeacherId(e.target.value);
    }
    

  return (
      <div className="batch-crud">
        <div className="container ">
          <h2>Add a Schedule for the teacher</h2>
          <form className="add-batch-form" onSubmit={handleSubmit}>
            <label>
              <span className="input_labels">Select a teacher</span>
              <select onChange={handleTeacher}>
                <option selected>Select a teacher</option>
                {teachers.map((teacher) => {
                  return (
                    <option value={teacher.id}>{teacher.name}</option>
                  )
                })}
              </select>
            </label>
            <label>
              <span className="input_labels"> Enter date </span>
              <input type="date" onChange={handleDate} value={prevSelected}></input>
            </label>
            <label>
            <span className="input_labels"> Enter start time </span>
              <input type="time" onChange={handleStart}></input>
            </label>
            <label>
            <span className="input_labels"> Enter end time </span>
              <input type="time" onChange={handleEnd}></input>
            </label>
            <button className="btn btn-primary add-batch-btn">Add Schedule</button>
          </form>
          <p>{error && error}</p>
          <p>{message && message}</p>
        </div>
      </div>
  );
}

export default Add;
