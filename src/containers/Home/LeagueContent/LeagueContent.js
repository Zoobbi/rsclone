import React, { Component } from 'react';
import './LeagueContent.scss';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { loadLeaguesFromDB } from '../../../utils/redux/reducers/leagues';
import ButtonUi from '../../components/UI/Button/Button';
import { getUser } from '../../../utils/Cookie/cookie';
import Edit from '../../components/UI/Edit/Edit';
import Delete from '../../components/UI/Delete/Delete';
import { removeLeague } from '../../../utils/API/api';

class LeagueContent extends Component {
  componentDidMount() {
    this.props.fetchLeaguesFromDB();
  }

  removeLeague = (id) => {
    removeLeague(id);
  }

   renderLeague = () => (this.props.leagues.leagues !== undefined && this.props.leagues.leagues !== null
     ? this.props.leagues.leagues.map((item, index) => (
       <li
         key={item._id + index}
       >
         <Link to={`/leagues/detals?league_id=${item._id}`}>{item.name}</Link>
         {
           getUser().isAdmin
             ? (
               <div className="flex">
                 <Edit
                   path={`/leagues_patch/detals?league_id=${item._id}`}
                 />
                 <Delete
                   deleteItem={item.name}
                   onDelete={() => this.removeLeague(item._id)}
                 />
               </div>
             )
             : null
         }
       </li>
     ))
     : 'loader');

   render() {
     return (
       <div className="LeagueContent">
         <h2>Список активных лиг</h2>
         <ul className="LeagueContent-ul">
           {this.props.leagues !== null && this.renderLeague()}
         </ul>
         {getUser().isAdmin
           ? (
             <ButtonUi
               type="register"
               disabled={false}
             >
               <NavLink
                 className="newLeagueBtn"
               // to="/leagues_create"
                 to="/leagues_create"
               >
                 Создать новую лигу
               </NavLink>
             </ButtonUi>
           )
           : null}
       </div>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  fetchLeaguesFromDB: () => {
    dispatch(loadLeaguesFromDB());
  },
});

const mapStateToProps = (state) => ({
  leagues: state.leagues,
});

LeagueContent.defaultProps = {
  fetchLeaguesFromDB: 'null',
  leagues: [],
};

LeagueContent.propTypes = {
  fetchLeaguesFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  leagues: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContent);
