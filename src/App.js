import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MentionsLegales from './components/legal/Ml'
import Dashboard from './components/layout/Dashboard'
import 'react-image-lightbox/style.css'
import Groups from './components/groups/Groups'
import Chats from './components/chats/Chats'
import Profile from './components/user/Profile'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import './App.scss'

/**
|--------------------------------------------------
| Navbar et Router
|--------------------------------------------------
*/

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/galleries' component={Dashboard} />
            <Route exact path='/groups' component={Groups} />
            <Route exact path='/chats' component={Chats} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/mentionsLegales' component={MentionsLegales} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
