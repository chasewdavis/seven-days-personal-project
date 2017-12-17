import React, {Component} from 'react';
import Nav from '../nav/Nav.js';
import axios from 'axios';

import './search.css';

import Magnify from '../../svg/magnify.js';

let challengeButton = <button></button>;
let users = <div></div>;
let prompts = [];

export default class Search extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            searchInput: '',
            foundUsers: [],
            sentChallenges: [], // challenges that user has already sent so they cant send twice, displays properly etc.
            matches: [], // goals that you've sent that match with the users that are being displayed
            justSent: [] //prevents user from sending invite 2 or more times to a single user 
        }
    }

    componentWillUnmount(){
        this.setState({
            goalname: '',
            searchInput: '',
            foundUsers: [],
            sentChallenges: [],
            matches: []
        })
        users = <div></div>;
        prompts = [];
    }

    componentDidMount(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            this.setState({
                goalname: res.data[0].goalname,
            })
        });
        axios.get(`/api/getSetChallenges/${this.props.match.params.id}`)
        .then(challenges => {
            this.setState({sentChallenges:challenges.data})
        })
    }

    inputHandler(val){
        this.setState({
            searchInput: val
        })
    }

    findFriends(){
        if(this.state.searchInput){
            axios.get(`/api/findFriends/${this.props.match.params.id}/${this.state.searchInput}`)
            .then(friends=>{
                // console.log('the friends you are searching for...', friends.data);

                let mappedFriends = friends.data.map(e=>e.id)
                let mappedChallenges = this.state.sentChallenges.map(e=>e.userid)
                let matchesFound = mappedFriends.filter(e=>mappedChallenges.indexOf(e)!==-1?e:null)
                
                users = friends.data.map((e,i)=>{

                    if(matchesFound.indexOf(e.id)!==-1){
                        prompts.push('Challenge Sent')
                        return (
                            <div className='users_found' key={i}>
                                <div className='user_img'>
                                    <img src={e.img} />
                                </div>
                                <div className='user_name'>
                                    {e.user_name}
                                </div>
                                <button>Challenge Sent</button>
                            </div> 
                        )
                    }else{
                        prompts.push('Challenge')
                        return (
                            <div className='users_found' key={i}>
                                <div className='user_img'>
                                    <img src={e.img} />
                                </div>
                                <div className='user_name'>
                                    {e.user_name}
                                </div>
                                <button onClick={()=>{this.challengeFriend(e.id);this.changePrompt(i)}}>{prompts[i]}</button>
                            </div>
                        )
                    }
                })

                this.setState({foundUsers:friends.data, matches:matchesFound})
            })
        }

    }

    challengeFriend(user){

        if(this.state.justSent.indexOf(user)===-1){
            let temp = this.state.justSent;
            temp.push(user)
            this.setState({justSent:temp})

            // console.log(user)
            axios.post(`/api/challengeFriend/${this.props.match.params.id}`, { friend: user })
            .then(res=>{
                this.findFriends();
                // console.log('friend has been challenged', res) 
            })
        }
    }

    changePrompt(index){
        prompts[index] = 'Challenge Sent';
        this.forceUpdate();
    }

    render(){

        return (
            <div>
                <Nav title={this.state.goalname} />
                <div className='space_for_nav'></div>
                <div className='contain_search'>
                    <div className='search_bar'>
                        <button onClick={()=>this.findFriends()}><Magnify /></button>
                        <input onChange={(e)=>this.inputHandler(e.target.value)} placeholder='Find Friends...'></input>
                    </div>
                    <div className='users_contain'>
                    {users}
                    </div>
                </div>
            </div>
        )
    }
}