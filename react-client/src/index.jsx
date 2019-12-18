import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import constants from './constants.js';
import DaysList from './components/DaysList.jsx';
import Day from './components/Day.jsx';
import Navbar from './components/Navbar.jsx';
import AddNewForm from './components/AddNewForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      day: null,
      dayData: {},
      NXday: 'Monday',
      NXname: '',
      NXdescription: '',
      NXsets: '',
      NXreps: '',
      link: ''
    }
    this.handleDayButtonClick = this.handleDayButtonClick.bind(this);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.handleNavbarAddButtonClick = this.handleNavbarAddButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/data', 
      success: (data) => {
        this.setState({
          data: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  handleDayButtonClick(event) {
    event.preventDefault();
    var today = event.target.innerHTML;
    $.ajax({
      method: 'GET',
      url: '/daydata',
      data: today,
      success: (result) => {
        this.setState({
          day: today,
          dayData: result[0]
        });
      }
    });
  }

  handleNavbarAddButtonClick(event) {
    event.preventDefault();
    this.setState(constants.addExerciseForm
    });
  }

  handleAddExercise(event) {
    const body = {
      "day": this.state.NXday,
      "data": {
        "name": this.state.NXname,
        "amount": this.state.NXsets + ' sets, ' + this.state.NXreps + ' reps',
        "description": this.state.NXdescription,
        "videoLink": this.state.link
      }
    }
    event.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/addexercise',
      headers: {
        "Content-Type": 'application/json'
      },
      data: JSON.stringify(body),
      success: () => alert(constants.addSuccess),
      error: (error) => {console.log(error)}
    });
  }

  deleteExercise(event) {
    event.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: `/deleteexercise/${this.state.NXday}/${event.target.name}`,
      success: () => alert(constants.deleteSuccessMessage),
      error: (error) => {console.log(error)}
    });
  }

  handleHomeButtonClick(event) {
    event.preventDefault();
    this.setState({
      day: null
    });
  }

  getRandomInspirationalQuote() {
    const randNum = Math.floor(Math.random() * (constants.quotes.length)); 
    return constants.quotes[randNum];
  }

  render () {
    const title = this.state.day === null || this.state.day === constants.addExerciseForm ? <h1>LiftPlan</h1> : null;
    const quote = this.state.day === null ? <h6>{ this.getRandomInspirationalQuote() }</h6> : null;
    const dayList = this.state.day === null ? <DaysList days={this.state.data} handleDayButtonClick={this.handleDayButtonClick} /> : null;
    const addExercises = this.state.day === constants.addExerciseForm ? <>
      <h2>Add New Exercise:</h2>
      <AddNewForm handleInputChange={this.handleInputChange} handleAddExercise={this.handleAddExercise} />
    </> : null;
    const dayDisplay = this.state.day !== null && this.state.day !== constants.addExerciseForm ? <>
      <h1>{ this.state.day }</h1>
      <h2>{ this.state.dayData.occasion }</h2>
      <Day deleteExercise={this.deleteExercise} day={ this.state.dayData } />
    </> : null;

    return (
      <div className="page">
        <Navbar handleHomeButtonClick={this.handleHomeButtonClick} handleNavbarAddButtonClick={this.handleNavbarAddButtonClick} />
        {title}
        {quote}
        {dayList}
        {addExercises}
        {dayDisplay}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));