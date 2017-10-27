import React, {Component} from 'react';
import axios from 'axios';

import './challenger.css'

let limit = 1;

export default class Challengers extends Component {

    constructor(props){
        super(props);

        this.state = {
            challengers: [],
            challengees: []
        }
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        limit = 1;
    }

    componentWillReceiveProps(newProps){
        console.log('new props are,', newProps)
        if(limit){
            limit--;
        //the person who challenged you
        
        if(newProps.original){

            axios.get(`/api/getChallengers/${newProps.original}`)
            .then(res=>{
                console.log(res.data[0])
                let temp = this.state.challengers.slice()
                temp.push(res.data[0])
                this.setState({challengers:temp})
            })
        }
        if(newProps.sent){    
            axios.get(`/api/getChallengees/${newProps.id}`)
            .then(res=>{
                
                this.setState({challengees:res.data}, ()=>{
                    res.data.forEach((e,i)=>{
                        axios.get(`api/getallbools/${e.id}`)
                        .then(booleans=>{

                            let temp = this.state.challengees.slice();

                            temp.forEach(user=>{
                                user.id === e.id ? user.bools = booleans.data : console.log('not found')
                            })

                            this.setState({challengees:temp})

                        })
                    })
                })
            })
        }

        }
    }

    render(){
        console.log(this.state)

        let challengers = this.state.challengers.map((e,i)=>{
            return (
                <div className='challengers_parent'>
                    <div key={i} className='challengers'>
                        <div>
                            <img src={e.img} />
                        </div>
                        <div>
                            <span>Current</span>
                            <span>7</span>
                            <span>Days</span>
                        </div>
                        <div>
                            <span>Best</span>
                            <span>18</span>
                            <span>Days</span>
                        </div>
                    </div>
                    <div className='name_div_parent'>
                        <div className='name_div'>
                            name
                        </div>
                        <div className='started_on'>
                            started on:
                        </div>
                        <div>
                            some date
                        </div>
                    </div>
                </div>
            )
        })

        let challengees = this.state.challengees.map((e,i)=>{
            return (
                <div className='challengers_parent'>
                    <div key={i} className='challengers'>
                        <div>
                            <img src={e.img} />
                        </div>
                        <div>
                            <span>Current</span>
                            <span>7</span>
                            <span>Days</span>
                        </div>
                        <div>
                            <span>Best</span>
                            <span>8</span>
                            <span>Days</span>
                        </div>
                    </div>
                    <div className='name_div_parent'>
                        <div className='name_div'>
                            name
                        </div>
                        <div className='started_on'>
                            started on:
                        </div>
                        <div>
                            some date
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                {challengers}
                {challengees}
            </div>
        )
    }
}