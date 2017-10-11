import React, {Component} from 'react';
import './log.css';

export default class Log extends Component {

    constructor(props){
        super(props)

        this.state = {
            last_seven: [false, false, false, false, false, false, false]
        }
    }

    check(day){
        // console.log(prop)
        var temp = this.state.last_seven
        if(temp[day]===false){
            temp[day] = true;
        }else{
            temp[day] = false;
        }
        this.setState({last_seven:temp})
        console.log(this.state);    
    }

    render(){

        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var d = new Date()
        // var date = d.getDate()
        var index = d.getDay();
        days = days.slice(index).concat(days.slice(0,index))
 
        return (
            <div className='log' >
                
                <div className='add_log'>+ Log</div>
                <div className='days'>

                <div className='day seven'><div>{days[0]} (today)</div><input type="checkbox" onClick={(prop)=>this.check(6)}/></div>
                <div className='day six'><div>{days[6]}</div><input type="checkbox" onClick={(prop)=>this.check(5)}/></div>
                <div className='day five'><div>{days[5]}</div><input type="checkbox" onClick={(prop)=>this.check(4)}/></div>
                <div className='day four'><div>{days[4]}</div><input type="checkbox" onClick={(prop)=>this.check(3)}/></div>
                <div className='day three'><div>{days[3]}</div><input type="checkbox" onClick={(prop)=>this.check(2)}/></div>
                <div className='day two'><div>{days[2]}</div><input type="checkbox" onClick={(prop)=>this.check(1)}/></div>
                <div className='day one'><div>{days[1]}</div><input type="checkbox" onClick={(prop)=>this.check(0)} /></div>
        
                
                </div>
            </div>
        )
    }
}