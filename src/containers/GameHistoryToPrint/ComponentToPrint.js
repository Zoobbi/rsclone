import React, { Component } from 'react';
import propTypes from 'prop-types';
import GameHistoryToPrint from './GameHistoryToPrint';

class ComponentToPrint extends Component {
  render() {
    return (
      <GameHistoryToPrint
        ref={(el) => {
          this.component = el;
          return this.componentRef;
        }}
        gameId={this.props.gameId ? this.props.gameId : undefined}
      />
    );
  }
}
ComponentToPrint.defaultProps = {
  gameId: undefined,
};

ComponentToPrint.propTypes = {
  gameId: propTypes.string,
};

export default ComponentToPrint;
