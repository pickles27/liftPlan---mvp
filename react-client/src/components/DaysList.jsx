import React from 'react';
import Day from './Day.jsx';

const DaysList = (props) => (
  <div className="daysList">
    <h4> Seize the day: </h4>
    { props.days.map(day => <button onClick={props.handleDayButtonClick} className="dayButtons">{day.day}</button>) }
  </div>
)

export default DaysList;
