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

    componentWillUnMount(){
        limit = 1;
    }

    componentWillReceiveProps(newProps){
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

            axios.get(`/api/getChallengees/${this.props.id}`)
            .then(res=>{
                console.log(res.data[0])
                let temp = this.state.challengees.slice()
                temp.push(res.data[0])
                this.setState({challengees:temp})
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
        }
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