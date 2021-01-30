import React, { Component } from 'react';
import './History.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadHistoriesFromDB } from '../../utils/redux/reducers/histories';
import { Loader } from '../components/UI/Loader/Loader';

class History extends Component {
  constructor() {
    super();
    this.state = {
      historyList: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchHistoriesFromDB();
  }

  getHistory = () => this.props.histories.histories.map((historyItem) => (
    <li key={historyItem._id}>
      <span>
        <strong>
          {historyItem.user_email}
          &nbsp;&nbsp;
        </strong>
      </span>
      {historyItem.text}
    </li>
  ))

  render() {
    return (
      <div className="History">
        {this.props.histories.histories
          ? (
            <ol className="History-list">
              {this.getHistory()}
            </ol>
          )
          : <Loader />}
      </div>
    );
  }
}

History.defaultProps = {
  fetchHistoriesFromDB: null,
  histories: {},
};

History.propTypes = {
  fetchHistoriesFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  histories: propTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  fetchHistoriesFromDB: (id) => {
    dispatch(loadHistoriesFromDB(id));
  },
});

const mapStateToProps = (state) => ({
  histories: state.histories,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
