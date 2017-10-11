import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <div>
                <div className='nav'>
                    <Link to='/nav/goal'>
                        <button>logout</button>
                    </Link>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}