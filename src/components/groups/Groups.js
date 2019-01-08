import React, { Component } from 'react'
import UserList from '../groups/UserList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
//import SearchBar from './SearchBar'



class Groups extends Component {
  state = {
    entry: ''
  }

  handleChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      entry: e.target.value
    })
  }

  render() {
    const { auth, users } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    //console.log(users);
    return (
      
      <div className="user-list container">
        <input type="text" id='title' onChange={this.handleChange} />
        <label htmlFor="title">Et coucou qui ?</label>
  
        <div className="row">
          <div className="col s12">
            <UserList users={users} entry={this.state.entry} />
          </div>
          
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  // console.log(state);
  return {
    //projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    //{ collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'users', orderBy: ['pseudo'] }
    //{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
  ])
)(Groups)