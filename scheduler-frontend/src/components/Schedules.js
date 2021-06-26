/* eslint-disable */
import React,{ useState, useEffect } from 'react'
import axios from "axios";
import "./Schedules.css"
import moment from "moment"
const Schedules = () => {
    const [teachers, setTeachers] = useState([]);
    const [dates, setDates] = useState([]);
    const [starts, setStarts] = useState([]);
    const [ends, setEnds] = useState([]);
    const [teacher_id, setTeacherId] = useState();
    const [category, setCategory] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetch_data(){
            const res = await axios.get(`https://scheduler-slanski.herokuapp.com/teacher`);
            setTeachers(res.data);
        }
        fetch_data();
    },[]);

    async function handleClick(e){
        e.preventDefault();
        if(!teacher_id || !category){
            setError("Enter all required details");
            return;
        }

        try{
            const res = await axios.get(`https://scheduler-slanski.herokuapp.com/schedule/${teacher_id}`)
            const data = res.data;
            // console.log(data);
            const temp_starts = [];
            const temp_ends = [];
            const temp_dates = [];
            const dt = new Date().getDate();
            const mt = new Date().getMonth();
            const yr = new Date().getFullYear();

            if(category === "today"){
                data.map((data) => {
                const start_obj = new Date(data.starttime);
                const end_obj = new Date(data.endtime);

                if(start_obj.getDate() === dt && start_obj.getMonth() === mt && start_obj.getFullYear() === yr){
                    temp_dates.push(start_obj.toDateString());
                    temp_starts.push(start_obj.getHours() + ":" + start_obj.getMinutes());
                    temp_ends.push(end_obj.getHours() + ":" + end_obj.getMinutes());
                }
                // console.log(obj.getHours());
            })
            }
            else if(category === "week"){
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6

                var firstday = new Date(curr.setDate(first));
                moment(firstday).format('YYYY-MM-DD');
                // console.log(firstday.getDay())
                var lastday = new Date(curr.setDate(last));
                moment(lastday).format('YYYY-MM-DD')

                // console.log(lastday)
                data.map((data) => {
                    const start_obj = new Date(data.starttime);
                    const end_obj = new Date(data.endtime);
                    moment(start_obj).format('YYYY-MM-DD');
                    var res = moment(start_obj).isBetween(firstday, lastday);
                    if(res){
                        temp_dates.push(start_obj.toDateString());
                        temp_starts.push(start_obj.getHours() + ":" + start_obj.getMinutes());
                        temp_ends.push(end_obj.getHours() + ":" + end_obj.getMinutes());
                    }
                    // console.log(obj.getHours());
                })
            }
            else if(category === "month"){
                data.map((data) => {
                const start_obj = new Date(data.starttime);
                const end_obj = new Date(data.endtime);

                if(start_obj.getMonth() === mt && start_obj.getFullYear() === yr){
                    temp_dates.push(start_obj.toDateString());
                    temp_starts.push(start_obj.getHours() + ":" + start_obj.getMinutes());
                    temp_ends.push(end_obj.getHours() + ":" + end_obj.getMinutes());
                }
                // console.log(obj.getHours());
            })
            }
            else if(category === "all"){
                data.map((data) => {
                const start_obj = new Date(data.starttime);
                const end_obj = new Date(data.endtime);
                temp_dates.push(start_obj.toDateString());
                temp_starts.push(start_obj.getHours() + ":" + start_obj.getMinutes());
                temp_ends.push(end_obj.getHours() + ":" + end_obj.getMinutes());
                
                // console.log(obj.getHours());
            })
            }
            setStarts(temp_starts);
            setEnds(temp_ends);
            setDates(temp_dates);
        }
        catch(err){
            console.log(err);
        }
    }

    function handleTeacher(e){
        setError("");
        setTeacherId(e.target.value);
    }

    function handleCategory(e){
        setError("");
        setCategory(e.target.value);
    }
    return (
        <div className="broad_view">
            <p className="fail">{error && error}</p>
            <div className="scheduler">
                <label className="teacher_selector">
                    <span className="labels">Select a teacher</span>
                    <select onChange={handleTeacher}>
                    <option selected>Select a teacher</option>
                    {teachers.map((teacher) => {
                        return (
                        <option value={teacher.id}>{teacher.name}</option>
                        )
                    })}
                </select>
                </label>
                <label className="category_selector">
                    <span className="labels">Select a Category</span>
                    <select onChange={handleCategory}>
                    <option selected>Select a Category</option>
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
                </label>
                <button className="find" onClick={handleClick}>Go</button>
            </div>
            <div className="table">
                    <div className="schedules">
                        <ul className="dates">
                         <li className="heading">Day & Date</li>
                         {dates.map((date) => {
                            return (
                                <li>{date}</li>
                            )
                        })}
                        </ul>
                    </div>
                    <div className="schedules">
                        <ul className="starts">
                         <li className="heading">Start Time</li>
                         {starts.map((start) => {
                             return (
                                 <li>{start}</li>
                             )
                         })}
                        </ul>
                    </div>
                    <div className="schedules">
                        <ul className="ends">
                         <li className="heading">End Time</li>
                         {ends.map((end) => {
                            return (
                                <li>{end}</li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default Schedules
