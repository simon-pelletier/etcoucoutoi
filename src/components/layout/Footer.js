import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    
    render(){
        return(
            <div className="footer">
                Et coucou toi ! © 2019 - All rights reserved -
                <Link className="linkFooter" to={'/mentionsLegales'} > Mentions Légales</Link>
            </div>
            
        );
    }
}

export default Footer;