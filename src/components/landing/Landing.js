import React, { Component } from 'react';
import './landing.css'

export default class Landing extends Component {

    render(){
        // console.log(window.pageYOffset)
        return (
            <div className='landing_backdrop'>

            <div className='login_page'>
                <div className='login_box'>
                    <a href={ process.env.REACT_APP_LOGIN }>sign in</a>
                    <a href={ process.env.REACT_APP_LOGIN }>register</a>
                </div>
            </div>
            
            </div>
        )
    }
}