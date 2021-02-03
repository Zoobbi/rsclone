import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#404669',
      contrastText: '#fff',
    },
  },
});

/* eslint no-extend-native: ["error", { "exceptions": ["Date"] }] */
Date.prototype.addDays = function dates(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const app = (
  <React.StrictMode>
    <MuiThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <BrowserRouter>

          <App />

        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>
);

ReactDOM.render(
  app,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
