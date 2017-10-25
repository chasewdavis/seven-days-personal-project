import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dash.css';
import axios from 'axios';
import Nav from '../nav/Nav.js';

import mail from '../../svg/mail.svg';
import graph from '../../svg/graph2.svg';
import x from '../../svg/letter-x.svg';
import user from '../../svg/user.svg';
import group from '../../svg/group.svg';

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
            acceptedGoals: [],
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

            console.log('responses from grab goals is...', res.data)

            let originals = res.data.filter(e=>e.originalgoal?null:e);
            let copys = res.data.filter(e=>e.originalgoal?e:null);

            this.setState({goals:originals, acceptedGoals:copys})

            res.data.map(e=>{
                
                axios.post(`/api/updatesuccesses/${e.id}`).then(res=>{
                    console.log(res.data)
                })

            })
            
        })

        this.grabAllChallenges();

    }

    grabAllChallenges(){
        axios.get('/api/grabChallenges').then(res2=>{

            // let accepted = res2.data.filter(e=>e.confirmed?e:null) // these goals need to be split
            let waiting = res2.data.filter(e=>e.confirmed?null:e)

            // console.log('accepted is...', accepted)
            console.log('waitinn is...', waiting)

            this.setState({
                // acceptedGoals: accepted, 
                challenges: waiting
            })
        })
    }

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

    acceptInvite(cid,gid){
        console.log(cid)
        axios.patch(`/api/acceptChallenge/${cid}`)
        .then(res=>{
            //need to also copy the goal for this user//
                axios.post(`api/copyChallenge/${gid}`)
                .then(res2=>{

                    // const accepted_goal = res2.data[0];
                    let temp = this.state.acceptedGoals;
                    temp.push(res2.data[0])
                    this.setState({acceptedGoals:temp})

                    console.log(res2)
                    
                })
            ////////////////////////////////////////////
            this.grabAllChallenges();
            console.log(res)
        })
    }

    declineInvite(cid){
        axios.delete(`/api/declineChallenge/${cid}`)
        .then(res=>{
            this.grabAllChallenges(); 
            console.log(res) 
        })
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
                            <button onClick={()=> {this.declineInvite(invite.challengeid); this.openInvite('close')}}>Decline</button>
                            <button onClick={()=> {this.acceptInvite(invite.challengeid, invite.id); this.openInvite('close')}}>Accept</button>
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
                    <button className='squared' ><img src={user} alt='one user' />{e.goalname}<img src={graph} alt='graph'/></button>
                </Link>
            )
        })

        //SHOULD ALTER SOMEWHAT
        const accepted_goals = this.state.acceptedGoals.map((e,i)=>{
            return (
                <Link to={`/goal/${e.id}`} key={i}>
                    <button className='squared dark' ><img src={group} alt='multiple users'/>{e.goalname}<img src={graph} alt='graph'/></button>
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
                <div className='goals'>
                    {accepted_goals}
                </div>
                <div>
                    {invites}
                    {fullInvite}
                </div>
            </div>
        )
    }
}