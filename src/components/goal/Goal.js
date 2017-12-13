import React, {Component} from 'react';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';
import Nav from '../nav/Nav.js';
import axios from 'axios';
// import Settings from '../settings/Settings.js';
import Challengers from '../challengers/Challengers.js';
import Search from '../search/Search.js';
import {Link} from 'react-router-dom';
import Description from '../description/Description.js';

import './goal.css';
import './settings.css';

// dynamic svgs 
import Gear from '../../svg/gear.js';
import Next from '../../svg/next2.js';
import Back from '../../svg/next2reversed.js';
import X from '../../svg/letter-x.js';
import Right from '../../svg/right.js';

import {withRouter} from 'react-router';

// import editAddDescription from '../settings/Description.js' 

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
            forceAnUpdate: null,
            logSeven: [false,false,false,false,false,false,false],
            sent: null,
            originalgoal: null,
            description: ''
        }
        this.returnTitle = this.returnTitle.bind(this);
        this.updateStreaks = this.updateStreaks.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
        this.countCurrentStreak = this.countCurrentStreak.bind(this);
        this.countBestStreak = this.countBestStreak.bind(this);
        this.removeGoalFalse = this.removeGoalFalse.bind(this);
        // this.forceUpdate = this.forceUpdate.bind(this);
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
        this.setGoal();

        axios.get(`/api/getallbools/${this.props.match.params.id}`).then(res2=>{
            const array = res2.data.map(e=>e.successful);
            // console.log('array from get all bools after mapping', array)
            const best = this.countBestStreak(array);
            const current = this.countCurrentStreak(array);
            this.setState({
                currentstreak:current, 
                beststreak:best,
                logSeven: array.slice(0,7)
            });
        })
    }

    setGoal(){
        axios.get(`/api/goal/${this.props.match.params.id}`).then((res)=>{
            // console.log('the res is....... ',res.data)
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
        const best = this.countBestStreak(booleans);
        const current = this.countCurrentStreak(booleans);

        this.setState({
            currentstreak:current, 
            beststreak:best,
            logSeven: booleans.slice(0,7)
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

    returnTitle(){
        return this.state.title;
    }

    nameSettingHandler(val){
        this.setState({goalnametemp:val})
    }

    setNewName(){
        // console.log(this.state.goalnametemp)
        const goal = this.state.goalnametemp;
        axios.patch(`api/renameGoal/${this.props.match.params.id}`, { goal } )
        .then(res => {
            // console.log('the response from database is... ', res.data[0].goalname)
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
        // .then(res=>console.log(res))

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
        // .then(res=>console.log(res))

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
                // console.log(res) 
                this.props.history.push('/dashboard')
                }
            )
        }
    }

    handleDescriptionChange(val){
        // console.log(val)
        this.setState({description:val})
    }

    changeDescription(){
        if(this.state.description){
            axios.patch(`/api/addNewDescription/${this.props.match.params.id}`, {description: this.state.description})
            // .then(res=>console.log(res))
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
                <Nav id={this.props.match.params.id} title={this.state.goalname}/>
                <div className='space_for_nav'></div>
                <Log updateStreaks={this.updateStreaks} logSeven={this.state.logSeven} goal={this.props.match.params.id}/>
                <Streak current={this.state.currentstreak} best={this.state.beststreak}/>
                <Link to={`/search/${this.props.match.params.id}`}><button className='challenge_friends_btn'>Challenge Friends<div id='right'><Right/></div></button></Link>

                <Challengers best={this.countBestStreak} current={this.countCurrentStreak} sent={this.state.sent} original={this.state.originalgoal} id={this.props.match.params.id}/>

                {this.state.sent || this.state.originalgoal
                ? 
                <Description deleteGoal={this.deleteGoal} handleRemoveGoal={this.handleRemoveGoal} removeGoalFalse={this.removeGoalFalse} name={this.state.goalname} days={this.state.daysoutofseven} type={this.state.goodhabit}/> 
                : 
                settings } 
                {/* will make settings it's own component in the future */}

            </div>
        )
    }
}

export default withRouter(Goal);