import React, { Component } from 'react'
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
import AvatarEditor from 'react-avatar-editor'

class Profile extends Component {

    constructor(props) {
        super(props);
        const profile = this.props.profile;

        if (!profile.isEmpty) {
            this.state = {
                pseudo: profile.pseudo,
                authId: profile.authId,
                avatar: profile.avatar,
                dob: profile.dob,
                email: profile.email,
                image: null,
                profilIsReady: false,
                avatarScale: 1,
                avatarPreview: null
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
        profileIsReady: false,
        avatarScale: 1,
        avatarPreview: null
    }

    setEditorRef = (editor) => this.editor = editor

    /**
    |--------------------------------------------------
    | Envoi des mises à jour de profil
    |--------------------------------------------------
    */
    sendChange = (e) => {
        e.preventDefault()
        const profile = this.state

        //Initialisation
        const profileBase = this.props.profile;
        this.setState({
            authId: profileBase.authId
        })

        if (profile.avatarPreview !== null) {
            this.saveAvatar()
        } else {
            this.props.updateProfile(this.state)
            this.setState({
                profileIsReady: false
            })
        }
    }

    /**
    |--------------------------------------------------
    | Envoi de l'avatar version blob
    |--------------------------------------------------
    */
    uploadAvatarBlob = (blob) => {

        const randomName = this.guid();
        let blobFormat = blob.slice(0, blob.size, "image/jpeg")

        const uploadTask = storage.ref(`pictures/avatars/${randomName}`).put(blobFormat)
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
                        avatar: url,
                        profileIsReady: true
                    })
                    this.props.updateProfile(this.state)
                    this.setState({
                        profileIsReady: false,
                        avatarPreview: null
                    })

                })
            });
    }

    /**
    |--------------------------------------------------
    | Sauvegarde et transformation de l'image en blob
    |--------------------------------------------------
    */
    saveAvatar = () => {
        if (this.editor) {
            const canvasURL = this.editor.getImageScaledToCanvas().toDataURL();
            let imageURL;
            fetch(canvasURL)
                .then(res => res.blob())
                .then(blob => (this.setState({
                    avatarPreview: imageURL,
                    avatarScale: 1
                }, this.uploadAvatarBlob(blob)))
                )
        }
    }

    /**
    |--------------------------------------------------
    | Au drop sur la zone
    |--------------------------------------------------
    */
    onDrop = (acceptedFiles, rejectedFiles) => {
        const image = acceptedFiles[0]
        this.setState({
            avatarPreview: image
        }, () => this.validateProfil())
    }

    /**
    |--------------------------------------------------
    | Création d'un nom d'image guid
    |--------------------------------------------------
    */
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
    |--------------------------------------------------
    | Vérification de changements sur le profil -> profilIsReady
    |--------------------------------------------------
    */
    validateProfil = () => {
        const profil = this.state
        const profilBase = this.props.profile;

        if (
            (profil.pseudo !== profilBase.pseudo && profil.pseudo !== '')
            ||
            (profil.dob.seconds !== profilBase.dob.seconds && profil.dob.seconds !== '')
            ||
            (profil.avatar !== profilBase.avatar)
            ||
            (profil.avatarPreview !== null)
        ) {
            this.setState({
                profileIsReady: true
            })
        } else {
            this.setState({
                profileIsReady: false
            })
        }
    }

    /**
    |--------------------------------------------------
    | Récupère l'avatar du profil connecté
    |--------------------------------------------------
    */
    getAvatar = () => {
        const profileBase = this.props.profile;
        return <img src={profileBase.avatar} className="avatarProfile" alt="avatar manquant" />
    }

    /**
    |--------------------------------------------------
    | Affichage du bouton d'envoi de profil
    |--------------------------------------------------
    */
    getSender = () => {
        if (this.state.profileIsReady) {
            return <button className="profilBtn btn domiB z-depth-0 center col s12" onClick={this.sendChange}>SAUVEGARDER</button>
        } else {
            return <button className="profilBtn btn domiB z-depth-0 center col s12" onClick={this.sendChange} disabled>SAUVEGARDER</button>
        }
    }

    /**
    |--------------------------------------------------
    | Changements de states
    |--------------------------------------------------
    */
    handleChange = (e) => {
        if (e.target.files && e.target.id === 'image') {
            this.setState({
                image: e.target.files[0]
            })
        } else if (e.target.id === 'avatarScale') {
            this.setState({
                avatarScale: Number(e.target.value)
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            }, () => { this.validateProfil() })
        }
    }

    /**
    |--------------------------------------------------
    | Conversion et changement de date de naissance vers les states
    |--------------------------------------------------
    */
    handleChangeDate = (date, e) => {
        let datum = Date.parse(date)
        let dateTimseStamp = datum / 1000
        const dateFormat = {
            seconds: dateTimseStamp
        }
        this.setState({
            dob: dateFormat
        }, () => { this.validateProfil() })
    }

    /**
    |--------------------------------------------------
    | componentWillReceiveProps - Profile
    |--------------------------------------------------
    */
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

    /**
    |--------------------------------------------------
    | Charge l'avatar temporaire de preview dans les states
    |--------------------------------------------------
    */
    getPreview = () => {
        if (this.state.avatarPreview !== null) {
            return this.state.avatarPreview
        } else {
            return this.state.avatar
        }
    }

    /**
    |--------------------------------------------------
    | Affichage de l'image de profil soit avec AvatarEditor soit directement via les states
    |--------------------------------------------------
    */
    getImageGlobal() {
        if (this.state.avatarPreview !== null) {
            return (
                <div>
                    <AvatarEditor
                        ref={this.setEditorRef}
                        image={this.getPreview()}
                        width={150}
                        height={150}
                        scale={this.state.avatarScale}
                    />
                    <p className="range-field row">
                        <input className="" type="range" id="avatarScale" min="1" max="5" value={this.state.avatarScale} onChange={this.handleChange} />
                    </p>
                </div>

            )
        } else {
            return (
                this.getAvatar()
            )
        }
    }

    render() {

        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const date = new Date(this.state.dob.seconds * 1000)

        return (
            <div className="page profilPage">

                {
                    this.getImageGlobal()
                }

                <Dropzone
                    accept="image/jpeg, image/png"
                    onDrop={this.onDrop}
                    multiple={false}
                >

                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div
                                {...getRootProps()}
                                className={classNames('dropzone dropzoneProfile', { 'dropzone--isActive': isDragActive })}
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

                <div className="row">
                    <div className="input-field col s6 offset-s3 profilePseudoInput">

                        <input type="text" id='pseudo' value={this.state.pseudo} className="inputContact center" onChange={this.handleChange} />
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

                {
                    this.getSender()
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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
        { collection: 'users', orderBy: ['pseudo', 'desc'] }
    ])
)(Profile)