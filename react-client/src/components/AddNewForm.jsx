import React from 'react';

const AddNewForm = (props) => (
  <div>
  	<form onSubmit={props.handleAddExercise}>
  	<div>
	    <label>Day to add exercise to: 
	    	<select name="NXday" onChange={props.handleInputChange}>
	    	  <option value="Monday">Monday - Leg Day #1 (Posterior Chain Dominant)</option>
	        <option value="Tuesday">Tuesday - Chest Day</option>
	        <option value="Wednesday">Wednesday - Arms/Shoulders Day</option>
	        <option value="Thursday">Thursday - Back Day</option>
	        <option value="Friday">Friday - Leg Day #2 (Quad Dominant)</option>
	    	</select>
	    </label>
    </div>
    <div>
	    <label>
	    	Name of exercise:
	    	<input type="text" name="NXname" onChange={props.handleInputChange} />
	    </label>
    </div>
    <div>
	    <label>
	    	How many sets?
	    	<input type="text" name="NXsets" onChange={props.handleInputChange} />
	    </label>
    </div>
    <div>
	    <label>
	    	How many reps?
	    	<input type="text" name="NXreps" onChange={props.handleInputChange} />
	    </label>
    </div>
    <div>
	    <label>
	    	Please write a short description of the exercise:
	    	<textarea type="text" name="NXdescription" onChange={props.handleInputChange} />
	    </label>
    </div>
    <div>
    <label>
      Please enter a valid Youtube Video Id: (the alphanumeric id at the end of the URL) that correctly demonstrates your exercise:
   		<input type="text" name="NXvideoId" onChange={props.handleInputChange} />
    </label>
    </div>
    <input className="submitButton" type="submit" value="Submit" />
    </form>
  </div>
);

export default AddNewForm;