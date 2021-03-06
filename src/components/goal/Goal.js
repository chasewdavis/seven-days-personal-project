import React, {Component} from 'react';
import _ from 'lodash';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';
import Nav from '../nav/Nav.js';
import axios from 'axios';
// import Settings from '../settings/Settings.js';
import Challengers from '../challengers/Challengers.js';
import Search from '../search/Search.js';
import {Link} from 'react-router-dom';
import Description from '../description/Description.js';
import SuccessRate from '../successRate/SuccessRate.js';
import Chart from '../charts/chart.js';

// css
import './goal.css';
import './settings.css';
import './streakAndRate.css';

// dynamic svgs 
import Gear from '../../svg/gear.js';
import Next from '../../svg/next2.js';
import Back from '../../svg/next2reversed.js';
import X from '../../svg/letter-x.js';
import Right from '../../svg/right.js';

import {withRouter} from 'react-router';

// import editAddDescription from '../settings/Description.js' 

// empty divs be can eliminated by giving a class that contains display:none;
let pop_up_settings = <div></div>;
let open_pop_up = true;
let textBubbleOne = <div></div>;
let textBubbleTwo = <div></div>;
let textBubbleOneDisplayed = false;
let textBubbleTwoDisplayed = false;
let removeGoal = false;
let pop_up_description = <div></div>;
let open_description = true;

class Goal extends Component {

    constructor(props){
        super(props)

        this.state = {
            goalname: '',
            goalnametemp: '',
            daysoutofseven: null,
            userid: null,
            goodhabit: null,
            currentstreak: null,
            beststreak: null,
            successRateTimeFrame: 0,
            successRate:null,
            forceAnUpdate: null,
            allBooleans: null,
            logOpen:false,
            sent: null,
            originalgoal: null,
            description: '',
            logFormIsClosing: false,
            disableLogButton: false,
            weeksBack: 0,
            slide_log: 'center',
            week_in_transition: false,
            check_in_transition: -1,
            check_callBack_returned: true
        }
        this.returnTitle = this.returnTitle.bind(this);
        this.updateStreaks = this.updateStreaks.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
        this.countCurrentStreak = this.countCurrentStreak.bind(this);
        this.countBestStreak = this.countBestStreak.bind(this);
        this.removeGoalFalse = this.removeGoalFalse.bind(this);
        this.openLogForm = this.openLogForm.bind(this);
        this.check = this.check.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
    }

    componentWillUnmount(){
        pop_up_settings = <div></div>
        open_pop_up = true;
        textBubbleOne = <div></div>
        textBubbleTwo = <div></div>
        textBubbleOneDisplayed = false;
        textBubbleTwoDisplayed = false;
        removeGoal = false;
    }

    componentDidMount(){

        // updating state is expesive, do it sparingly

        this.setGoal(); //updates state

        axios.get(`/api/getallbools/${this.props.match.params.id}`).then(res2=>{
            const array = res2.data.map(e=>e.successful);
            const best = this.countBestStreak(array); 
            const current = this.countCurrentStreak(array);
            const rate = this.calcSuccessRate(array, this.state.successRateTimeFrame);
            this.setState({
                currentstreak:current, 
                beststreak:best,
                allBooleans: array,
                successRate: rate
            }); //updates state
        })
    }

    setGoal(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            this.setState({
                goalname: res.data[0].goalname,
                daysoutofseven: res.data[0].daysoutofseven,
                userid: res.data[0].userid,
                goodhabit: res.data[0].goodhabit,
                sent: res.data[0].sent,
                originalgoal: res.data[0].originalgoal,
                description: res.data[0].description
            })
        }); 
    }

    updateStreaks(booleans){

        booleans = booleans.map(e=>e.successful);

        // for success rate
        let rate = this.calcSuccessRate(booleans, this.state.successRateTimeFrame);

        // for streaks
        const best = this.countBestStreak(booleans);
        const current = this.countCurrentStreak(booleans);

        this.setState({
            currentstreak:current, 
            beststreak:best,
            allBooleans: booleans,
            successRate: rate
        });

    }

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

    calcSuccessRate(arr, timeFrame){
        // start counting at the first successfull day;
        let numerator = 0;
        let denominator = 1;

        if(timeFrame === 0 ){
            arr = _.dropRightWhile( arr, day => !day );
            if(arr.length){
                numerator = arr.reduce( (a,c) => Math.abs(a) + Math.abs(c) );
                denominator = arr.length
            }
        }else{
            numerator = arr.slice(0,timeFrame).reduce( (a,c) => Math.abs(a) + Math.abs(c) )
            denominator = timeFrame;
        }

        return Math.round( ( numerator / denominator ) * 100 );

    }

    handleRateChange(val){

        // add any options you'd like
        let options = [0, 7, 30];

        let opt = this.state.successRateTimeFrame;

        let index = options.indexOf(opt) + val;

        if(index === -1){
            opt = options[options.length - 1];
        } else if (index === options.length){
            opt = options[0];
        } else {
            opt = options[index];
        }

        this.setState({
            successRateTimeFrame: opt,
            successRate: this.calcSuccessRate(this.state.allBooleans, opt)
        });

    }

    returnTitle(){
        return this.state.title;
    }

    nameSettingHandler(val){
        this.setState({goalnametemp:val})
    }

    setNewName(){
        const goal = this.state.goalnametemp;
        axios.patch(`api/renameGoal/${this.props.match.params.id}`, { goal } )
        .then(res => {
            this.setState({goalname:res.data[0].goalname})
        });
    }

    editNameSetting(){
        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><X width='18px'/></button></div>

                    <div className='edit_name_settings'>
                        <div></div>
                        <div className='current_name'><span>Current Name:</span><span>{this.state.goalname}</span></div>
                        <div></div>
                        <div><input onChange={(e)=>this.nameSettingHandler(e.target.value)} placeholder='New Goal Name'></input></div>
                        <div></div>


                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><Back/>Back</button>
                            <button onClick={()=>{ this.setNewName(); this.displaySettings()}}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
            this.forceUpdate();
    }

    daysPerWeekHandler(num){
        //in case the user selects back and doesn't want to save their new selection
        let user_selects_back = this.state.daysoutofseven;

        this.setState({daysoutofseven:num}, () => {

            // this is gross, needs DRY er syntax

            document.querySelectorAll('button.num_btn').forEach(e=>e.classList.remove('edit_day_toggle'))
            
                    if(num===1){       
                        document.querySelector('#btn_1').classList.add('edit_day_toggle');
                    }else if(num===2){
                        document.querySelector('#btn_2').classList.add('edit_day_toggle');
                    }else if(num===3){
                        document.querySelector('#btn_3').classList.add('edit_day_toggle');
                    }else if(num===4){
                        document.querySelector('#btn_4').classList.add('edit_day_toggle');
                    }else if(num===5){
                        document.querySelector('#btn_5').classList.add('edit_day_toggle');
                    }else if(num===6){
                        document.querySelector('#btn_6').classList.add('edit_day_toggle');
                    }else if(num===7){
                        document.querySelector('#btn_7').classList.add('edit_day_toggle');
                    }
            this.editDaysPerWeek();
        });
        
        axios.patch(`api/renumberGoal/${this.props.match.params.id}`, {number:num})

    }

    editDaysPerWeek(){

        let day = this.state.daysoutofseven;

        let buttons = [];

        for(let i = 1; i <= 7; i++){
            if(day !== i){
                buttons.push(<button key={i} className='num_btn' id={`btn_${i}`} onClick={()=>this.daysPerWeekHandler(i)}>{i}</button>)
            }else{
                buttons.push(<button key={i} className='num_btn edit_day_toggle' id={`btn_${i}`} onClick={()=>this.daysPerWeekHandler(i)}>{i}</button>)
            }
        }

        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><X width='18px'/></button></div>

                    <div className='edit_name_settings'>
                        <div>Current: {this.state.daysoutofseven}</div>
                        <div className='edit_day_row'>
                            {buttons.slice(0,2)}
                        </div>
                        <div className='edit_day_row'>
                            {buttons.slice(2,5)}
                        </div>
                        <div className='edit_day_row'>
                            {buttons.slice(5,7)}
                        </div>
                        
                        <div>Days Per Week</div>

                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><Back/>Back</button>
                            <button onClick={()=>{ this.displaySettings()}}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        this.forceUpdate()
    }

    goodvsBadHandler(boolean){

        axios.patch(`api/resetBoolType/${this.props.match.params.id}`, {boolean: boolean})

        document.querySelector('button.selected').classList.remove('selected')

        if(boolean){
            this.setState({goodhabit:true}, () => {
                document.querySelector('#creatingNew').classList.add('selected');
                }
            )
        }else{
            this.setState({goodhabit:false}, () => {
                document.querySelector('#endingOld').classList.add('selected');
                } 
            )
        }
    }

    editGoodvsBad(){
        
        function displayBubbleOne(){
            //can build in a toggle
            if(!textBubbleOneDisplayed){
                textBubbleOneDisplayed = true;
                textBubbleOne = (
                    <div id='textBubble'>
                        <div id='triangle'></div>
                        stuff
                    </div>
                )
            }else{
                textBubbleOneDisplayed = false;
                textBubbleOne = (
                    <div></div>
                )
            }
        }

        function displayBubbleTwo(){
            //can build in a toggle
            if(!textBubbleTwoDisplayed){
                textBubbleTwoDisplayed = true;
                textBubbleTwo = (
                    <div id='textBubble'>
                        <div id='triangle'></div>
                        other stuff
                    </div>
                )
            }else{
                textBubbleTwoDisplayed = false;
                textBubbleTwo = (
                    <div></div>
                )
            }
        }

        let buttons = [];
        let boolean = this.state.goodhabit;
        for(let i = 1; i <= 2; i++){
            if(boolean){
                buttons.push(<button id='creatingNew' onClick={()=>this.goodvsBadHandler(true)} className='selected'>Creating a New Habit</button>)
                buttons.push(<button id='endingOld' onClick={()=>this.goodvsBadHandler(false)}>Ending an Old Habit</button>)
            }else{
                buttons.push(<button id='creatingNew' onClick={()=>this.goodvsBadHandler(true)}>Creating a New Habit</button>)
                buttons.push(<button id='endingOld' onClick={()=>this.goodvsBadHandler(false)} className='selected'>Ending an Old Habit</button>)
            }
        }

        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><X width='18px'/></button></div>

                    <div className='edit_name_settings'> {/*should change this to a more general name*/}
                        <div></div>
                        <div className='type_of_habit'>
                            {buttons[0]}
                            <button onClick={()=>{displayBubbleOne(); this.editGoodvsBad()}}>?</button>
                        </div>
                        <div>{textBubbleOne}</div>
                        <div className='type_of_habit'>
                            {buttons[1]}
                            <button onClick={()=>{displayBubbleTwo(); this.editGoodvsBad()}}>?</button>
                        </div>
                        <div>{textBubbleTwo}</div>

                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><Back/>Back</button>
                            <button onClick={()=>this.displaySettings()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        this.forceUpdate();
    }

    handleRemoveGoal(){
        if(!removeGoal){
            removeGoal=true;
        }else{
            removeGoal=false;
        }
    }

    removeGoalFalse(){
        removeGoal = false;
    }

    deleteGoal(){
        if(removeGoal){
            axios.delete(`/api/deleteGoal/${this.props.match.params.id}`)
            .then(res => {    
                this.props.history.push('/dashboard')
                }
            )
        }
    }

    handleDescriptionChange(val){
        this.setState({description:val})
    }

    changeDescription(){
        if(this.state.description){
            axios.patch(`/api/addNewDescription/${this.props.match.params.id}`, {description: this.state.description})
        }
    }

    editAddDescription(){
        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><X width='18px'/></button></div>

                    <div>
                        <div className='edit_description_settings'>
                            <textarea onChange={(e)=>this.handleDescriptionChange(e.target.value)} maxLength='280' rows='10' cols='35' placeholder='add a description...' defaultValue={this.state.description}></textarea>
                        </div>
                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><Back/>Back</button>
                            <button onClick={()=>{this.displaySettings();this.changeDescription()}}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        this.forceUpdate();
    }

    editRemoveGoal(){
        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><X width='18px'/></button></div>

                    <div className='edit_name_settings'> {/*should change this to a more general name*/}
                        <div></div>
                        <div>Are you sure you would like to permanently delete your goal?</div>
                        <div>
                            {/* SWITCH */}
                            <div className='delete_yes_no_switch'>
                            NO
                            <label className='switch'>
                                <input onChange={()=> this.handleRemoveGoal()} type='checkbox' />
                                <div className='switch-btn'></div>
                            </label>
                            YES
                            </div>
                        </div>
                        <div>
                            This action can not be undone.
                        </div>
                        <div></div>

                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; removeGoal = false; this.displaySettings()}}><Back/>Back</button>
                            <button onClick={()=>{ this.deleteGoal() }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        this.forceUpdate();
    }

    displaySettings(){
        if(open_pop_up){
            open_pop_up = false;
            pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><X width='18px'/></button></div>


                    <div className='all_settings_options'>
                        <div onClick={()=>this.editNameSetting()} className='settings_option'>Edit name<Next/></div>
                        <div onClick={()=>this.editDaysPerWeek()} className='settings_option'>Days Per Week<Next/></div>
                        <div onClick={()=>this.editGoodvsBad()} className='settings_option'>New / Old Habit<Next/></div>
                        <div className='settings_option'>Challenge Friends<Next/></div>
                        <div onClick={()=>this.editAddDescription()} className='settings_option'>Add Description<Next/></div>
                        <div onClick={()=>this.editRemoveGoal()} className='settings_option'>Remove Goal<Next/></div>
                    </div>


                </div>
            </div>
            )
            this.forceUpdate();
        }else{
            open_pop_up = true;
            pop_up_settings = <div></div>
            this.forceUpdate();
        }
    }

    openLogForm(){

        let exitTime = 800; // tied to css animation duration time
        if( window.innerWidth >= 1024 ) {
            exitTime = 250;
        }

        if(this.state.logOpen){
            // run closing animation first
            // closing animation length varies depending on screen width
            // breakpoint is at 1024px
            // what if user double clicks? must NOT have multiple timeout functions going at the same time
            if( !this.state.logFormIsClosing ){
                this.setState({logFormIsClosing: true});
                setTimeout(() => {
                    this.setState({
                        logOpen: false,
                        logFormIsClosing: false
                    })
                }, exitTime);
            }
        } else {
            this.setState({
                logOpen: true,
                disableLogButton: true
            })
            setTimeout(() => {
                this.setState({
                    disableLogButton: false
                })
            }, exitTime)
        }
        
    }

    check(day){
        
        // to avoid double clicking ugliness
        if(this.state.check_in_transition === -1 && this.state.check_callBack_returned){

            // consider how many weeks back

            let start = 0 + 7 * this.state.weeksBack;
            let stop = 7 + 7 * this.state.weeksBack;
            let seven = this.state.allBooleans.slice(start, stop);
            
            // sure there are less verbose ways to say this but this is very easy to read
            if(seven[day]===0){
                seven[day] = 1;
            }else if (seven[day]===1){
                seven[day] = -1;
            }else if (seven[day]===-1){
                seven[day] = 0;
            }

            let begin = this.state.allBooleans.slice(0, start);
            let end = this.state.allBooleans.slice(stop);

            let merged = [ ...begin, ...seven, ...end];

            // for immediate feedback
            this.setState(
                { allBooleans:merged, check_in_transition: day, check_callBack_returned: false }, 
                () => setTimeout( () => this.setState({check_in_transition: -1}), 650) // time tied to css
            );

            // animation must be done and promise returned in order to call function again
            axios.post(`/api/changebool/${this.props.match.params.id}`, { day:day, weeksBack:this.state.weeksBack })
            .then( res => {
                this.setState({check_callBack_returned: true})
            this.updateStreaks(res.data);
            })

        }

    }

    // no need to bind class, not using 'this' keyword
    determineCheckClass(day, transitionIndex, index){
        if(day === -1){
            return transitionIndex === index ? 'triple_check one_to_neg' : 'triple_check neg';
        }else if(day === 0){
            return transitionIndex === index ? 'triple_check neg_to_zero' : 'triple_check zero';
        }else if(day === 1){
            return transitionIndex === index ? 'triple_check zero_to_one' : 'triple_check one';
        }
    }

    changeWeek(val){

        // no double clicking
        if(!this.state.week_in_transition){

            let temp = this.state.weeksBack + val;
            let daysToAdd = 7 + (( this.state.weeksBack + val ) * 7 ) - this.state.allBooleans.length;

            // quickly animate logs
            this.setState(
                { slide_log: val > 0 ? 'right' : 'left' , week_in_transition: true },
                () => setTimeout( () => this.setState({weeksBack: temp, week_in_transition: false, slide_log:'center'}), 500 ) // connected with css animation time
            ); 

            if(daysToAdd > 0){
                axios.post(`/api/addPreviousDays/${this.props.match.params.id}`, {daysToAdd}).then(res => {
                    this.updateStreaks(res.data);
                })
            }

        }
    }

    render(){

        const settings = (
            <div>
                <button className='open_settings_btn' onClick={()=>this.displaySettings()}><Gear/>Settings</button>
                {pop_up_settings}
            </div>
        )

        const description = (
            <div>
                <button className='open_description' onClick={()=>this.displayDescription()}>Description / Settings</button>
                {pop_up_description}
            </div>
        )

        return (
            <div>
                <Nav openLogForm={() => this.openLogForm()} id={this.props.match.params.id} title={this.state.goalname}/>
                <div className='space_for_nav'></div>
                <div className='contain_goal'>

                    <div className='log_container_parent'>
                        {/* small screen only */}
                        <button disabled={this.state.disableLogButton} onClick={()=>this.openLogForm()} className='add_log'>+ Log</button>

                        {/* changes significantly based on screen width */}
                        <div className={
                            this.state.logOpen ? 
                            this.state.logFormIsClosing ? 'log_container close_me' : 'log_container appear' :
                            'hide_me log_container'
                        }>

                            {/* large screen  only */}
                            <div className='log_header'>
                                Log Last Seven Days
                                <button onClick={() => this.openLogForm()} className='close'>
                                <X width='18px'/>
                                </button>
                            </div>

                            {/* small screen only */}
                            {/* <button onClick={()=>this.openLogForm()} className='add_log'>+ Log</button> */}

                            {/* functional component creates list based on allBooleans */}
                            <div className={this.state.slide_log === 'right' ? 'slide_right animate_log' : this.state.slide_log === 'left' ? 'slide_left animate_log' : 'center animate_log'}>
                                <Log weeksBack={this.state.weeksBack + 1} check={this.check} logOpen={this.state.logOpen} allBooleans={this.state.allBooleans} determineCheckClass={this.determineCheckClass}/>
                                <Log weeksBack={this.state.weeksBack} check={this.check} logOpen={this.state.logOpen} allBooleans={this.state.allBooleans} check_in_transition={this.state.check_in_transition} determineCheckClass={this.determineCheckClass}/>
                                <Log weeksBack={this.state.weeksBack - 1} check={this.check} logOpen={this.state.logOpen} allBooleans={this.state.allBooleans} determineCheckClass={this.determineCheckClass}/>
                            </div>

                            <div className='log_prior_weeks'>
                                <button onClick={() => this.changeWeek(1)}>previous week</button>
                                <button onClick={() => this.changeWeek(-1) } disabled={this.state.weeksBack===0}>
                                    {this.state.weeksBack > 1 ? 'next week' : 'this week'}
                                </button>
                            </div>

                        </div>
                    </div>
                    
                    <div className='streakAndRate'>
                        <Streak current={this.state.currentstreak} best={this.state.beststreak}/>
                        <SuccessRate handleRateChange={(val) => this.handleRateChange(val)} successRate={this.state.successRate} timeFrame={this.state.successRateTimeFrame}/>
                    </div>

                    <Chart allDays={this.state.allBooleans}/>

                    <Link className='challenge_friends_link' to={`/search/${this.props.match.params.id}`}>
                        <button className='challenge_friends_btn'>Challenge Friends<div id='right'><Right/></div></button>
                    </Link>
                    
                    <Challengers 
                        best={this.countBestStreak} 
                        current={this.countCurrentStreak} 
                        sent={this.state.sent} 
                        original={this.state.originalgoal} 
                        id={this.props.match.params.id}
                    />
                    
                    {/* Combine Descripton and Settings into single component in future refactors */}
                    <div>

                        {
                            this.state.sent || this.state.originalgoal
                        ? 
                            <Description 
                                deleteGoal={this.deleteGoal} 
                                handleRemoveGoal={this.handleRemoveGoal} 
                                removeGoalFalse={this.removeGoalFalse} 
                                name={this.state.goalname} 
                                days={this.state.daysoutofseven} 
                                type={this.state.goodhabit}
                            /> 
                        : 
                            settings 
                        } 
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Goal);