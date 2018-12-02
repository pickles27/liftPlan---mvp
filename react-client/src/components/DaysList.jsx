import React from 'react';
import Day from './Day.jsx';

const DayList = (props) => (
  <div>
    <h4> DayList Component </h4>
    There are { props.days.length } items.
    { props.days.map(day => <ListItem days={day}/>)}
  </div>
)

export default List;