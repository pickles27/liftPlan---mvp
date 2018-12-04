import React from 'react';

const Navbar = (props) => {
	return (
		<div>
			<button className="homeButton" onClick={props.handleHomeButtonClick}>Home</button>
			<button className="addExerciseButton" onClick = {props.handleNavbarAddButtonClick}>Add New Exercise</button>
		</div>
	);
}

export default Navbar;

/*
add home button
can add if time: button to add new workout
user login
arrows going to next and previous day
*/