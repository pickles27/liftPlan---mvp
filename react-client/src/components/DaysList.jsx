import React from 'react';
import Day from './Day.jsx';

const DaysList = (props) => (
  <div>
    <h4> Choose the day: </h4>
    { props.days.map(day => <button onClick={props.handleDayButtonClick} className="dayButtons">{day.day}</button>) }
  </div>
)

export default DaysList;
    // { props.days.map(day => <Day day={day}/>)}