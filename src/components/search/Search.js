import React, {Component} from 'react';
import Nav from '../nav/Nav.js';
import axios from 'axios';
import search from '../../svg/search.svg';
import './search.css';
import right from '../../svg/send2.svg';

export default class Search extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            searchInput: '',
            foundUsers: [],
            sentChallenges: [], // challenges that user has already sent so they cant send twice, displays properly etc.
            matches: [] // goals that you've sent that match with the users that are being displayed
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
    }

    componentDidMount(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            this.setState({
                goalname: res.data[0].goalname,
            })
        }); 
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
                console.log('the friends you are searching for...', friends.data);
                this.setState({foundUsers:friends.data});
                // see if this challenge has already been sent / accepted 
                axios.get(`/api/getSetChallenges/${this.props.match.params.id}`)
                .then(challenges => {
                    console.log('the challenges that you\'ve sent...', challenges.data)
                    this.setState({sentChallenges:challenges.data},
                    () => {
                        //look for matches
                        let temp = this.state.foundUsers.map(e=>e.id)
                        console.log('the temp is..', temp)
                        let matches = this.state.sentChallenges.filter(e=> {
                            if(temp.indexOf(e.userid)!==-1){
                            return e
                            }
                        })
                        console.log('the matches are...', matches)

                        this.setState({matches: matches })  
                })
            })
        })
        }else{
            console.log('Input field is blank')
        }
    }

    challengeFriend(user){
        console.log(user)
        axios.post(`/api/challengeFriend/${this.props.match.params.id}`, { friend: user })
        .then(res=>console.log(res))
    }

    challengeButtonPrompt(val,index){

        if(this.state.matches[index]){
            console.log('matches that challenge button Propmt seeees', this.state.matches)
            console.log('what I\'m comparing', this.state.matches[index].userid, val.id)
            if(this.state.matches[index].userid === val.id){
                console.log('MATCH FOUND')
                return (
                    <div>
                        Challenge Sent
                    </div>
                )
            }else{
                return (
                    <div>
                        Challenge<img src={right} alt='right arrow'/>
                    </div>
                )
            }
        }else{
            return (
                <div>
                    Challenge<img src={right} alt='right arrow'/>
                </div>
            )
        }
    }

    render(){

        let users = this.state.foundUsers.map((e,i) => {
            // console.log(e)
            return ( 
                <div className='users_found' key={i}>
                    <div className='user_img'>
                        <img src={e.img} />
                    </div>
                        {/* {e.user_name} */}
                    <div className='user_name'>
                        {e.user_name}
                    </div>
                    <button onClick={()=>this.challengeFriend(e.id)}>

                        {/* should change based on whether or not a match is found */}
                        {this.challengeButtonPrompt(e,i)}
                        {/* Challenge<img src={right} alt='right arrow'/>  */}

                    </button>
                </div> 
            )
        })

        console.log(this.state)

        return (
            <div>
                <Nav title={this.state.goalname} />
                <div className='space_for_nav'></div>
                <div className='search_bar'>
                    <button onClick={()=>this.findFriends()}><img src={search} alt='search' /></button>
                    <input onChange={(e)=>this.inputHandler(e.target.value)} placeholder='Find Friends...'></input>
                </div>
                {users}
            </div>
        )
    }
}