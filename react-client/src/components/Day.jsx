import React from 'react';

//this page renders a single day's workouts
//will contain WorkoutList component

const Day = (props) => (
  <div>
    { props.data.description }
  </div>
)

export default Day;