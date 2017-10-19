import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dash.css';
import axios from 'axios';
import Nav from '../nav/Nav.js';

let form = '';
let new_form_ready = false;

export default class dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            daysoutofseven: 0,
            prompt: '',
            goodHabit: null,
            goals: []
        }
    }

    componentDidMount(){
        //only works AS LONG AS SERVER FILE IS NOT EDITED
        // console.log('comp mounted')
        axios.get('/api/grabgoals').then(res=>{
            console.log(res.data)
            this.setState({goals:res.data})

            res.data.map(e=>{
                
                axios.post(`/api/updatesuccesses/${e.id}`).then(res=>{
                    console.log(res.data)
                })

            })
            
        })

    }

    // slideDown(){
    //     // console.log('slide down');
    //     document.getElementsByClassName('good_bad')
    // }

    good(){
        this.setState({
            goodHabit: true,
            prompt: ''
        })
        form = (
            <div className='form'>
                <input onChange={(e)=>this.handleChange(e.target.value)} className='form_input' placeholder='name your habit'/>
                <button onClick={()=>this.days()} className='next'>next</button>
            </div>
        )
        this.forceUpdate();
    }
    bad(){
        this.setState({
            goodHabit: false,
            prompt:'Avoid'
        })
        form = (
            <div className='form'>
                <input onChange={(e)=>this.handleChange(e.target.value)} className='form_input' placeholder='Avoid...'/>
                <button onClick={()=>this.days()} className='next'>next</button>
            </div>
        )
        this.forceUpdate();
    }

    complete(val){
        this.setState({daysoutofseven:val})
        form = <div className='completed'></div>

        let temp = this.state.goals.slice();
        
                    temp.push({
                        goalname: this.state.goalname,
                        daysoutofseven: val,
                        goodHabit: this.state.goodHabit
                    })
        
                    axios.put('/api/setgoal', temp[temp.length-1]).then(res=> {
                        console.log('respoonse is...',res.data[0].id)
                        temp[temp.length-1].id = res.data[0].id


                        axios.put('/api/successes', {id:res.data[0].id}).then(res2=> {
                            console.log(res2);
                        }).then(res3=>{

                            this.setState({
                                goals: temp
                            })

                        })
                    })
        
                    

                    // this.setState({
                    //     goals: temp
                    // })
        
    }

    days(){
            form = (
                <div className='form'>
                    <div className='row_one'>
                        <button onClick={()=>this.complete(1)}>1</button>
                        <button onClick={()=>this.complete(2)}>2</button>
                        <button onClick={()=>this.complete(3)}>3</button>
                    </div>
                    <div className='row_two'>
                        <button onClick={()=>this.complete(4)}>4</button>
                        <button onClick={()=>this.complete(5)}>5</button>
                        <button onClick={()=>this.complete(6)}>6</button>
                        <button onClick={()=>this.complete(7)}>7</button>
                    </div>
                    <div className='row_three'>
                    Days Per Week
                    </div>
                </div>
            )
            new_form_ready = true;


            // let temp = this.state.goals.slice();

            // temp.push({
            //     goalname: this.state.goalname,
            //     days: this.state.days,
            //     goodHabit: this.state.goodHabit
            // })

            // axios.put('/api/setgoal', temp[temp.length-1]).then(res=> console.log(res))

            // this.setState({
            //     goals: temp
            // })

            this.forceUpdate();
    }

    // addOne(){
    //     if(this.state.daysoutofseven<7){
    //         this.setState({
    //             daysoutofseven: this.state.daysoutofseven+1
    //         })
    //     }
    // }
    // subOne(){
    //     if(this.state.daysoutofseven>1){
    //         this.setState({
    //             daysoutofseven: this.state.daysoutofseven-1
    //         })
    //     }
    // }

    handleChange(val){
        this.setState({
            goalname:val
        })
    }

    // setGoal(){

    //     const availibleNames = this.state.goals.map(e=>{
    //         return e.goalname; 
    //     });

    //     if(availibleNames.indexOf(this.state.goalname)!==-1){
    //         alert("YOU CAN'T USE THAT NAME AGAIN")
    //     }else if(this.state.goodHabit===null || this.state.goalname===''){
    //         alert('FINISH THE FORM');
    //     }else{

    //         let temp = this.state.goals.slice();

    //         temp.push({
    //             goalname: this.state.goalname,
    //             days: this.state.days,
    //             goodHabit: this.state.goodHabit
    //         })

    //         axios.put('/api/setgoal', temp[temp.length-1]).then(res=> console.log(res))

    //         this.setState({
    //             goals: temp
    //         })

    //         // console.log(this.state.goals)
    //     }
    // }

    form(){
        if(!form || new_form_ready===true){
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

        const goals = this.state.goals.map((e,i)=>{
            // console.log(e)
            return (
                <Link to={`/goal/${e.id}`} key={i}>
                    <button className='squared' >{e.goalname}</button>
                </Link>
            )
        })

        return (
            <div>
                <Nav title={'Dashboard'}/>
                <div className='space_for_nav'></div>
                <div className='contain'>

                <button onClick={()=>this.form()} className='start' >Start Tracking</button>
                {form} 

                {/* <button className='squared' >Bike to Work</button> 
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
                <button className='squared' >No More Dairy</button>  */}


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
                
                    {goals.reverse()}

                </div>
            </div>
        )
    }
}