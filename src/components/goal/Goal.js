import React, {Component} from 'react';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';

export default class Goal extends Component {

    constructor(props){
        super(props)

        this.state = {

        }
    }

    

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