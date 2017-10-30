import React, { Component } from 'react';
import './landing.css'
import scroll_down from '../../svg/down.svg';
let down = <img src={scroll_down} alt='scroll down to sign in'/>
let fade = true;

export default class Landing extends Component {

    constructor(props) {
        super(props);
        // this.handleScroll = this.handleScroll.bind(this);
    }

    // componentDidMount(){
    //     window.addEventListener('scroll', this.handleScroll);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    //   };

    // handleScroll(){
    //     if(fade){
    //         console.log('scrolled at least one time')
    //         fade = false
    //         down = <img className='fade_out' src={scroll_down} alt='scroll down to sign in'/>
    //         this.forceUpdate();
    //     }
    // }

    render(){
        console.log(window.pageYOffset)
        return (
            <div className='landing_backdrop'>

            {/* <div className='info'>
                {down}
                <div className='shadow'></div>
            </div> */}

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