import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './nav.css'
import menu from '../../menu.svg'
let sidebar = <div></div>;
let sidebar_right = false;

export default class Nav extends Component {

    slideOut(){
        if(sidebar_right===false){
            sidebar = (
                <div className='side_bar right'>
                <Link to='/dashboard'><button>dashboard</button></Link>
                <a className='logout' href='http://localhost:3005/auth/logout'><button>Log out</button></a>
                </div>
            )
            this.forceUpdate();
            sidebar_right=true;
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