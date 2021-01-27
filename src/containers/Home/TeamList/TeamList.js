import React, { Component } from 'react';
import './TeamList.scss';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { loadTeamsFromDB } from '../../../utils/redux/reducers/teams';
import Button from '../../components/UI/Button/Button';
import { getUser } from '../../../utils/Cookie/cookie';
import Edit from '../../components/UI/Edit/Edit';
import Delete from '../../components/UI/Delete/Delete';
import { removeTeam } from '../../../utils/API/api';

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league_id: undefined,
      teams: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.league_id !== prevProps.league_id) {
      this.props.fetchTeamsFromDB(this.props.league_id);
    }
  }

  removeTeam = (id) => {
    removeTeam(id);
  };

  renderTeamsList = () => {
    if (this.props.teams.teams[0] !== undefined) {
      const teams = this.props.teams.teams.map((team, index) => (
        <li key={team._id + index}>
          <Link to={`/teams/detals?team_id=${team._id}`}>
            {team.name}
          </Link>
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
      return teams;
    }
    return (<li>команды не найдены</li>);
  }

  render() {
    return (
      <div className="TeamList">
        <h2>
          Команды:
        </h2>
        <ul className="TeamList-ul">
          {this.renderTeamsList()}
        </ul>
        {getUser().isAdmin
          ? (
            <Button
              type="primary"
              disabled={false}
            >
              <NavLink
                className="newLeagueBtn"
                to="/team_create"
              >
                Создать
              </NavLink>
            </Button>
          )
          : null}

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

TeamList.defaultProps = {
  league_id: undefined,
  fetchTeamsFromDB: 'null',
  teams: [],
};

TeamList.propTypes = {
  league_id: propTypes.string,
  fetchTeamsFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  teams: propTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
