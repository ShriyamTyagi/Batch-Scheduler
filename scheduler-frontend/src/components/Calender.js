import React, { useState } from "react";
import { useEffect } from "react";
import "./Calender.css";
import { Link, useHistory } from "react-router-dom"

function Calender({ setCurrDate }) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  
  const [dates, setDates] = useState([]);
  const [prev_dates,setPrevDates] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState(new Date(year, month+1, 0).getDate());
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(new Date().toDateString());
  const [selectedDate, setSelectedDate] = useState();
  const history = useHistory();
  
  const handleDateClick = (i) => () => {
    //   console.log(year + " " + month + " " + i)
      const new_date = new Date(year,month+1,i);
      console.log(new_date)
      setCurrDate(new_date);
      history.push("/add");
  }

  function printDates(){
    const temp_dates = [];
    const temp_prev_dates = [];
    
    // console.log(date.getDate());
    
    // setting current month dates
    for(var i=1;i<=daysInMonth;i++){
      if(i === date.getDate() && month === date.getMonth())
        // eslint-disable-next-line no-loop-func
        temp_dates.push(<div className="today" onClick={handleDateClick(i)}>{i}</div>);
      else
        // eslint-disable-next-line no-loop-func
        temp_dates.push(<div onClick={handleDateClick(i)}>{i}</div>);
    }
  
    setDates(temp_dates);
    // setting previous month dates
    const day = new Date(year,month,1).getDay();
    
    // console.log(day);
    let prev_month_end = new Date(year,month,0).getDate();
    for(var i=day;i>=1;i--){
      temp_prev_dates.push(<div className="prev_date">{prev_month_end}</div>);
      prev_month_end--;
    }

      temp_prev_dates.reverse();
    
      setPrevDates(temp_prev_dates);
  }

  useEffect(() => {
    if(month !== date.getMonth() || year !== date.getFullYear()){
      setDateString(year);
    }
    else{
      setDateString(date.toDateString());
    }
    setDaysInMonth(new Date(year, month+1, 0).getDate());
},[month]);

  useEffect(() => {
    printDates();
  },[daysInMonth,month]);


  function handleClick(str){
    console.log("Clicked")
    setDates([]);
    setPrevDates([]);

    if(str === "prev"){
      if(month === 0){
        setYear(prevYear => {setYear(prevYear-1)});
        setMonth(12);
      }
      setMonth(prevMonth => {setMonth(prevMonth-1)});  
    }
    else if(str === "next"){
      if(month === 11){
        setYear(prevYear => {setYear(prevYear+1)});
        setMonth(-1);
      }
      setMonth(prevMonth => {setMonth(prevMonth+1)}); 
    }
  }

  return (
    <div className="main"> 
        <button className="dropbtn"><Link to="/schedules" style={{ color: 'white',textDecoration: 'none' }}>Schedules</Link></button>
      <div className="calender">
        <div className="month">
          <div className="prev" onClick={() => handleClick("prev")}><i className="fas fa-angle-left"></i></div>
          <div className="data">
            <h2 id="month">{months[month]}</h2>
            <p>{dateString}</p>
          </div>
          <div className="next" onClick={() => handleClick("next")}><i className="fas fa-angle-right"></i></div>
        </div>
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">
          {prev_dates && prev_dates}
        {dates}
        <div className="next_date">1</div>
        <div className="next_date">2</div>
        <div className="next_date">3</div>
        <div className="next_date">4</div>
        <div className="next_date">5</div>
        <div className="next_date">6</div>
        </div>
        <button className="add_btn"><Link to="/add" style={{ color: 'white',textDecoration: 'none' }}>Add</Link></button>
      </div>
    </div>
  );
}

export default Calender;