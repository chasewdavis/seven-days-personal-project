import React, {Component} from 'react';
// import './log.css';
import './alt.css';

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

    provide_last_ten_days(todaysMonth,todaysDate){

        const thirtyone = [0,1,3,5,7,8,10,12];
        const thirty = [4,6,9,11];
        const twentyeight = [2]; //next leap day isn't until 2020

            var array = [];

            for(var i = 1; i < 10; i++){
                if(todaysDate-i > 0){

                    array.push(<div key={i} className='log_day'>{todaysMonth} / {todaysDate-i}</div>)

                }else{
                    if(todaysMonth===1){todaysMonth=13}
                    if(thirtyone.indexOf(todaysMonth-1)!==-1){

                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+31}</div>)

                    }else if(thirty.indexOf(todaysMonth-1)!==-1){

                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+30}</div>)

                    }else if(twentyeight.indexOf(todaysMonth-1)!==-1){
                        
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+28}</div>)
                    }
                }
            }

        return array;
    }

    render(){

        var d = new Date()
        var index = d.getDay();
        let days = this.provide_last_ten_days(d.getMonth()+1, d.getDate())

        return (
            <div className='log' >
                
                <div className='add_log'>+ Log</div>
                <div className='days'>
                {/* American style dates */}
                <div className='log_day'><div>{`${d.getMonth()+1} / ${d.getDate()} `} (today)</div><input type="checkbox" onClick={(prop)=>this.check(6)}/></div>
                {days}
                {/* <div className='day six'><div>{days[6]}</div><input type="checkbox" onClick={(prop)=>this.check(5)}/></div>
                <div className='day five'><div>{days[5]}</div><input type="checkbox" onClick={(prop)=>this.check(4)}/></div>
                <div className='day four'><div>{days[4]}</div><input type="checkbox" onClick={(prop)=>this.check(3)}/></div>
                <div className='day three'><div>{days[3]}</div><input type="checkbox" onClick={(prop)=>this.check(2)}/></div>
                <div className='day two'><div>{days[2]}</div><input type="checkbox" onClick={(prop)=>this.check(1)}/></div>
                <div className='day one'><div>{days[1]}</div><input type="checkbox" onClick={(prop)=>this.check(0)} /></div> */}
                <button className='more'>more</button>
                
                </div>
            </div>
        )
    }
}