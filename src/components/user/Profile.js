import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { updateProfile } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { storage } from '../../config/fbConfig'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

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
            email: profile.email,
            image: null,
            profilIsReady: false
          }
        }

    }

    state = {
        pseudo: 'loading...',
        authId: 'loading...',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/etcoucoutoi.appspot.com/o/assets%2Fprofil.jpg?alt=media&token=7b89255a-e7df-4964-b027-892bc2330224',
        dob: new Date(),
        email: 'loading...',
        image: null,
        profileIsReady: false
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
 
        const image = acceptedFiles[0]
        const randomName = this.guid();
        const uploadTask = storage.ref(`pictures/avatars/${randomName}`).put(image)

        uploadTask.on('state_changed', 
        (snapshot) => {
          // progress
        }, 
        (error) => {
          // error
          console.log(error);
        }, 
        () => {
          //complete
          storage.ref('pictures/avatars').child(randomName).getDownloadURL().then(url => {
            this.setState({
              avatar: url
            })
          })
        });

    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

    handleUpload = (e) => {
        e.preventDefault()

        const {image} = this.state
        const randomName = this.guid();
        const uploadTask = storage.ref(`pictures/avatars/${randomName}`).put(image)

        uploadTask.on('state_changed', 
        (snapshot) => {
          // progress
        }, 
        (error) => {
          // error
          console.log(error);
        }, 
        () => {
          //complete
          storage.ref('pictures/avatars').child(randomName).getDownloadURL().then(url => {
            this.setState({
              avatar: url
            })
          })
          console.log(this.state)
        });
      }

    validateProfil = () =>{
        const profil = this.state
        const profilBase = this.props.profile;
        if(profil.pseudo !== profilBase.pseudo && profil.pseudo !== ''){
            this.setState({
                profileIsReady: true
            })
        } else {
            this.setState({
                profileIsReady: false
            })
        }
    }

    profileSender = () => {
        if(this.state.profileIsReady){
            return <button className="profilBtn btn domiB z-depth-0 center col s12" onClick={this.updateChange}>SAUVEGARDER</button>
        } else {
            return <button className="profilBtn btn domiB z-depth-0 center col s12" onClick={this.updateChange} disabled>SAUVEGARDER</button>
        }
    }

    handleChange = (e) => {
        if (e.target.files && e.target.id === 'image'){
            this.setState({
              image: e.target.files[0]
            })

        } else {
            this.setState({
                [e.target.id]: e.target.value
            }, () => { this.validateProfil() })
        }
            
    }

    handleChangeDate = (date, e) => {
        let datum = Date.parse(date)
        let dateTimseStamp = datum/1000

       const dateFormat = {
           seconds: dateTimseStamp
       }
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

        if (!auth.uid) return <Redirect to='/signin' /> 

        const date = new Date(this.state.dob.seconds * 1000)

        return (
            <div className="page profilPage">
            
                <div className="row">
                    <div className="col s6 offset-s3">
                        <img src={this.state.avatar} className="avatarProfile" alt="avatar manquant"/>
                    </div>
                </div>

                <Dropzone onDrop={this.onDrop}>
                    {({getRootProps, getInputProps, isDragActive}) => {
                    return (
                        <div
                        {...getRootProps()}
                        className={classNames('dropzone dropzoneProfile', {'dropzone--isActive': isDragActive})}
                        >
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>C'est bon tu peux lâcher !</p> :
                            <p>Clic ou poses ta nouvelle image de profil ici !</p>
                        }
                        </div>
                    )
                    }}
                </Dropzone>

                {/*

                <div className="row">
                    <div className="input-field center-align col s8 offset-s2">
                        <input type="file" id="image" className="row btn waves-effect waves-light" accept="image/*" onChange={this.handleChange} /><br/>
                        <button className="row btn waves-effect waves-light" onClick={this.handleUpload} ><i className="material-icons right">send</i>ENVOYER L'IMAGE</button>
                    </div>
                </div>

                */}

                <div className="row">
                    <div className="input-field col s6 offset-s3 profilePseudoInput">
                        
                        <input type="text" id='pseudo'  value={this.state.pseudo} className="inputContact center" onChange={this.handleChange} /> 
                        <span className="helper-text" data-error="wrong" data-success="right">Pseudo</span>
                    </div>
                </div>

                <div className="input-field col s6 offset-s3 profileDatePicker">
                    <DatePicker
                        dateFormat="d/MM/yyyy"
                        className="input-field col s6 offset-s3 center"
                        id='dob'
                        selected={date}
                        onChange={this.handleChangeDate}
                    />
                    <span className="helper-text" data-error="wrong" data-success="right">Date de naissance</span>
                </div>
                

                {/*
                <div className="row">
                    <div className="input-field col s6 offset-s3">
                        <span className="helper-text left">Ton email</span>
                        <input type="text" id='email'  value={this.state.email} className="inputContact" onChange={this.handleChange} />
                    </div>
                </div>
                */}
                
                {
                    this.profileSender()
                }
                
                
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