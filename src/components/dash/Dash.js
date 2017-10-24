import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dash.css';
import axios from 'axios';
import Nav from '../nav/Nav.js';

import mail from '../../svg/mail.svg';
import graph from '../../svg/graph2.svg';
import x from '../../svg/letter-x.svg';

let form = '';
let new_form_ready = true;
let stage1 = false;
let fullInvite = <div></div>;

export default class dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            daysoutofseven: 0,
            prompt: '',
            goodHabit: null,
            goals: [],
            challenges: []
        }
    }

    componentWillUnmount(){
        form = '';
        new_form_ready = true;
        stage1 = false;
        //remove goal causes problems need to fix
    }

    componentDidMount(){
        //only works AS LONG AS SERVER FILE IS NOT EDITED
        // console.log('comp mounted')
        axios.get('/api/grabgoals').then(res=>{
            console.log('DASH COMPONENTE MOUNTING WITH RESPONSE OF...', res.data)
            this.setState({goals:res.data})

            res.data.map(e=>{
                
                axios.post(`/api/updatesuccesses/${e.id}`).then(res=>{
                    console.log(res.data)
                })

            })
            
        })

        axios.get('/api/grabChallenges').then(res=>{
            //these are the challenges sent from other users!!!
            console.log(res.data)
            this.setState({challenges:res.data})
        })

    }

    // slideDown(){
    //     // console.log('slide down');
    //     document.getElementsByClassName('good_bad')
    // }

    good(){
        stage1 = false;
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
        stage1 = false;
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
        new_form_ready = true;
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

            this.forceUpdate();
    }

    handleChange(val){
        this.setState({
            goalname:val
        })
    }

    form(){ //this function will open and close the form with a smooth css animation
        if(new_form_ready===true){
            stage1 = true;
            form = (
            <div className='open_current_form'>
                <div className='form'>
                    <div className='stack left'>
                        <button className='good' onClick={()=>this.good()}>Create New Habit</button>
                        <button className='bad' onClick={()=>this.bad()}>End An Old Habit</button>
                    </div>
                </div>
            </div>
            )
            new_form_ready= false;
            this.forceUpdate();
        }else if(stage1 === true){ //this step was added to prevent form does not have the class of open_current_form and close_current_form at the same time
            new_form_ready = true;
            form = (
                <div className='close_current_form'>
                    <div className='form'>
                        <div className='stack left'>
                            <button className='good' onClick={()=>this.good()}>Create New Habit</button>
                            <button className='bad' onClick={()=>this.bad()}>End An Old Habit</button>
                        </div>
                    </div>
                </div>
            )
            this.forceUpdate();
        }else {
            new_form_ready = true;
            form = <div className='close_current_form'>{form}</div>
            this.forceUpdate();
        }
    }

    openInvite(val){
        console.log(val);

        const invite = this.state.challenges.filter(e=>val===e.id)[0]
        console.log(invite)

        if(val !== 'close'){
            fullInvite = (
                <div>
                    <div className='overlay'></div>
                    <div className='full_invite'>
                        <div className='invite_content'>
                            <div className='invite_header'>
                            <button onClick={()=>this.openInvite('close')} className='close'><img src={x}/></button>
                            </div>
                            <img className='challenger_img' src={invite.img} alt='image of challenger'/>
                            <div className='invite_msg'>
                                {`${invite.user_name} has challenged you to ${invite.goalname} ${invite.daysoutofseven} days per week`}
                            </div>
                        </div>
                        <div className='bottom_row'>
                            <button>Decline</button>
                            <button>Accept</button>
                        </div>
                    </div>
                </div>
            )
        }else{
            fullInvite = <div></div>
        }
        this.forceUpdate();
    }

    render(){

        const goals = this.state.goals.map((e,i)=>{
            // console.log(e)
            return (
                <Link to={`/goal/${e.id}`} key={i}>
                    <button className='squared' >{e.goalname}<img src={graph} alt='graph'/></button>
                </Link>
            )
        })

        const invites = this.state.challenges.map((e,i)=>{
            return (
                <button className='invitation' onClick={()=>this.openInvite(e.id)} key={i}>New Challenge Invitation<img src={mail} alt='mail' /></button>
            )
        })

        return (
            <div>
                <Nav title={'Dashboard'}/>
                <div className='space_for_nav'></div>
                <div className='contain'>

                <button onClick={()=>this.form()} className='start' >Start Tracking</button>
                <div className='no_dash_overflow'>
                    {form}
                </div> 

                </div>
                <div className='goals'>

                    {goals.reverse()}

                </div>
                <div>
                    {invites}
                    {fullInvite}
                </div>
            </div>
        )
    }
}