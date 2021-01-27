import React, { Component } from 'react';
import './PatchLeague.scss';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '../../UI/Input/Input';
import ButtonUI from '../../UI/Button/Button';
import { parseAddresse } from '../../../../utils/makeAdress/makeAdress';
import { loadLeagueFromDB } from '../../../../utils/redux/reducers/currentLeague';
import { updateLeague } from '../../../../utils/API/api';

class PatchLeague extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      data: {
        image: undefined,
        name: undefined,
      },
      isNotImage: false,
      preview: undefined,

      formControls: {
        name: {
          value: '',
          type: 'text',
          label: 'Название лиги:',
          errorMessage: 'от 2 до 15 букв или цифр',
          valid: false,
          touched: false,
          validation: {
            required: true,
            nameRures: true,
          },
        },
      },
    };
  }

  componentDidMount() {
    const queries = parseAddresse(this.props);
    const leagueId = this.setKeyIfExist(queries, 'league_id');
    // this.getCurrentLeague(leagueId);
    this.props.fetchLeagueFromDB(leagueId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentLeague !== prevProps.currentLeague) {
      this.changeStateValue();
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  changeStateValue = () => {
    const leagueName = this.props.currentLeague.currentLeague.name;
    const { name } = this.state.formControls;
    name.value = leagueName;
    this.setState({});
  }

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= 6 && isValid;
    }

    if (validation.nameRures) {
      // eslint-disable-next-line no-useless-escape
      isValid = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,15}$/.test(value);
    }

    return isValid;
  };

  setKeyIfExist = (queries, keyName, asName) => {
    if (queries[keyName] !== undefined) {
      this.setState({ [asName !== undefined ? asName : keyName]: queries[keyName] });
      return queries[keyName];
    } return undefined;
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
      return true;
    });

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isFormValid,
      formControls,
    });
  };

  addLogoChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const isImage = file.type.match(/^image\/(jpeg|gif|png|svg\+xml)$/);

      if (isImage) {
        const { data } = this.state;
        const formData = new FormData();

        this.loadPreview(file);
        data.file = file;
        this.setState({});
        formData.append('file', file);
      }
      this.setState({ isNotImage: true });
    }
  }

  loadPreview = (file) => {
    const reader = new FileReader();
    reader.onload = function showPreviev(e) {
      this.setState({ preview: e.target.result });
    }.bind(this);
    reader.readAsDataURL(file);
  };

  fileLoadMessage = () => {
    if (this.state.data.file) {
      return this.state.data.file.name;
    } if (this.state.isNotImage) {
      return 'файл должен быть картинкой';
    }
    return 'загрузите лого';
  }

  renderInputs = () => Object.keys(this.state.formControls).map((controlName, index) => {
    const control = this.state.formControls[controlName];

    return (
      <Input
        key={controlName + index}
        type={control.type}
        value={control.value}
        valid={control.valid}
        touched={control.touched}
        label={control.label}
        shoudValidate={!!control.validation}
        errorMessage={control.errorMessage}
        onChange={(event) => this.onChangeHandler(event, controlName)}
      />
    );
  });

  updateLeague = () => {
    const data = {
      name: this.state.formControls.name.value,
      image: this.state.data.image,
    };
    updateLeague(this.props.currentLeague.currentLeague._id, data);
  }

  render() {
    return (
      <div className="CreateLeague-wrapper">
        { this.state.open
        && (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Изменение объекта</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Действительно хотите изменить объект &nbsp; &ldquo;
                {this.props.currentLeague.currentLeague.name}
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
                  this.updateLeague();
                  this.handleClose();
                }}
                autoFocus
              >
                Изменить
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <form className="CreateLeague">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            role="button"
            tabIndex={0}
            aria-label="upload-file"
            className="CreateLeague-logo"
            onClick={() => this.realInput.click()}
          >
            <img src="/image-template.svg" alt="load" />
            <span>{this.fileLoadMessage()}</span>
            <input
              className="none"
              ref={(r) => {
                this.realInput = r;
                return r;
              }}
              type="file"
              onChange={(event) => { this.addLogoChange(event); }}
            />
          </div>
          {this.state.preview !== undefined && <img className="preview-img" src={this.state.preview} alt="превью" />}
          {this.renderInputs()}
          <ButtonUI
            type="success"
            OnBtnclick={this.handleOpen}
            disabled={false}
          >
            Изменить
          </ButtonUI>
        </form>
      </div>
    );
  }
}

PatchLeague.defaultProps = {
  fetchLeagueFromDB: null,
  currentLeague: {},
};

PatchLeague.propTypes = {
  fetchLeagueFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  currentLeague: propTypes.object,

};

const mapDispatchToProps = (dispatch) => ({
  fetchLeagueFromDB: (id) => {
    dispatch(loadLeagueFromDB(id));
  },
});

const mapStateToProps = (state) => ({
  currentLeague: state.currentLeague,
  leagues: state.leagues,
});

export default connect(mapStateToProps, mapDispatchToProps)(PatchLeague);
