import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import menu from '../../svg/menu2.svg';
import graph from '../../svg/graph2.svg';
// import Settings from '../settings/Settings.js';
import Svg from '../../svg/example.js';

let sidebar = <div></div>;
let sidebar_right = false;

export default class Nav extends Component {

    componentWillUnmount(){
        sidebar = <div></div>;
        sidebar_right = false;
    }

    slideOut(){
        if(sidebar_right===false){
            sidebar_right=true;
            sidebar = (
                <div className='parent_menu'>
                    <div className='side_bar right'>
                        <div className='space_for_nav'></div>
                        {/* <Link to={`/goal/${this.props.id}/settings`}><button className='side_bar_btn'>Settings</button></Link> */}
                        <Link to='/dashboard'><button className='side_bar_btn' onClick={()=>this.slideOut()}>Dashboard</button></Link>
                        <a className='logout' href={process.env.REACT_APP_LOGOUT}><button>Log out</button></a>
                    </div>
                    <div onClick={()=>this.slideOut()} className='close_menu'>
                        {/* invisible div to make navigation easeir
                            closes slide out menu
                         */}
                    </div>
                </div>
            )
            this.forceUpdate();
        }else{
            sidebar = (
                <div className='parent_menu'>
                    <div className='side_bar left'>
                        <div className='space_for_nav'></div>
                        {/* <Link to={`/goal/${this.props.id}/settings`}><button className='side_bar_btn'>Settings</button></Link> */}
                        <Link to='/dashboard'><button className='side_bar_btn' onClick={()=>this.slideOut()}>Dashboard</button></Link>
                        <a className='logout' href={process.env.REACT_APP_LOGOUT}><button>Log out</button></a>
                    </div>
                </div>
            )
            this.forceUpdate();
            sidebar_right=false;
        }
    }

    render(){
        // console.log(this.props.title());
        return (
            <div>
                <div className='nav'>

                        <svg onClick={()=>this.slideOut()} viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="512px" height="512px">
                            <g>
                                <path className='svg_color_two' d="M24,3c0-0.6-0.4-1-1-1H1C0.4,2,0,2.4,0,3v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V3z" />
                                <path className='svg_color_two' d="M24,11c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V11z" />
                                <path className='svg_color_two' d="M24,19c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V19z" />
                            </g>
                        </svg>

                        {/* <Svg/> */}

                    <div className='title'>{this.props.title}</div>
                    <button onClick={()=>this.props.openStartTracking()} className='start_or_log'>{this.props.title==='Dashboard'?'start tracking': 'Log'}<img className='nav_start_tracking' src={graph} alt='start new goal'/></button>
                </div>
                {sidebar}
                <div>
                    {/* {this.props.children} */}
                </div>
            </div>
        )
    }
}