import React,{Component} from 'react';
import './streak.css';

export default class Streak extends Component {


    componentWillReceiveProps(newProps){

    }

    render(){
        return(
            <div className='streaks'>
                <div className='header'>
                    Streaks
                </div>
                <div className='current'>
                    <div className='current_header'>
                        current
                    </div>
                    <div className='number'>
                        {this.props.current}
                    </div>
                </div>
                <div className='best'>
                    <div className='best_header'>
                        best
                    </div>
                    <div className='number'>
                        {this.props.best}
                    </div>
                </div>
            </div>
        )
    }
}