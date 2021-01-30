import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { store } from './utils/redux/store';
import Auth from './containers/Auth/Auth';
import InfoModal from './containers/components/UI/InfoModal/InfoModal';
import Layout from './hoc/Layout/Layout';
import HomeWrapper from './containers/Home/HomeWrapper/HomeWrapper';

import './App.scss';
import { token } from './utils/redux/actions';
import CreateLeague from './containers/components/CreateForms/Leagues/CreateLeague';
import { getUser, getUserToken } from './utils/Cookie/cookie';
import CreateTeam from './containers/components/CreateForms/Teams/CreateTeams';
import League from './containers/League/League';
import CreatePlayer from './containers/components/CreateForms/Players/CreatePlayers';
import Team from './containers/Team/Team';
import Player from './containers/Player/Player';
import UserProfile from './containers/UserProfile/UserProfile';
import PatchLeague from './containers/components/PatchForms/League/PatchLeague';
import PatchTeam from './containers/components/PatchForms/Team/PatchTeam';
import PatchPlayer from './containers/components/PatchForms/Player/PatchPlayer';
import GameWrapper from './containers/Game/GameWrapper/GameWrapper';
import StartPlayers from './containers/Game/StartPlayers/StartPlayers';
import { NoPage } from './containers/components/UI/NoPage/NoPage';
import GameHistory from './containers/GameHistory/GameHistory';
import History from './containers/History/History';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: getUserToken('token'),
      updateToken: null,
    };
    this.dispacthToken();
  }

    dispacthToken = () => {
      if (getUserToken('token')) {
        store.dispatch(token(getUserToken('token')));
      }
    };

    // eslint-disable-next-line no-shadow
       changeToken = (token) => {
         this.setState({
           token,
         });
       };

       render() {
         return (
           <>
             <InfoModal />
             <Layout>
               <Switch>
                 <Route
                   path="/auth"
                   exact
                   render={() => <Auth updateToken={this.changeToken} />}
                 />
                 {this.state.token !== undefined
                   ? (
                     <>
                       <Switch>
                         <Route path="/leagues_create" exact component={CreateLeague} />
                         <Route path="/leagues_patch/detals" exact component={PatchLeague} />
                         <Route path="/leagues/detals" exact component={League} />
                         <Route path="/team_create" exact component={CreateTeam} />
                         <Route path="/team_patch/detals" exact component={PatchTeam} />
                         <Route path="/teams/detals" exact component={Team} />
                         <Route path="/player_create" exact component={CreatePlayer} />
                         <Route path="/players/detals" exact component={Player} />
                         <Route path="/player_patch/detals" exact component={PatchPlayer} />
                         <Route path="/user" exact component={UserProfile} />
                         {getUser() && getUser().isAdmin ? <Route path="/game" exact component={GameWrapper} /> : null}
                         <Route path="/game/start" exact component={StartPlayers} />
                         <Route path="/games/detals" exact component={GameHistory} />
                         <Route path="/histories" exact component={History} />
                         <Route path="/" exact component={HomeWrapper} />
                         <Route component={NoPage} />
                       </Switch>
                     </>
                   )
                   : <Redirect to="/auth" />}
               </Switch>

             </Layout>
           </>
         );
       }
}

export default App;
