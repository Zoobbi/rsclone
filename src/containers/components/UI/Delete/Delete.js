import React, { Component } from 'react';
import './Delete.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import propTypes from 'prop-types';

class Delete extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    };
    this.props = props;
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  render() {
    return (
      <>
        <div
          className="delete-btn"
          role="button"
          tabIndex={0}
          aria-label="delete"
          onClick={this.handleOpen}
          onKeyPress={() => {}}
        >
          <img src="/delete.svg" alt="edit" />
        </div>
        { this.state.open
        && (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Удаление объекта</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Действительно хотите удалить объект &nbsp; &ldquo;
                {this.props.deleteItem}
                &rdquo;&nbsp; ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleClose}
              >
                Отмена
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  this.props.onDelete();
                  this.handleClose();
                }}
                autoFocus
              >
                Удалить
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  }
}

Delete.defaultProps = {
  onDelete: null,
  deleteItem: '',
};

Delete.propTypes = {
  onDelete: propTypes.func,
  deleteItem: propTypes.string,
};
export default Delete;
