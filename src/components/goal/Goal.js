import React, {Component} from 'react';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';
import Nav from '../nav/Nav.js';
import axios from 'axios';

export default class Goal extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            daysoutofseven: null,
            userid: null,
            currentstreak: null,
            beststreak: null
        }
        this.returnTitle = this.returnTitle.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            // console.log('response is.. ' , res.data[0]);
            this.setState({
                goalname: res.data[0].goalname,
                daysoutofseven: res.data[0].daysoutofseven,
                userid: res.data[0].userid,
            })
        });
        axios.post(`/api/updatesuccesses/${this.props.match.params.id}`).then(res=>{
            console.log(res);
        })
    }

    returnTitle(){
        return this.state.title;
    }

    render(){

        // console.log(this.props.match.params.id) //this will grab id on url

        // console.log('state of goal component is ',this.state)

        return (
            <div>
                <Nav title={this.state.goalname}/>
                <Log/>
                {/* <Streak/> */}
            </div>
        )
    }
}