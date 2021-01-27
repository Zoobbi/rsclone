import React, { Component } from 'react';
import './ChoiseTeam.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { loadTeamsFromDB } from '../../../utils/redux/reducers/teams';
import { getCurrentLeague, getUser } from '../../../utils/Cookie/cookie';
import Edit from '../../components/UI/Edit/Edit';
import Delete from '../../components/UI/Delete/Delete';
import Button from '../../components/UI/Button/Button';

class ChoiseTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league_id: undefined,
      homeTeam: undefined,
      visitTeam: undefined,
      isTeamChosen: false,
    };
  }

  componentDidMount() {
    if (this.props.currentLeague || getCurrentLeague()) {
      const currentLeague = this.props.currentLeague.currentLeague._id || getCurrentLeague()._id;
      this.props.fetchTeamsFromDB(currentLeague);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.teams !== prevProps.teams) {
      this.getTeamsList();
    }
  }

  choiceTeam = (isHomeTeam, teamId) => {
    const curTeam = this.props.teams.teams.filter((team) => team._id === teamId);
    console.log(this.state.visitTeam && this.state.visitTeam.name !== curTeam[0].name);
    if (isHomeTeam) {
      if (!this.state.visitTeam) {
        this.setState({
          homeTeam: curTeam[0],
        });
      } else if (this.state.visitTeam.name !== curTeam[0].name) {
        this.setState({
          homeTeam: curTeam[0],
        });
      }
    } else if (!this.state.homeTeam) {
      this.setState({
        visitTeam: curTeam[0],
      });
    } else if (this.state.homeTeam.name !== curTeam[0].name) {
      this.setState({
        visitTeam: curTeam[0],
      });
    }
  }

  getTeamsList = (isHomeTeam) => {
    const { teams } = this.props.teams;
    return teams.map((team, index) => (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
      <li
        aria-label="toggle menu"
        key={team._id + index}
        // onClick={this.choiseTeam.bind(this, isHomeTeam, team._id)}
        onClick={() => { this.choiceTeam(isHomeTeam, team._id); }}
      >
        {/* <Link to={`/teams/detals?team_id=${team._id}`}> */}
        {team.name}
        {/* </Link> */}
        {
            getUser().isAdmin
              ? (
                <div className="flex">
                  <Edit
                    path={`/team_patch/detals?team_id=${team._id}`}
                  />
                  <Delete
                    deleteItem={team.name}
                    onDelete={() => this.removeTeam(team._id)}
                  />
                </div>
              )
              : null
          }
      </li>
    ));
  }

  goToNextSettings = () => {
    if (this.state.visitTeam && this.state.homeTeam) {
      this.setState({ isTeamChosen: true });
    }
  }

  render() {
    return (
      <div className="ChoiseTeam-wrapper">
        {
          !this.state.isTeamChosen
            ? (
              <div className="ChoiseTeam">
                <h2>Выберете команды:</h2>
                <div className="ChoiseTeam-lists">
                  <div className="ChoiseTeam-list-wrap">
                    <h4>Гости</h4>
                    <div className="guest">
                      {this.state.visitTeam ? this.state.visitTeam.name : null}
                    </div>
                    <ul className="ChoiseTeam-list">
                      {this.getTeamsList(false)}
                    </ul>
                  </div>
                  <div className="ChoiseTeam-list-wrap">
                    <h4>Хозяева</h4>
                    <div className="home">
                      {this.state.homeTeam ? this.state.homeTeam.name : null}
                    </div>
                    <ul className="ChoiseTeam-list">
                      {this.getTeamsList(true)}
                    </ul>
                  </div>
                </div>
                <Button
                  type="changeAuthMode"
                  disabled={false}
                  OnBtnclick={this.goToNextSettings}
                >
                  Далее
                </Button>
              </div>
            )
            : <Redirect to={`/game/start?teams_id=${this.state.visitTeam._id},${this.state.homeTeam._id}`} />
        }

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTeamsFromDB: (leagueID) => {
    dispatch(loadTeamsFromDB(leagueID));
  },
});

const mapStateToProps = (state) => ({
  teams: state.teams,
  currentLeague: state.currentLeague,
});

ChoiseTeam.defaultProps = {
  currentLeague: undefined,
  fetchTeamsFromDB: 'null',
  teams: [],
};

ChoiseTeam.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentLeague: propTypes.object,
  fetchTeamsFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  teams: propTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiseTeam);
