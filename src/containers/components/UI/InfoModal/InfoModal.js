import React, { Component } from 'react';
import { store } from '../../../../utils/redux/store';
import './InfoModal..scss';

class InfoModal extends Component {
  constructor() {
    super();
    this.state = {
      infoMessage: store.getState().info.info,
      isError: store.getState().info.isError,
      classes: ['InfoModal'],
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      if (localStorage.getItem('info')) {
        localStorage.removeItem('info');
        const infoMessage = store.getState().info.info;
        const { isError } = store.getState().info;
        let { classes } = this.state;

        classes.push(this.getInfoClasses(isError), 'visible');
        this.setState({
          infoMessage,
          isError,
          classes,
        });
        setTimeout(() => {
          classes = classes.slice(0, 1);
          this.setState({
            classes,
          });
        }, 3000);
      }
    });
  }

  getInfoClasses = (isError) => {
    if (isError) {
      return 'error';
    }
    return 'success';
  };

  render() {
    return (
      <div className={this.state.classes.join(' ')}>
        {this.state.infoMessage}
      </div>
    );
  }
}
export default InfoModal;
