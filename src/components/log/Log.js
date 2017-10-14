import React, {Component} from 'react';
// import './log.css';
import './alt.css';
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

    check(day){
        console.log(day);
        var temp = this.state.last_seven
        if(temp[day]===false){
            temp[day] = true;
        }else{
            temp[day] = false;
        }
        this.setState({last_seven:temp})
        console.log(this.state);    
    }

    form(){
        var d = new Date()
        var index = d.getDay();
        console.log('add or remove log_form')
        if(hide_form){
            hide_form=false;
            log_form = (
                <div className='log_form'>
                    {this.provide_last_seven_days(d.getMonth()+1, d.getDate())}
                    {/* <button className='more'>more</button> */}
                </div>
            )
        }else{
            hide_form=true;
            log_form = <div></div>;
        }

        this.forceUpdate();
    }

    provide_last_seven_days(todaysMonth,todaysDate){

        const thirtyone = [0,1,3,5,7,8,10,12];
        const thirty = [4,6,9,11];
        const twentyeight = [2]; //next leap day isn't until 2020

            var array = [];

            for(let i = 0; i < 7; i++){
                if(todaysDate-i > 0){

                    this.state.last_seven[i]===true 
                    ?
                    array.push(<div key={i} className='log_day'>{todaysMonth} / {todaysDate-i}
                        <input onClick={ ()=>{ this.check(i)} } type="checkbox" defaultChecked/> 
                    </div>)
                    :
                    array.push(<div key={i} className='log_day'>{todaysMonth} / {todaysDate-i}
                    <input onClick={ ()=>{ this.check(i)} } type="checkbox" /> 
                    </div>)
                    ;
                }else{
                    if(todaysMonth===1){todaysMonth=13}
                    if(thirtyone.indexOf(todaysMonth-1)!==-1){

                        this.state.last_seven[i]===true 
                        ?
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+31}
                            <input onClick={ ()=>{ this.check(i)} } type="checkbox" on='true' defaultChecked/>
                        </div>)
                        :
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+31}
                        <input onClick={ ()=>{ this.check(i)} } type="checkbox" /> 
                        </div>)
                        ;

                    }else if(thirty.indexOf(todaysMonth-1)!==-1){

                        this.state.last_seven[i]===true 
                        ?
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+30}
                            <input onClick={ ()=>{ this.check(i)} } type="checkbox" defaultChecked/>
                        </div>)
                        :
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+30}
                        <input onClick={ ()=>{ this.check(i)} } type="checkbox"/>
                        </div>)

                    }else if(twentyeight.indexOf(todaysMonth-1)!==-1){
                        
                        this.state.last_seven[i]===true 
                        ?
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+28}
                            <input onClick={ ()=>{ this.check(i)} } type="checkbox" defaultChecked/>
                        </div>)
                        :
                        array.push(<div key={i} className='log_day'>{todaysMonth-1} / {todaysDate-i+28}
                        <input onClick={ ()=>{ this.check(i)} } type="checkbox" />
                        </div>)
                    }
                }
            }

        return array;
    }

    render(){

        

        return (
            <div>
                
                <button onClick={()=>this.form()} className='add_log'>+ Log</button>

                {log_form}
        
                {/* {days} */}
                
            </div>
        )
    }
}