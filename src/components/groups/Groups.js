import React, { Component } from 'react'
import UserList from '../groups/UserList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './groups.scss'



class Groups extends Component {
  state = {
    entry: ''
  }

  handleChange = (e) => {
    this.setState({
      entry: e.target.value
    })
  }

  render() {
    const { auth, users } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 

    return (
      
      <div className="user-list page groupPage">

        <div className="row">
          <div className="col l4 offset-l4 s8 offset-s2">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Et coucou qui ?</label>
          </div>
        </div>

        <div className="row">
          <div className="col s8 offset-s2">
            <UserList users={users} entry={this.state.entry} />
          </div>
        </div>

      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users', orderBy: ['pseudo'] }
  ])
)(Groups)