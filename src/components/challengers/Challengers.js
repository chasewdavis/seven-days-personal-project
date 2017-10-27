import React, {Component} from 'react';
import axios from 'axios';

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
        // if(limit){
        //     limit--;
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
        

        // axios.get(`/api/getallbools/${this.props.match.params.id}`).then(res2=>{
        //     const array = res2.data.map(e=>e.successful);
        //     console.log('array from get all bools after mapping', array)
        //     const best = this.props.countBestStreak(array);
        //     const current = this.props.countCurrentStreak(array);
        //     this.setState({
        //         currentstreak:current, 
        //         beststreak:best,
        //     });
        // })

        // }
    }

    render(){
        console.log('challengers /ees from state are now...',this.state)
        return (
            <div>
                Challengers
                <br/>
                og: {this.props.original}
                <br/>
                goal: {this.props.id}
                <br/>
            </div>
        )
    }
}