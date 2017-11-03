import React, {Component} from 'react';

import './startTrackingFull.css';

import x from '../../svg/letter-x.svg';
import X from '../../svg/letter-x.js';

export default class StartTrackingFull extends Component {

    constructor(props){
        super(props)

        this.state = {
            display: false,
            step: 1,
            goodorbad: null
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({display:newProps.openStartTracking})
    }

    render(){

        let textBubbleOne = <div></div>

        let textBubbleTwo = <div></div>

        let trackingContent = <div></div>

        if(this.state.step===1){
            trackingContent = (
                <div>
                    <div className='type_of_habit_full'></div>
                    <div className='type_of_habit_full'>
                        <button id={this.state.goodorbad ? 'fill_btn': ''} onClick={()=>{this.props.goodorbad(true);this.setState({goodorbad:true})}}>Creating a New Habit</button>
                        <button>?</button>
                    </div>

                    <div className='type_of_habit_full'>{textBubbleOne}</div>

                    <div className='type_of_habit_full'>
                        <button id={this.state.goodorbad===false ? 'fill_btn': ''} onClick={()=>{this.props.goodorbad(false);this.setState({goodorbad:false})}}>Ending an Old Habit</button>
                        <button>?</button>
                    </div>

                    <div className='type_of_habit_full'>{textBubbleTwo}</div>
                        
                </div>
            )
        }else if (this.state.step===2){
            trackingContent = (
                <div>
                    <div className='type_of_habit_full'></div>
                    <div className='type_of_habit_full'>Provide a Name:</div>
                    <div className='type_of_habit_full'><input defaultValue={this.props.goalname} onChange={(e)=>this.props.handleChange(e.target.value)} placeholder={this.state.goodorbad === false ? 'Avoid...':'Start...'} /></div>
                    <div className='type_of_habit_full'>You can rename your habit <br/> later if you'd like</div>
                    <div className='type_of_habit_full'></div>
                </div>
            )
        }else if (this.state.step===3){
            const buttons = [];

            for(let i = 1; i <= 7 ; i++){
                buttons.push(<button id={this.props.daysoutofseven===i ? 'number_button_fill' : 'number_button_open' } onClick={()=>this.props.daysPerWeekFull(i)} key={i}>{i}</button>)
            }

            trackingContent = (
                <div>
                    <div className='type_of_habit_full'>Current: {this.props.daysoutofseven}</div>
                    <div className='type_of_habit_full'>{buttons.slice(0,2)}</div>
                    <div className='type_of_habit_full'>{buttons.slice(2,5)}</div>
                    <div className='type_of_habit_full'>{buttons.slice(5,7)}</div>
                    <div className='type_of_habit_full'>Days Per Week</div>
                </div>
            )
        }else if (this.state.step===4){
            //check to see if all three section are filled out
            if(this.state.goodorbad===null){
                this.setState({step:1})
            }else if(!this.props.goalname){
                this.setState({step:2})
            }else if(!this.props.daysoutofseven){
                this.setState({step:3})
            }else {
                this.setState({step:1},()=>this.props.complete(this.props.daysoutofseven))
            }
        }

        if(this.state.display){

            return (
                <div className='overlay_grand'>
                    <div className='tracking_parent_div'>
                        <div className='tracking_header'><button onClick={()=>this.setState({display:false})} className='close_tracking'><X/></button></div>

                        <div className='tracking_content'>
                            {trackingContent}
                        </div>

                        <div className='next_or_back'>
                            <button onClick={()=>this.state.step > 1 ? this.setState({step: --this.state.step}): console.log('all the way back')}>Back</button>
                            <button onClick={()=>{

                                this.setState({step: ++this.state.step})}
                            }>{this.state.step!==3?'Next':'Create Goal'}</button>
                        </div>
                    </div>
                </div>
            )

        }else{
            return (
                <div>
                    {/* nothing to see here */}
                </div>
            )
        }
    }
}