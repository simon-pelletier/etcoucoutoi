import React, { Component } from 'react';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import { updateProfile } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'




class Profile extends Component {

    constructor(props) {
        super(props);
        const profile = this.props.profile;

        if (!profile.isEmpty){
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
        pseudo: 'loading...',
        authId: 'loading...',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/etcoucoutoi.appspot.com/o/assets%2Fprofil.jpg?alt=media&token=7b89255a-e7df-4964-b027-892bc2330224',
        dob: new Date(),
        email: 'loading...'
    }

    handleChange = (e) => {
            this.setState({
                [e.target.id]: e.target.value
              })
    }

    handleChangeDate = (date, e) => {
        //console.log(this.state.dob)
        let datum = Date.parse(date)
        let dateTimseStamp = datum/1000
        //console.log(dateTimseStamp)
       /*e.preventDefault()*/
       const dateFormat = {
           seconds: dateTimseStamp
       }
       //console.log(dateFormat)
            this.setState({
                dob: dateFormat
            })
    }

    updateChange = (e) => {
        const profile = this.props.profile;
        
        e.preventDefault()
        this.setState({
            authId: profile.authId
        })
        this.props.updateProfile(this.state);
    }

    componentWillReceiveProps(nextProps) {
        const profile = nextProps.profile;
        this.setState({
            pseudo: profile.pseudo,
            authId: profile.authId,
            avatar: profile.avatar,
            dob: profile.dob,
            email: profile.email
        })
      }

 

    render () {

        const { auth } = this.props
        //console.log(this.state.dob.seconds)
        //console.log(this.state.dob)
        const date = new Date(this.state.dob.seconds * 1000)

        if (!auth.uid) return <Redirect to='/signin' /> 
        return (
            <div className="page profilPage">
            
                <div className="row">
                    <div className="col s6 offset-s3">
                        <img src={this.state.avatar} className="avatarProfile" alt=""/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <span className="helper-text left">Ton pseudo</span>
                        <input type="text" id='pseudo'  value={this.state.pseudo} className="inputContact" onChange={this.handleChange} /> 
                    </div>
                </div>

                

                {/*
                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <span className="helper-text left">Ta date de naissance</span>
                        <input type="text" id='dob' value={this.state.dob} className="inputContact" onChange={this.handleChange} />
                    </div>
                </div>
                */}

                
                <DatePicker
                    dateFormat="d/MM/yyyy"
                    className="input-field col s6 offset-s3 center"
                    id='dob'
                    selected={date}
                    onChange={this.handleChangeDate}
                />
                
                


                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <span className="helper-text left">Ton email</span>
                        <input type="text" id='email'  value={this.state.email} className="inputContact" onChange={this.handleChange} />
                    </div>
                </div>

                <button className="btn domiB z-depth-0 center col s12" onClick={this.updateChange}>SAUVEGARDER</button>
                
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
      updateProfile: (user) => dispatch(updateProfile(user))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users', orderBy: ['pseudo', 'desc']}
    ])
)(Profile)