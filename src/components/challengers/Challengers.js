import React, {Component} from 'react';
import axios from 'axios';

import './challenger.css'

let limit = 1;

export default class Challengers extends Component {

    constructor(props){
        super(props);

        this.state = {
            challengers: [
                { 
                    bools:[{successful:true},{successful:true},{successful:true},{successful:true},{successful:false},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true}],
                    id: 3308,
                    img: "https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no",
                    startdate : "2017 12 21",
                    user_name : "Bob Ross",
                    user_id: 5

                },
                { 
                    bools:[{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:false},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true}],
                    id: 3308,
                    img: "https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no",
                    startdate : "2017 12 21",
                    user_name : "Bob Ross",
                    user_id: 5

                },
                { 
                    bools:[{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:false},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true}],
                    id: 3308,
                    img: "https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no",
                    startdate : "2017 12 21",
                    user_name : "Bob Ross",
                    user_id: 5

                },
                { 
                    bools:[{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true},{successful:true}],
                    id: 3308,
                    img: "https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no",
                    startdate : "2017 12 21",
                    user_name : "Bob Ross",
                    user_id: 5

                },

            ],
            challengees: []
        }
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        limit = 1;
    }

    componentWillReceiveProps(newProps){
        // console.log('THE NEW PROPS ARE,', newProps)
        if(limit){
            limit--;
        //the person who challenged you
        
        if(newProps.original){

            axios.get(`/api/getChallengers/${newProps.original}`)
            .then(res=>{
                let temp = this.state.challengers.slice()
                temp.push(res.data[0])
                this.setState({challengers:temp})
            })
        }
        if(newProps.sent){    
            axios.get(`/api/getChallengees/${newProps.id}`)
            .then(res=>{
                console.log('res from getChallengers', res.data)
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

    readDate(date){
        date = date.split(' ')
        date.push(date[0])
        date = date.slice(1)
        date.splice(1,0,'/')
        date.splice(3,0,'/')
        return date.join(' ')
    }

    render(){

        let challengers = this.state.challengers.map((e,i)=>{

            let booleans = [];
            if(e.bools){
              booleans = e.bools.map(e => e.successful)
            }

            return (
                <div key={i} className='challengers_parent'>
                    <div className='challengers'>
                        <div>
                            <img src={e.img} alt='challenger'/>
                        </div>
                        <div>
                            <span>Current</span>
                            <span>{this.props.current(booleans)}</span>
                            <span>Days</span>
                        </div>
                        <div>
                            <span>Best</span>
                            <span>{this.props.best(booleans)}</span>
                            <span>Days</span>
                        </div>
                    </div>
                    <div className='name_div_parent'>
                        <div className='name_div'>
                            {e.user_name}
                        </div>
                        <div className='started_on'>
                             started:
                        </div>
                        <div>
                            {this.readDate(e.startdate)}
                        </div>
                    </div>
                </div>
            )
        })

        let challengees = this.state.challengees.map((e,i)=>{

            let booleans = [];
            if(e.bools){
              booleans = e.bools.map(e => e.successful)
            }

            return (
                <div key={i} className='challengers_parent'>
                    <div className='challengers'>
                        <div>
                            <img src={e.img} alt='challenger'/>
                        </div>
                        <div>
                            <span>Current</span>
                            <span>{this.props.current(booleans)}</span>
                            <span>Days</span>
                        </div>
                        <div>
                            <span>Best</span>
                            <span>{this.props.best(booleans)}</span>
                            <span>Days</span>
                        </div>
                    </div>
                    <div className='name_div_parent'>
                        <div className='name_div'>
                            {e.user_name}
                        </div>
                        <div className='started_on'>
                            accepted:
                        </div>
                        <div>
                            {this.readDate(e.startdate)}
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className='challengers_grand_parent'>
                {challengers}
                {challengees}
            </div>
        )
    }
}