import React, {Component} from 'react';
import Log from '../log/Log.js';
import Streak from '../streak/Streak.js';
import Nav from '../nav/Nav.js';
import axios from 'axios';
import Settings from '../settings/Settings.js';
import './settings.css';
import gear from '../../svg/gear.svg';
import next from '../../svg/next2.svg';
import back from '../../svg/next2reversed.svg';
import x from '../../svg/letter-x.svg';
import {withRouter} from 'react-router';

let pop_up_settings = <div></div>;
let open_pop_up = true;
let textBubbleOne = <div></div>
let textBubbleTwo = <div></div>
let textBubbleOneDisplayed = false;
let textBubbleTwoDisplayed = false;
let removeGoal = false;

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
            logSeven: [false,false,false,false,false,false,false]
        }
        this.returnTitle = this.returnTitle.bind(this);
        this.updateStreaks = this.updateStreaks.bind(this);
        // this.forceUpdate = this.forceUpdate.bind(this);
    }

    componentWillUnmount(){
        pop_up_settings = <div></div>
        open_pop_up = true;
    }

    componentDidMount(){
        this.setGoal();

        axios.get(`/api/getallbools/${this.props.match.params.id}`).then(res2=>{
            const array = res2.data.map(e=>e.successful);
            console.log('array from get all bools after mapping', array)
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
            console.log('the res is....... ',res.data)
            this.setState({
                goalname: res.data[0].goalname,
                daysoutofseven: res.data[0].daysoutofseven,
                userid: res.data[0].userid,
                goodhabit: res.data[0].goodhabit
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

    nameSettingHandler(val){
        this.setState({goalnametemp:val})
    }

    setNewName(){
        console.log(this.state.goalnametemp)
        const goal = this.state.goalnametemp;
        axios.patch(`api/renameGoal/${this.props.match.params.id}`, { goal } )
        .then(res => {
            console.log('the response from database is... ', res.data[0].goalname)
            this.setState({goalname:res.data[0].goalname})
        });
    }

    editNameSetting(){
        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><img src={x} alt='x'/></button></div>

                    <div className='edit_name_settings'>
                        <div></div>
                        <div className='current_name'><span>Current Name:</span><span>{this.state.goalname}</span></div>
                        <div></div>
                        <div><input onChange={(e)=>this.nameSettingHandler(e.target.value)} placeholder='New Goal Name'></input></div>
                        <div></div>


                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><img src={back} alt='back arrow'/>Back</button>
                            <button onClick={()=>{ this.setNewName(); this.displaySettings()}}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
            this.forceUpdate();
    }

    daysPerWeekHandler(num){
        //could create a variable to hold original days-per-week in case user changes mind and selects back button 

        this.setState({daysoutofseven:num})
        //axios call goes here as well!!!!

        //then rerender our pop up settings
        this.editDaysPerWeek();
    }

    editDaysPerWeek(){
        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><img src={x} alt='x'/></button></div>

                    <div className='edit_name_settings'>
                        <div>Current: {this.state.daysoutofseven}</div>
                        <div className='edit_day_row'><button onClick={()=>this.daysPerWeekHandler(1)}>1</button><button onClick={()=>this.daysPerWeekHandler(2)}>2</button></div>
                        <div className='edit_day_row'><button onClick={()=>this.daysPerWeekHandler(3)}>3</button><button onClick={()=>this.daysPerWeekHandler(4)}>4</button><button onClick={()=>this.daysPerWeekHandler(5)}>5</button></div>
                        <div className='edit_day_row'><button onClick={()=>this.daysPerWeekHandler(6)}>6</button><button onClick={()=>this.daysPerWeekHandler(7)}>7</button></div>
                        <div>Days Per Week</div>


                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><img src={back} alt='back arrow'/>Back</button>
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        this.forceUpdate();
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

        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><img src={x} alt='x'/></button></div>

                    <div className='edit_name_settings'> {/*should change this to a more general name*/}
                        <div></div>
                        <div className='type_of_habit'><button>Creating a New Habit</button><button onClick={()=>{displayBubbleOne(); this.editGoodvsBad()}}>?</button></div>
                        <div>{textBubbleOne}</div>
                        <div className='type_of_habit'><button>Ending an Old Habit</button><button onClick={()=>{displayBubbleTwo(); this.editGoodvsBad()}}>?</button></div>
                        <div>{textBubbleTwo}</div>

                        <div className='back_or_save'>
                            <button onClick={()=>{ open_pop_up = true; this.displaySettings()}}><img src={back} alt='back arrow'/>Back</button>
                            <button>Save</button>
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

    deleteGoal(){
        if(removeGoal){
            axios.delete(`api/deleteGoal/${this.props.match.params.id}`)
            .then(res => console.log(res) )

            //reroute to dashboard now!!!!!!!

            this.props.history.push('/dashboard')

            ////////////////////////////////
        }
    }

    editRemoveGoal(){
        pop_up_settings = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><img src={x} alt='x'/></button></div>

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
                            <button onClick={()=>{ open_pop_up = true; removeGoal = false; this.displaySettings()}}><img src={back} alt='back arrow'/>Back</button>
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
                    <div className='settings_header'>{this.state.goalname}<button className='close' onClick={()=>this.displaySettings()}><img src={x} alt='x'/></button></div>


                    <div className='all_settings_options'>
                        <div onClick={()=>this.editNameSetting()} className='settings_option'>Edit name<img src={next} alt='next arrow'/></div>
                        <div onClick={()=>this.editDaysPerWeek()} className='settings_option'>Days Per Week<img src={next} alt='next arrow'/></div>
                        <div onClick={()=>this.editGoodvsBad()} className='settings_option'>New / Old Habit<img src={next} alt='next arrow'/></div>
                        <div className='settings_option'>Challenge Friends<img src={next} alt='next arrow'/></div>
                        <div onClick={()=>this.editRemoveGoal()} className='settings_option'>Remove Goal<img src={next} alt='next arrow'/></div>
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

        return (
            <div>
                <Nav id={this.props.match.params.id} title={this.state.goalname}/>
                <div className='space_for_nav'></div>
                <Log updateStreaks={this.updateStreaks} logSeven={this.state.logSeven} goal={this.props.match.params.id}/>
                <Streak current={this.state.currentstreak} best={this.state.beststreak}/>
                <button className='open_settings_btn' onClick={()=>this.displaySettings()}><img src={gear} />Settings</button>
                {pop_up_settings}
            </div>
        )
    }
}

export default withRouter(Goal);