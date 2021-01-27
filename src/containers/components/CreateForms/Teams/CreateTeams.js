import React, { Component } from 'react';
import './CreateTeam.scss';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { createTeam } from '../../../../utils/API/api';

class CreateTeam extends Component {
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
          label: 'Название команды:',
          errorMessage: 'от 2 до 15 букв или цифр',
          valid: false,
          touched: false,
          validation: {
            required: true,
            nameRures: true,
          },
        },
        leagueId: {
          value: '',
          type: 'hidden',
          label: '',
          errorMessage: 'от 2 до 15 букв или цифр',
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
      isValid = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,15}$/.test(value);
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

    CreateTeamProcess = () => {
      const data = {
        name: this.state.formControls.name.value,
        image: this.state.data.image,
        league: this.props.currentLeague.currentLeague._id,
      };

      createTeam(data);
    };

    render() {
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
              OnBtnclick={this.CreateTeamProcess}
              disabled={false}
            >
              Cоздать
            </Button>
          </form>
        </div>
      );
    }
}

CreateTeam.defaultProps = {
  currentLeague: undefined,
};

CreateTeam.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentLeague: propTypes.object,
};
const mapStateToProps = (state) => ({
  currentLeague: state.currentLeague,
});

export default connect(mapStateToProps, null)(CreateTeam);
