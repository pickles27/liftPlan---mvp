import React from 'react';

const Day = (props) => (
	<div>
		{props.day.workouts.map(workout => 
			<div key={workout.name} className="singleExercise">
		    <h3 className="workoutName">{ workout.name }</h3>
		    <button name={ workout.name } className="deleteButton" onClick={ props.deleteExercise }>Delete</button>
		    <p className="workoutDescription">{ workout.description }</p>
		    <iframe className="workoutVideo" src={ workout.videoLink }></iframe>
			</div>
		)}
	</div>
 );

export default Day;