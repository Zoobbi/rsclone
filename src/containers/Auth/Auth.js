import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Auth.scss';
import isJs from 'is_js';
import propTypes from 'prop-types';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import PlayerImage from '../components/Decoration/PlayerImage/PlayerImage';
import { register, login } from '../../utils/API/api';
import { getUserToken, removeUser, removeUserToken } from '../../utils/Cookie/cookie';
import { store } from '../../utils/redux/store';
import { token } from '../../utils/redux/actions';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      imageColor: '#fff',
      // eslint-disable-next-line react/no-unused-state
      isFormValid: false,
      formView: {
        isLogin: false,
      },
      formControls: {
        name: {
          value: '',
          type: 'text',
          label: 'Имя:',
          errorMessage: 'от 2 до 15 букв или цифр',
          valid: false,
          touched: false,
          validation: {
            required: true,
            nameRures: true,
          },
        },
        email: {
          value: '',
          type: 'email',
          label: 'Email:',
          errorMessage: 'Введити корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          label: 'Пароль:',
          errorMessage: 'Введити корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
    };
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name, index) => {
      if (this.state.formView.isLogin && index === 0) {
        return false;
      }
      isFormValid = formControls[name].valid && isFormValid;
      return true;
    });

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isFormValid,
      formControls,
    });

    this.changeValidationPlayerColor();
  };

  changeValidationPlayerColor = () => {
    const imageColor = this.state.isFormValid ? '#19FF24' : 'red';
    this.setState({ imageColor });
  };

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = isJs.email(value) && isValid;
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

  renderInputs = () => Object.keys(this.state.formControls).map((controlName, index) => {
    const control = this.state.formControls[controlName];

    if (this.state.formView.isLogin && index === 0) {
      return null;
    }

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

  changeAuthMode = () => {
    this.setState({
      formView: {
        isLogin: !this.state.formView.isLogin,
      },
    });
  };

  authAction = () => {
    const data = {
      name: this.state.formControls.name.value,
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    };

    if (this.state.formView.isLogin) {
      // eslint-disable-next-line no-shadow
      login(data, (token) => {
        // eslint-disable-next-line react/prop-types
        if (this.props.updateToken !== null) {
          this.props.updateToken(token);
        }

        // eslint-disable-next-line react/prop-types
        this.props.history.push('/');
      });

      return null;
    }
    register(data);
    return null;
  };

  logout = () => {
    removeUserToken();
    removeUser();
    store.dispatch(token(''));
    // eslint-disable-next-line react/prop-types
    this.props.history.push('/auth');
  };

  renderAuthContent = () => {
    if (getUserToken('token')) {
      return (
        <div className="already-register">
          <span> Вы уже зарегестрированы</span>
          <Button
            type="register"
            OnBtnclick={this.logout}
            disabled={false}
          >
            выйти
          </Button>
        </div>
      );
    }

    return (
      <form className="AuthForm">
        <PlayerImage imageColor={this.state.imageColor} />
        {this.renderInputs()}
        <div className="button-line">
          <Button
            type="register"
            OnBtnclick={this.authAction}
            disabled={!this.state.isFormValid}
          >
            {this.state.formView.isLogin ? 'Войти' : 'Регистрация'}
          </Button>
          <Button
            type="changeAuthMode"
            OnBtnclick={this.changeAuthMode}
            disabled={false}
          >
            {this.state.formView.isLogin ? 'Регистрация' : 'Войти'}
          </Button>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className="Auth">
        {this.renderAuthContent()}
      </div>
    );
  }
}

Auth.defaultProps = {
  updateToken: null,
};

Auth.propTypes = {
  updateToken: propTypes.func,
};

export default withRouter(Auth);
