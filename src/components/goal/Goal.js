import React, {Component} from 'react';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';

export default class Goal extends Component {
    render(){
        return (
            <div>
                <div className='space'></div>
                A particular goal.
                <Log/>
                <Streak/>
            </div>
        )
    }
}