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
            foundUsers: []
        }
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
            .then(friends=>{console.log(friends.data);this.setState({foundUsers:friends.data})})
        }else{
            console.log('Input field is blank')
        }
    }

    render(){

        let users = this.state.foundUsers.map((e,i) => {
            return ( 
                <div className='users_found' key={i}>
                    <div className='user_img'>
                        <img src={e.img} />
                    </div>
                        {/* {e.user_name} */}
                    <div className='user_name'>
                        {e.user_name}
                    </div>
                    <button>CHALLENGE<img src={right} alt='right arrow'/></button>
                </div> 
            )
        })

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