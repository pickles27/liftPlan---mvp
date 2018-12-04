import React from 'react';

//this page renders a single day's workouts
//will contain WorkoutList component

const Day = (props) => (
	<div>
		{props.day.workouts.map(workout => 
			<div className="singleExercise">
		    <h3 className="workoutName">{ workout.name }</h3>
		    <button name={ workout.name } className="deleteButton" onClick={ props.deleteExercise }>Delete</button>
		    <p className="workoutDescription">{ workout.description }</p>
		    <iframe className="workoutVideo" src={ workout.videoLink }></iframe>
			</div>
		)}
	</div>
 );

export default Day;