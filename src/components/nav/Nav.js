import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './nav.css'

export default class Nav extends Component {
    render(){
        return (
            <div>
                <div className='nav'>
                        <a href='http://localhost:3005/auth/logout'><button>log out</button></a>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}