import React, {Component} from 'react';
import Nav from '../nav/Nav.js';
import axios from 'axios';
import search from '../../svg/search.svg';
import './search.css';

export default class Search extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: ''
        }
    }

    componentDidMount(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            console.log('the res is....... ',res.data)
            this.setState({
                goalname: res.data[0].goalname,
            })
        }); 
    }

    render(){
        return (
            <div>
                <Nav title={this.state.goalname} />
                <div className='space_for_nav'></div>
                <div className='search_bar'>
                    <button><img src={search} alt='search' /></button><input placeholder='Find Friends...'></input>
                </div>

            </div>
        )
    }
}