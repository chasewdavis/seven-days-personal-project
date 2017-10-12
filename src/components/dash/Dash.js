import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './Dash.css';
import './alt.css';
// import Goal from '../goal/Goal.js';
import axios from 'axios';

let form = '';

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

    componentDidMount(){
        console.log('comp mounted')
        axios.get('/api/grabgoals').then(res=>{
            console.log(res)
            // this.setState({goals:res})
        })
    }

    slideDown(){
        console.log('slide down');
        document.getElementsByClassName('good_bad')
    }

    good(){
        this.setState({
            goodHabit: true,
            prompt: ''
        })
        form = (
            <div className='form'>good</div>
        )
        this.forceUpdate();
    }
    bad(){
        this.setState({
            goodHabit: false,
            prompt:'Avoid'
        })
        form = (
            <div className='form'>bad</div>
        )
        this.forceUpdate();
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

            axios.put('/api/setgoal', temp[temp.length-1]).then(res=> console.log(res))

            this.setState({
                goals: temp
            })

            // console.log(this.state.goals)
        }
    }

    form(){
        if(!form){
            form = (
            <div className='form'>
                <div className='stack left'>
                <button className='good' onClick={()=>this.good()}>create new habit</button>
                <button className='bad' onClick={()=>this.bad()}>end an old habit</button>
                </div>
            </div>
            )
            this.forceUpdate();
        }else{
            form = '';
            this.forceUpdate();
        }
    }

    render(){

        console.log(this.state)

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

                <button onClick={()=>this.form()} className='start' >Start Tracking</button>
                {form} 

                <button className='squared' >Bike to Work</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >Yoga After Work</button> 
                <button className='squared' >Code Everything</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 
                <button className='squared' >No More Dairy</button> 


                {/* <div className='new_goal'>
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
                </div> */}

                </div>
                <div className='goals'>

                {/* <Link className='link' to='/nav/goal'><button>goal</button></Link> */}
                
                    {goals}

                </div>
            </div>
        )
    }
}