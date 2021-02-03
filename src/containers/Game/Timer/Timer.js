import React, { Component } from 'react';
import './Timer.scss';

class Timer extends Component {
  render() {
    return (
      <div className="Timer-wrapper">
        <div className="Timer-content">
          <div className="Timer-control">
            Play
          </div>
          <div>
            <div className="Timer-time">
              <input type="number" className="minute" />
              <input type="number" className="sec" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
