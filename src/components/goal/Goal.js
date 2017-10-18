import React, {Component} from 'react';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';
import Nav from '../nav/Nav.js';
import axios from 'axios';
import Settings from '../settings/Settings.js';
import './settings.css';
import gear from '../../svg/gear.svg';
let pop_up_settings = <div></div>;
let open_pop_up = true;

export default class Goal extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            daysoutofseven: null,
            userid: null,
            currentstreak: null,
            beststreak: null,
            forceAnUpdate: null,
            logSeven: [false,false,false,false,false,false,false]
        }
        this.returnTitle = this.returnTitle.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            this.setState({
                goalname: res.data[0].goalname,
                daysoutofseven: res.data[0].daysoutofseven,
                userid: res.data[0].userid,
            })
        });

        // axios.get(`/api/getDaysSinceLastVisit/${this.props.match.params.id}`).then(res=>{
        //     console.log('days since last visit is...' , res);
        // })

        axios.post(`/api/updatesuccesses/${this.props.match.params.id}`).then(res=>{
            console.log(res.data);
        
            axios.get(`/api/getallbools/${this.props.match.params.id}`)
            .then(res2=>{
                console.log('array prior to mapping ', res2.data);
                const array = res2.data.map(e=>e.success);
                console.log('array from get all bools after mapping', array)
                const best = this.countBestStreak(array);
                const current = this.countCurrentStreak(array);
                this.setState({
                    currentstreak:current, 
                    beststreak:best,
                    logSeven: array.slice(0,7)
                });
            })
        })




    }

    // check(day){
    //     console.log(day);
    //     var temp = this.state.last_seven
    //     if(temp[day]===false){
    //         temp[day] = true;
    //     }else{
    //         temp[day] = false;
    //     }
    //     this.setState({last_seven:temp})
    //     // axios.post(`/api/changebool/${this.props.goal}`, {day})
    //     // .then( console.log(this.props.updateStreak()) )
    //     console.log(this.state);    
    // }

    countCurrentStreak(arr){
        
        if(!arr[0]&!arr[1]){
          return 0;
        }else{
          
          let array = [], count = 0;
          
          arr.forEach(e=>e?count++:array.push(count));
          array.push(count);
          
          return !array[0] ? array[1] : array[0];
          
        }
    }

    countBestStreak(arr){
        
        let array = [], count = 0;

        for(var i = 0; i < arr.length; i++){
          if(arr[i]){
            count++;
          }else{
            array.push(count);
            count=0;
          }
        }
        array.push(count);
        
        return array.reduce((a,c)=>a>c?a:c);
    }

    returnTitle(){
        return this.state.title;
    }

    displaySettings(){
        if(open_pop_up){
            open_pop_up = false;
            pop_up_settings = 
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}>x</button></div>
                    <div className='settings_option'>Edit name</div>
                    <div className='settings_option'>Edit Days Per Week</div>
                    <div className='settings_option'>Good / Bad Habit</div>
                    <div className='settings_option'>Challenge Friends</div>
                    <div className='settings_option'>Remove Goal</div>
                </div>
            </div>
            this.forceUpdate();
        }else{
            open_pop_up = true;
            pop_up_settings = 
            <div></div>
            this.forceUpdate();
        }
    }

    render(){

        // console.log(this.state.beststreak)

        return (
            <div>
                <Nav id={this.props.match.params.id} title={this.state.goalname}/>
                <Log logSeven={this.state.logSeven} goal={this.props.match.params.id}/>
                <Streak current={this.state.currentstreak} best={this.state.beststreak}/>
                <button className='open_settings_btn' onClick={()=>this.displaySettings()}><img src={gear} />Settings</button>
                {pop_up_settings}
            </div>
        )
    }
}