import React, {Component} from 'react';
import './log.css';
import './checkbox.css';
import axios from 'axios';
// import 'pretty-checkbox/src/pretty.css';

let log_form = <div></div>;
let hide_form = true;

export default class Log extends Component {

    constructor(props){
        super(props)

        this.state = {
            last_seven: [false, false, false, false, false, false, false]
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            last_seven: newProps.logSeven
        })
    }

    check(day){
        console.log(day);
        var temp = this.state.last_seven
        if(temp[day]===false){
            temp[day] = true;
        }else{
            temp[day] = false;
        }
        
        axios.post(`/api/changebool/${this.props.goal}`, {day}).then(res=>{

                this.props.updateStreaks(res.data)

        })

        // this.setState({last_seven:temp})
    }

    form(){
        var d = new Date()
        
        if(hide_form){
            hide_form=false;
            log_form = (
                <div className='no_overflow'>
                    <div className='log_form'>
                        {this.provide_last_seven_days(d.getMonth()+1, d.getDate())}
                        {/* <button className='more'>more</button> */}
                    </div>
                </div>
            )
        }else{
            hide_form=true;
            log_form = ( 
                <div className='no_overflow'>
                    <div className='close_log_form'>
                        {this.provide_last_seven_days(d.getMonth()+1, d.getDate())}
                    </div>
                </div>
            )
        }

        this.forceUpdate();
    }

    provide_last_seven_days(todaysMonth,todaysDate){

        //much better way to do this, will shorten code significantly after reaching the mvp
        const thirtyone = [0,1,3,5,7,8,10,12];
        const thirty = [4,6,9,11];
        const twentyeight = [2]; //next leap day isn't until 2020

        var d = new Date()
        const weekdays = ['Sun.','Mon.','Tue.','Wed.','Thur.','Fri.','Sat.','Sun.','Mon.','Tue.','Wed.','Thur.','Fri.','Sat.','Sun.','Mon.','Tue.'];
        const future = 0; // THIS IS FOR TESTING PUROPOSES ONLY, SET BACK TO 0 OTHERWISE //Note that future won't work when past 7 days falls over 2 separate months

        var index = d.getDay()+future;
        console.log('day is ', weekdays[index])

            var array = [];

            for(let i = 0; i < 7; i++){
                if(todaysDate-i > 0){

                    this.state.last_seven[i]===true 
                    ?
                    array.push(<div key={i} className='log_day'>

                        <div className='the_day'>{weekdays[index+7-i]}</div>
                        <div className='the_date'>{todaysMonth} / {todaysDate-i+future}</div>
                        
                        <div className='from_the_right'>
                            <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} defaultChecked/>
                            <label htmlFor={i} className="check-box"></label> 
                        </div>
                    </div>)
                    :
                    array.push(<div key={i} className='log_day'>

                        <div className='the_day'>{weekdays[index+7-i]}</div>
                        <div className='the_date'>{todaysMonth} / {todaysDate-i+future}</div>
        
                        <div className='from_the_right'>
                            <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} />
                            <label htmlFor={i} className="check-box"></label> 
                        </div>
                    </div>)
                    ;
                }else{
                    if(todaysMonth===1){todaysMonth=13}
                    if(thirtyone.indexOf(todaysMonth-1)!==-1){

                        this.state.last_seven[i]===true 
                        ?
                        array.push(<div key={i} className='log_day'>
    
                            <div className='the_day'>{weekdays[index+7-i]}</div>
                            <div className='the_date'>{todaysMonth-1} / {todaysDate-i+31}</div>
                            
                            <div className='from_the_right'>
                                <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} defaultChecked/>
                                <label htmlFor={i} className="check-box"></label> 
                            </div>
                        </div>)
                        :
                        array.push(<div key={i} className='log_day'>
    
                            <div className='the_day'>{weekdays[index+7-i]}</div>
                            <div className='the_date'>{todaysMonth-1} / {todaysDate-i+31}</div>
            
                            <div className='from_the_right'>
                                <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} />
                                <label htmlFor={i} className="check-box"></label> 
                            </div>
                        </div>)
                        ;

                    }else if(thirty.indexOf(todaysMonth-1)!==-1){

                        this.state.last_seven[i]===true 
                        ?
                        array.push(<div key={i} className='log_day'>
    
                            <div className='the_day'>{weekdays[index+7-i]}</div>
                            <div className='the_date'>{todaysMonth-1} / {todaysDate-i+30}</div>
                            
                            <div className='from_the_right'>
                                <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} defaultChecked/>
                                <label htmlFor={i} className="check-box"></label> 
                            </div>
                        </div>)
                        :
                        array.push(<div key={i} className='log_day'>
    
                            <div className='the_day'>{weekdays[index+7-i]}</div>
                            <div className='the_date'>{todaysMonth-1} / {todaysDate-i+30}</div>
            
                            <div className='from_the_right'>
                                <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} />
                                <label htmlFor={i} className="check-box"></label> 
                            </div>
                        </div>)
                        ;

                    }else if(twentyeight.indexOf(todaysMonth-1)!==-1){
                        
                        this.state.last_seven[i]===true 
                        ?
                        array.push(<div key={i} className='log_day'>
    
                            <div className='the_day'>{weekdays[index+7-i]}</div>
                            <div className='the_date'>{todaysMonth-1} / {todaysDate-i+28}</div>
                            
                            <div className='from_the_right'>
                                <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} defaultChecked/>
                                <label htmlFor={i} className="check-box"></label> 
                            </div>
                        </div>)
                        :
                        array.push(<div key={i} className='log_day'>
    
                            <div className='the_day'>{weekdays[index+7-i]}</div>
                            <div className='the_date'>{todaysMonth-1} / {todaysDate-i+28}</div>
            
                            <div className='from_the_right'>
                                <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} />
                                <label htmlFor={i} className="check-box"></label> 
                            </div>
                        </div>)
                        ;
                    }
                }
            }

        return array;
    }

    render(){

        return (
            <div>

                {/* SWITCH */}
                {/* <label className='switch'>
                    <input type='checkbox' />
                    <div className='switch-btn'></div>
                </label> */}

                <button onClick={()=>this.form()} className='add_log'>+ Log</button>

                {log_form}
                
            </div>
        )
    }
}