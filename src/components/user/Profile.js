import React, { Component } from 'react';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import { updateProfile } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


class Profile extends Component {

    constructor(props) {
        super(props);
        const profile = props.profile;

        if (profile){
          this.state = {
            pseudo: profile.pseudo,
            authId: profile.authId,
            avatar: profile.avatar,
            dob: profile.dob,
            email: profile.email
          }
        }
       }

    state = {
        pseudo: '',
        authId: '',
        avatar: '',
        dob: '',
        email: ''
    }

    handleChange = (e) => {
        //console.log(this.state)
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    /*componentWillReceiveProps(nextProps) {
        const profile = nextProps.profile;
        this.setState({
            pseudo: profile.pseudo,
            authId: profile.authId,
            avatar: profile.avatar,
            dob: profile.dob,
            email: profile.email
        })
        //console.log(this.state)
      }*/

    render () {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        return (
            <div className="page container">
            
                <div className="row">
                    <div className="col s6 offset-s3">
                        <img src={this.state.avatar} className="avatarProfile" alt=""/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" id='pseudo'  value={this.state.pseudo} className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="pseudo" className='helperContact'>Ton pseudo</label>
                    </div>
                </div>

                

                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" id='dob'  value={this.state.dob} className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="dob" className='helperContact'>Ta date de naissance</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" id='email'  value={this.state.email} className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="email" className='helperContact'>Ton email</label>
                    </div>
                </div>

                
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateProfile: (creds) => dispatch(updateProfile(creds))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users', orderBy: ['pseudo', 'desc']}
    ])
)(Profile)

//export default Profile;

