import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DaysList from './components/DaysList.jsx';
import Navbar from './components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [];
      /*props needs to change to 
        data: 
        [
          {"day": "Monday", 
            "workouts": [
              {"name": "Squats",
              "description": description of squat and suggestions on reps/sets,
              "videoLink": video link to embed}
            ],

          },
          {"day": "Tuesday",
           "workouts": [
           ]......
          },
          etc.
        ]
      */
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          //need to change this to store users, and checkmarks saying if the workout has been completed or not
          data: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>LiftPlan</h1>
      <DaysList days={this.state.days}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));