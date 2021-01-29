import React, { Component } from 'react';
import propTypes from 'prop-types';
import GameHistoryToPrint from './GameHistoryToPrint';

class ComponentToPrint extends Component {
  render() {
    return (
      <GameHistoryToPrint
        ref={(el) => {
          console.log(el);
          // eslint-disable-next-line no-return-assign
          return this.componentRef = el;
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
