import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DaysList from './components/DaysList.jsx';
import Day from './components/Day.jsx';
import Navbar from './components/Navbar.jsx';
import AddNewForm from './components/AddNewForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      day: 'null',
      dayData: {},
      NXday: 'Monday',
      NXname: '',
      NXdescription: '',
      NXsets: '',
      NXreps: '',
      NXvideoId: ''
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
    const target = event.target;
    const name = target.name;
    const value = target.value;
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
    this.setState({
      day: 'addExerciseForm'
    });
  }

  handleAddExercise(event) {
    var object = {
      "day": this.state.NXday,
      "data": {
        "name": this.state.NXname,
        "amount": this.state.NXsets + ' sets, ' + this.state.NXreps + ' reps',
        "description": this.state.NXdescription,
        "videoLink": 'https://www.youtube.com/embed/' + this.state.NXvideoId
      }
    }
    event.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/addexercise',
      headers: {
        "Content-Type": 'application/json'
      },
      data: JSON.stringify(object),
      success: () => alert('Exercise added!'),
      error: (error) => {console.log(error)}
    });
  }

  deleteExercise(event) {
    event.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: `/deleteexercise/${this.state.NXday}/${event.target.name}`,
      success: () => alert('Exercise deleted! Please refresh the page.'),
      error: (error) => {console.log(error)}
    });
  }

  handleHomeButtonClick(event) {
    event.preventDefault();
    this.setState({
      day: 'null'
    });
  }

  getRandomInspirationalQuote() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
    }

    var quotes = [
      "Success isn’t always about greatness. It’s about consistency. Consistent hard work gains success. Greatness will come.",
      "Train insane or remain the same.",
      "Push yourself because no one else is going to do it for you.",
      "Suck it up. And one day you won’t have to suck it in.",
      "Success starts with self-discipline.",
      "Good things come to those who sweat.",
      "Motivation is what gets you started. Habit is what keeps you going.",
      "A one hour workout is 4% of your day. No excuses",
      "What seems impossible today will one day become your warm-up.",
      "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
      "Someone busier than you is working out right now.",
      "Hustle for that muscle.",
      "The only bad workout is the one that didn’t happen.",
      "Go the extra mile. It’s never crowded."
    ];

    return quotes[getRandomInt(0, quotes.length)];
  }

  render () {
    if (this.state.day === 'null') {
      return (
        <div className="page">
          <Navbar handleHomeButtonClick={this.handleHomeButtonClick} handleNavbarAddButtonClick={this.handleNavbarAddButtonClick} />
          <h1>LiftPlan</h1>
          <h6>{ this.getRandomInspirationalQuote() }</h6>
          <DaysList days={this.state.data} handleDayButtonClick={this.handleDayButtonClick} />
        </div>
      );
    } else if (this.state.day === 'addExerciseForm') {
      return (
        <div className="page">
          <Navbar handleHomeButtonClick={this.handleHomeButtonClick} handleNavbarAddButtonClick={this.handleNavbarAddButtonClick} />
          <h1>LiftPlan</h1>
          <h2>Add New Exercise:</h2>
          <AddNewForm handleInputChange={this.handleInputChange} handleAddExercise={this.handleAddExercise} />
        </div>
      );
    } else {
      return (
        <div className="page">
          <Navbar handleHomeButtonClick={this.handleHomeButtonClick} handleNavbarAddButtonClick={this.handleNavbarAddButtonClick} />
          <h1>{ this.state.day }</h1>
          <h2>{ this.state.dayData.occasion }</h2>
          <Day deleteExercise={this.deleteExercise} day={ this.state.dayData } />
        </div>
      );
    } 
  }
}

ReactDOM.render(<App />, document.getElementById('app'));