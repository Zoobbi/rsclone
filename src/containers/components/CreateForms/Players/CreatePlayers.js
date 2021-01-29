import React, { Component } from 'react';
import './CreatePlayers.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { createPlayer } from '../../../../utils/API/api';

class CreatePlayer extends Component {
  constructor() {
    super();
    this.state = {
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
          label: 'Имя:',
          errorMessage: 'только буквы',
          valid: false,
          touched: false,
          validation: {
            required: true,
            nameRures: true,
          },
        },
        lastName: {
          value: '',
          type: 'text',
          label: 'Фамилия:',
          errorMessage: 'Только буквы одного языка',
          valid: false,
          touched: false,
          validation: {
            required: true,
            nameRures: true,
          },
        },
        number: {
          value: '',
          type: 'number',
          label: 'Номер игрока:',
          errorMessage: 'число от 0 до 99',
          valid: false,
          touched: false,
          validation: {
            required: true,
            isNumberValid: true,
          },
        },
        TeamId: {
          value: '',
          type: 'hidden',
          label: '',
          errorMessage: '',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
      },
    };
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
      // isValid = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,15}$/.test(value);
      // eslint-disable-next-line no-useless-escape
      isValid = /^([а-яё\s]{1,15}|[a-z\s]{1,15})$/iu.test(value);
    }

    if (validation.isNumberValid) {
      isValid = value >= 0 && value < 100;
    }

    return isValid;
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
        data.name = file.name;
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
    return 'фото игрока';
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

  CreatePlayerProcess = () => {
    const data = {
      first_name: this.state.formControls.name.value,
      last_name: this.state.formControls.lastName.value,
      team: this.props.currentTeam.currentTeam._id,
      number: this.state.formControls.number.value,
      image: this.state.data.image,

    };

    createPlayer(data);
  };

  render() {
    console.log(this.props);
    return (
      <div className="CreateTeam-wrapper">
        <form className="CreateTeam">
          <div
            role="button"
            tabIndex={0}
            aria-label="upload-file"
            className="CreateTeam-logo"
            onClick={() => this.realInput.click()}
            onKeyPress={console.log('key')}
          >
            <img src="image-template.svg" alt="load" />
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
          <Button
            type="success"
            OnBtnclick={this.CreatePlayerProcess}
            disabled={false}
          >
            Cоздать
          </Button>
        </form>
      </div>
    );
  }
}

CreatePlayer.defaultProps = {
  currentTeam: undefined,
};

CreatePlayer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentTeam: propTypes.object,
};
const mapStateToProps = (state) => ({
  currentTeam: state.currentTeam,
});

export default connect(mapStateToProps, null)(CreatePlayer);
