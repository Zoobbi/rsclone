import React, { Component } from 'react';
import './League.scss';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { parseAddresse } from '../../utils/makeAdress/makeAdress';
import { loadLeagueFromDB } from '../../utils/redux/reducers/currentLeague';
import TeamList from '../Home/TeamList/TeamList';
import TopList from '../Home/TopList/TopList';
import GameHistory from '../Home/GameHIstoryList/GameHistory';

class League extends Component {
  constructor() {
    super();
    this.state = {
      currentLeague: undefined,
    };
  }

  componentDidMount() {
    const queries = parseAddresse(this.props);
    const leagueId = this.setKeyIfExist(queries, 'league_id');
    this.props.fetchLeagueFromDB(leagueId);
  }

setKeyIfExist = (queries, keyName, asName) => {
  if (queries[keyName] !== undefined) {
    this.setState({ [asName !== undefined ? asName : keyName]: queries[keyName] });
    return queries[keyName];
  } return undefined;
};

render() {
  return (
    <section className="League">
      <div className="LeagueContent-current">
        <h1>
          <span>
            Лига
            &quot;
            {this.props.currentLeague.currentLeague.name}
            &quot;
          </span>
        </h1>
        <div className="media-column center">
          <TeamList
            league_id={
                  this.props.currentLeague.currentLeague._id
              }
          />
          <TopList />
        </div>
        <div className="center">
          <GameHistory
            league_id={
              this.props.currentLeague.currentLeague._id
            }
          />
        </div>
      </div>
    </section>
  );
}
}

League.defaultProps = {
  // leagues: [],
  fetchLeagueFromDB: null,
  currentLeague: {},
};

League.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(League);
