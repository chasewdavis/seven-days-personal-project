import React, {Component} from 'react';
import './log.css';
import './checkbox.css';
import './checkbox2.css';
import axios from 'axios';

export default ({ check, logSeven, logOpen, weeksBack}) => {

    // use logOpen to provide correct class to open or close
    // the way it opens and closes just depends on the screen width
    console.log('logSeven is...', logSeven);

    var time = new Date().getTime(); // todays time in milliseconds
    const weekdays = ['Sun.','Mon.','Tue.','Wed.','Thur.','Fri.','Sat.'];

    // future time in days converted to milliseconds;
    let future = 0; // THIS IS FOR TESTING PUROPOSES ONLY, SET BACK TO 0 OTHERWISE
    future *= (1000 * 60 * 60 * 24);      

    if(Array.isArray(logSeven)){    
        return logSeven.map( (e, i, arr) => {

            let week = weeksBack * 1000 * 60 * 60 * 24 * 7; //covert weeks into milliseconds

            console.log(week);

            let offset_milliseconds = i * (1000 * 60 * 60 * 24);

            let date = new Date(time - offset_milliseconds + future - week);

            return (
                <div key={i} className='log_day'>

                    <div className='the_day'>{weekdays[date.getDay()]}</div>

                    <div className='the_date'>{date.getMonth()+1} / {date.getDate()} / {date.getFullYear()%100}</div>
                    
                    <div className='check-box-parent'>
                        <input onChange={()=>{ check(i)}} type="checkbox" id={i} defaultChecked={arr[i]}/>
                        <label htmlFor={i} className="check-box"></label> 
                    </div>

                </div>
            )
        })
    }else{
        return (
            <div></div>
        )
    }
        
}

// why is there a conditional return statement?
// defaultChecked does not change after multiple rerenders (multiple rerenders is bad and I'm working on that as well)
// defaultChecked only accepts the first boolean, then refuses to update even after arr[i] is a new value
// temporary work around: parent logSeven prop has a default value set to null,
// when the values are retrieved from database, logSeven is turned into an array.
// the alternative solution was to avoid using a functional component and make use of ComponentWillRecieveProps to update state / rerender correct boolean array