import React, {Component} from 'react';
import './log.css';
import './checkbox.css';
import axios from 'axios';
// import 'pretty-checkbox/src/pretty.css';

let log_form = <div></div>;
let log_form_full = <div></div>;
let hide_form = true;

export default class Log extends Component {

    constructor(props){
        super(props)

        this.state = {
            last_seven: [false, false, false, false, false, false, false]
        }
    }

    componentWillUnmount(){
        log_form = <div></div>
        hide_form = true;
    }

    componentDidMount(){
        this.setState({
            last_seven: this.props.logSeven
        })
        console.log('state after component mounts', this.props);
    }

    componentWillReceiveProps(newProps){
        // console.log('new props from log ', newProps)
        this.setState({
            last_seven: newProps.logSeven
        })
    }

    check(day){
        // console.log(day);
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
        
        if(hide_form){
            hide_form=false;
            log_form = (
                <div className='no_overflow'>
                    <div className='log_form'>
                        {this.provide_last_seven_days()}
                        <button className='more'>more</button>
                    </div>
                </div>
            )
        }else{
            hide_form=true;
            log_form = ( 
                <div className='no_overflow'>
                    <div className='close_log_form'>
                        {this.provide_last_seven_days()}
                    </div>
                </div>
            )
        }

        this.forceUpdate();
    }

    // provide_last_seven_days(todaysMonth,todaysDate){

    provide_last_seven_days(){
    
        var time = new Date().getTime();
        const weekdays = ['Sun.','Mon.','Tue.','Wed.','Thur.','Fri.','Sat.'];

        // future time in days converted to milliseconds;
        let future = 0; // THIS IS FOR TESTING PUROPOSES ONLY, SET BACK TO 0 OTHERWISE
        future *= (1000 * 60 * 60 * 24);

        return this.state.last_seven.map( (e, i) => {

            let offset_milliseconds = i * (1000 * 60 * 60 * 24);

            let date = new Date(time - offset_milliseconds + future);

            return (
                <div key={i} className='log_day'>

                    <div className='the_day'>{weekdays[date.getDay()]}</div>
                    <div className='the_date'>{date.getMonth()} / {date.getDate()} / {date.getFullYear()%100}</div>
                            
                    <div className='from_the_right'>
                        <input onClick={()=>{ this.check(i)}} type="checkbox" id={i} defaultChecked={this.state.last_seven[i]}/>
                        <label htmlFor={i} className="check-box"></label> 
                    </div>
                </div>
            )
        })

    }

    closure(){
        // console.log('from closure, state is...', this.state)
        console.log('closure function fired');
        log_form_full = (
            this.provide_last_seven_days()
        )
        console.log('log_form_full is... ', log_form_full[1].props.children[2].props.children[0].props.defaultChecked);
    }

    render(){
        // console.log('state from render is...', this.state)
        if(this.props.fullScreen){
            // console.log('fullscreen mode')

            this.closure();

            return (
                <div>
                    {/* {this.closure()} */}
                    {log_form_full}
                </div>
            )
        }else{
            // console.log('mobile view mode')
            return (
                <div>
                    <button onClick={()=>this.form()} className='add_log'>+ Log</button>
                    {log_form}      
                </div>
            )
        }
    }
}