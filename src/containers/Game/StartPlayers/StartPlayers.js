import React, { Component } from 'react';
import './StartPlayers.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { parseAddresse } from '../../../utils/makeAdress/makeAdress';
import Button from '../../components/UI/Button/Button';
import Suite from '../Suite/Suite';

class StartPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: undefined,
      visitTeam: undefined,
      currentTeams: undefined,
      homeStart: [],
      visitStart: [],
      isStartsLinesCompleted: false,
    };
  }

  componentDidMount() {
    const queries = parseAddresse(this.props);
    this.setKeyIfExist(queries, 'teams_id', 'currentTeams');
    const ids = queries.teams_id;
    if (ids) {
      const idsArray = ids.split(',');
      this.setState({
        visitTeam: this.props.teams.teams.filter((team) => team._id === idsArray[0]),
        homeTeam: this.props.teams.teams.filter((team) => team._id === idsArray[1]),
      });
    }
  }

  setKeyIfExist = (queries, keyName, asName) => {
    if (queries[keyName] !== undefined) {
      this.setState({ [asName !== undefined ? asName : keyName]: queries[keyName] });
      return queries[keyName];
    } return undefined;
  };

  goTostartLine = (isHomeTeam, playerId) => {
    if (isHomeTeam && this.state.homeStart.length < 5) {
      const { homeStart } = this.state;
      const [...players] = this.state.homeTeam[0].players.filter((player) => player._id === playerId);

      homeStart.push(players[0]);
      this.setState({
        homeStart,
      });
    } else if (!isHomeTeam && this.state.visitStart.length < 5) {
      const { visitStart } = this.state;
      const [...players] = this.state.visitTeam[0].players.filter((player) => player._id === playerId);
      visitStart.push(players[0]);
      this.setState({
        visitStart,
      });
    }
  }

  goToBench = (isHomeTeam, playerId) => {
    if (isHomeTeam) {
      const filtered = this.state.homeStart.filter((player) => player._id !== playerId);
      this.setState({
        homeStart: filtered,
      });
    } else {
      const filtered = this.state.visitStart.filter((player) => player._id !== playerId);
      this.setState({
        visitStart: filtered,
      });
    }
  }

  // this.state.homeStart.find((item) => item._id === player._id)
  renderPlayerList = (isHomeTeam) => {
    if (this.state.currentTeams) {
      if (isHomeTeam) {
        return this.state.homeTeam[0].players
          .filter((starter) => this.state.homeStart
            .find((item) => item._id === starter._id) === undefined)
          .map((player, index) => (
            <div
              className="StartPlayers-item"
              key={player._id + index}
              role="button"
              tabIndex={0}
              aria-label="toggle menu"
              onKeyPress={() => {}}
              onClick={this.goTostartLine.bind(this, true, player._id)}
            >
              {
              player.name.full
}
            </div>
          ));
      }
      return this.state.visitTeam[0].players
        .filter((starter) => this.state.visitStart
          .find((item) => item._id === starter._id) === undefined)
        .map((player, index) => (
          <div
            className="StartPlayers-item"
            key={player._id + index}
            role="button"
            tabIndex={0}
            aria-label="toggle menu"
            onKeyPress={() => {}}
            onClick={this.goTostartLine.bind(this, false, player._id)}
          >
            {
              player.name.full
            }
          </div>
        ));
    }
    return null;
  }

  renderStartPlayers = (isHomeTeam) => {
    if (this.state.currentTeams) {
      if (isHomeTeam) {
        return this.state.homeStart.map((player, index) => (
          <div
            className="start-item"
            key={player._id + index}
            role="button"
            tabIndex={0}
            aria-label="toggle menu"
            onKeyPress={() => {}}
            onClick={this.goToBench.bind(this, true, player._id)}
          >
            {player.name.full}
          </div>
        ));
      }
      return this.state.visitStart.map((player, index) => (
        <div
          className="start-item"
          key={player._id + index}
          role="button"
          tabIndex={0}
          aria-label="toggle menu"
          onKeyPress={() => {}}
          onClick={this.goToBench.bind(this, false, player._id)}
        >
          {player.name.full}
        </div>
      ));
    }
    return null;
  }

  render() {
    return (
      <div className="StartPlayers">
        {/* eslint-disable-next-line no-nested-ternary */}
        { this.props.teams && this.props.teams.teams.length
          ? this.state.isStartsLinesCompleted
            ? (
              <Suite
                startLineHome={this.state.homeStart}
                startLineVisit={this.state.visitStart}
                homeTeam={this.state.homeTeam}
                visitTeam={this.state.visitTeam}
              />
            )
            : (
              <div className="padding">
                <div className="StartPlayers-content">
                  <div className="StartPlayers-block">
                    <div className="start">
                      <div>
                        <h4>Cтарт</h4>
                        {this.renderStartPlayers(false)}
                      </div>
                    </div>
                    <div className="StartPlayers-players-list">
                      <div>
                        <h4>
                          {this.state.visitTeam ? this.state.visitTeam[0].name : null}
                        </h4>
                        {this.renderPlayerList(false)}
                      </div>
                    </div>
                  </div>
                  <div className="StartPlayers-block">
                    <div className="StartPlayers-players-list">
                      <div>
                        <h4>
                          {this.state.homeTeam ? this.state.homeTeam[0].name : null}
                        </h4>
                        {this.renderPlayerList(true)}
                      </div>
                    </div>
                    <div className="start">
                      <div>
                        <h4>Cтарт</h4>
                        {this.renderStartPlayers(true)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StartPlayers-btn-wrapper">
                  <Button
                    type="primary"
                    disabled={this.state.homeStart.length < 5 || this.state.visitStart.length < 5}
                    OnBtnclick={() => { this.setState({ isStartsLinesCompleted: true }); }}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )
          : <Redirect to="/game" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teams: state.teams,
});

StartPlayers.defaultProps = {
  teams: [],
};

StartPlayers.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  teams: propTypes.object,
};

export default connect(mapStateToProps, null)(StartPlayers);
