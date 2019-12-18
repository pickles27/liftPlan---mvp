import React from 'react';

const AddNewForm = (props) => {
	const options = constants.daysOfWeek.map(day => <option value={day}>{constants.dailyTitles[day]}</option>);
	const textInputs = constants.addFormSections.map(section => 
		<label>
			{section.label}
			<input type="text" name={section.nameKey} onChange={props.handleInputChange} />
		</label>);
	return (
		<div>
  		<form onSubmit={props.handleAddExercise}>
			<label>Day to add exercise to: 
				<select name="NXday" onChange={props.handleInputChange}>
					{options}
				</select>
			</label>
			{textInputs}
			<label>
				Please write a short description of the exercise:
				<textarea type="text" name="NXdescription" onChange={props.handleInputChange} />
			</label>
			<input className="submitButton" type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default AddNewForm;