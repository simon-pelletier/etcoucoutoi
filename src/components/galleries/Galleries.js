import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ImageSummary from './ImageSummary'
import { Redirect } from 'react-router-dom'
import './galleries.scss'

class Galleries extends Component {

    state = {
        gallerie: ''
      }

    getUserInfos = (author) => {

        const users = this.props.users
        
        if (users){
            return users
          .filter(user => {
            return user.authId === author
          }).map(user => {
            return (
              {
                pseudo: user.pseudo
              }
            )
          })
        }

      }


    render () {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        const { mainChat } = this.props

        return (
            <div className="container galleriePage">

                <div className="gallerie-list" id="grid">

                { mainChat && mainChat
                    .filter(msg => { 
                        return msg.link !== null
                    })
                    .map(msg => {
                        return(
                            <ImageSummary msg={msg} key={msg.id} user={this.getUserInfos(msg.author)} className="gridItem"/>
                        )
                    })
                
                }

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      mainChat: state.firestore.ordered.mainChat
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'mainChat', orderBy: ['createdAt', 'asc']},
      { collection: 'users', orderBy: ['pseudo', 'desc'] }
    ])
)(Galleries)