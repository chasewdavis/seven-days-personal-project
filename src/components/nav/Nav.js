import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import menu from '../../svg/menu2.svg';
// import Settings from '../settings/Settings.js';
let sidebar = <div></div>;
let sidebar_right = false;

export default class Nav extends Component {

    slideOut(){
        if(sidebar_right===false){
            sidebar_right=true;
            sidebar = (
                <div className='parent_menu'>
                    <div className='side_bar right'>
                        <div className='space_for_nav'></div>
                        {/* <Link to={`/goal/${this.props.id}/settings`}><button className='side_bar_btn'>Settings</button></Link> */}
                        <Link to='/dashboard'><button className='side_bar_btn' onClick={()=>this.slideOut()}>Dashboard</button></Link>
                        <a className='logout' href='http://localhost:3005/auth/logout'><button>Log out</button></a>
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
                <div className='side_bar left'>sidebar</div>
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
                    <img onClick={()=>this.slideOut()} src={menu} alt='menu icon'/>
                    <div className='title'>{this.props.title}</div>
                </div>
                {sidebar}
                <div>
                    {/* {this.props.children} */}
                </div>
            </div>
        )
    }
}