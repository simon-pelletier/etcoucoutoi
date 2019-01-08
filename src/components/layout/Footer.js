import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    
    render(){
        return(
            <div className="footer">
                ©2018 Et coucou toi ! - All rights reserved<br/>
                <Link className="linkFooter" to={'/mentionsLegales'} >Mentions Légales</Link>
            </div>
            
        );
    }
}

export default Footer;