import React, { Component } from 'react';
import './Quarter.scss';
import propTypes from 'prop-types';

class Qarter extends Component {
  render() {
    return (
      <div className="Quarter">
        четверть: &nbsp;&nbsp;
        <select
          className="classic"
          name="quarter"
          id="quarter"
          onChange={(e) => { this.props.onQarterChange(e.target.value); }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    );
  }
}

Qarter.defaultProps = {
  onQarterChange: null,
};

Qarter.propTypes = {
  onQarterChange: propTypes.func,
};
export default Qarter;
