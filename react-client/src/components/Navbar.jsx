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
