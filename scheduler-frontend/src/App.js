import React, { useState } from 'react'
import Calender from "./components/Calender"
import Add from "./components/Add"
import Schedules from "./components/Schedules"
import { BrowserRouter as Router} from "react-router-dom"
import { Route, Switch } from "react-router"
const App = () => {
  const [currdate, setCurrDate] = useState();
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Calender setCurrDate={setCurrDate}/>
      </Route>
      <Route exact path="/add">
        <Add currdate = {currdate}/>
      </Route>
      <Route exact path="/schedules" component={Schedules} />
    </Switch> 
  </Router>
  )
}

export default App
