import React from 'react';

//this page renders a single day's workouts
//will contain WorkoutList component

const Day = (props) => (
	<div>
		{props.day.workouts.map(workout => 
			<div>
		    <h4>{ workout.name }</h4>
		    <p>{ workout.description }</p>
		    <iframe src={ workout.videoLink } height="315" width="420"></iframe>
			</div>
		)}
	</div>
 );

export default Day;