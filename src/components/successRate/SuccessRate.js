import React,{Component} from 'react';
import './successRate.css'

export default class SuccessRate extends Component {

    constructor(props){
        super(props);

        this.state = {
            current: 0,
            stopAt: 0
        }
    }

    closure(current){
        console.log(current)
        this.setState({current:current})
    }

    componentWillReceiveProps(newProps){
        console.log('newProps are...', newProps)
        const stopAt = Math.round(newProps.total * 100);
        this.setState({stopAt:stopAt})

        const half = Math.floor(stopAt * .6);

        for(let i = half ; i <= stopAt; i++ ){
            setTimeout( () => this.closure(i), (i - half) * 50)
        }
    }

    render(){
        return(
            <div className='streaks rates'>
                <div className='header'>
                    Success Rate
                </div>
                <div className='percentage'>
                    {this.state.current}%
                </div>
            </div>
        )
    }
}