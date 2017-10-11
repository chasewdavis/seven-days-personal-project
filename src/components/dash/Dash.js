import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dash.css';
import Goal from '../goal/Goal.js';

export default class dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            habitName: '',
            days: 7,
            prompt: '',
            goodHabit: null,
            goals: []
        }
    }

    slideDown(){
        console.log('func envoked')
        document.getElementsByClassName('good_bad')
    }

    good(){
        this.setState({
            goodHabit: true,
            prompt: ''
        })
    }
    bad(){
        this.setState({
            goodHabit: false,
            prompt:'Avoid'
        })
    }

    addOne(){
        if(this.state.days<7){
            this.setState({
                days: this.state.days+1
            })
        }
    }
    subOne(){
        if(this.state.days>1){
            this.setState({
                days: this.state.days-1
            })
        }
    }

    handleChange(val){
        this.setState({
            habitName:val
        })
    }

    setGoal(){

        const availibleNames = this.state.goals.map(e=>{
            return e.habitName; 
        });

        if(availibleNames.indexOf(this.state.habitName)!==-1){
            alert("YOU CAN'T USE THAT NAME AGAIN")
        }else if(this.state.goodHabit===null || this.state.habitName===''){
            alert('FINISH THE FORM');
        }else{

            let temp = this.state.goals.slice();

            temp.push({
                habitName: this.state.habitName,
                days: this.state.days,
                goodHabit: this.state.goodHabit
            })

            this.setState({
                goals: temp
            })

        }
    }

    render(){

        const goals = this.state.goals.map((e,i)=>{
            return (
                <Link to={`/nav/goal/${e.habitName}`} key={i}>
                    {e.habitName}
                </Link>
            )
        })

        return (
            <div>
                <div className='space'></div>
                <div className='contain'>
                <div className='new_goal'>
                    <div className='new_goal_header'>
                    <button onClick={()=>this.slideDown()} className='start'>+</button>
                    <div>new goal</div>
                    </div>
                    <div className='good_bad'>
                    <button onClick={()=>this.good()}>create new habit</button>
                    <button onClick={()=>this.bad()}>end an old habit</button>
                    </div>
                    <div className='name_and_num'>
                    <div>{this.state.prompt}</div>
                    <input onChange={(e)=>this.handleChange(e.target.value)}></input>
                    <div className='inc_dec'>
                        <button onClick={()=>this.subOne()}>-</button>
                        <p>{this.state.days}</p>
                        <button onClick={()=>this.addOne()}>+</button>
                    </div>
                    <div className='dpw'>
                        days per week
                    </div>
                    </div>
                    <button onClick={()=>this.setGoal()} className='submit'>
                        submit
                    </button>
                </div>

                </div>
                <div className='goals'>

                {/* <Link className='link' to='/nav/goal'><button>goal</button></Link> */}
                
                    {goals}

                </div>
            </div>
        )
    }
}