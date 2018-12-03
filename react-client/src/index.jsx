import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DaysList from './components/DaysList.jsx';
import Day from './components/Day.jsx';
import Navbar from './components/Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      day: 'null', //on day button click, change this to the day of the week and use for conditional rendering
      dayData: {}
    }
    this.handleDayButtonClick = this.handleDayButtonClick.bind(this);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/data', 
      success: (data) => {
        this.setState({
          //can change this to store users, and checkmarks saying if the workout has been completed or not
          data: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleDayButtonClick(event) {
    event.preventDefault();
    var today = event.target.innerHTML;
    $.ajax({
      url: '/daydata',
      data: today,
      success: (result) => {
        this.setState({
          day: today,
          dayData: result[0]
        });
      }
    });
    //when a day button is clicked, change state day property
    //make sure this re-renders the page to a single day page with the list of workouts on it

  }

  handleHomeButtonClick(event) {
    event.preventDefault();
    this.setState({
      day: 'null'
    })
  }

  render () {
    if (this.state.day === 'null') {
      return (
        <div>
          <Navbar handleHomeButtonClick={this.handleHomeButtonClick} />
          <h1>LiftPlan</h1>
          <DaysList days={this.state.data} handleDayButtonClick={this.handleDayButtonClick} />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar handleHomeButtonClick={this.handleHomeButtonClick} />
          <h1>{ this.state.day }</h1>
          <Day day={ this.state.dayData } />
        </div>
      );
    }
    
  }
}

ReactDOM.render(<App />, document.getElementById('app'));