import React, {Component} from 'react';
import './description.css';
import notes from '../../svg/notes.svg';
import x from '../../svg/letter-x.svg';
import next from '../../svg/next2.svg';
import back from '../../svg/next2reversed.svg';

let pop_up_description = <div></div>;
let open_description = true;

export default class Description extends Component {

    componentWillUnmount(){
        open_description = true;
        pop_up_description = <div></div>;
    }

    openDescription(){

    }

    editRemoveGoal(){
        pop_up_description = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.props.name}<button className='close' onClick={()=>this.displayDescription()}><img src={x} alt='x'/></button></div>

                    <div className='edit_name_settings'> {/*should change this to a more general name*/}
                        <div></div>
                        <div>Are you sure you would like to permanently delete your goal?</div>
                        <div>
                            {/* SWITCH */}
                            <div className='delete_yes_no_switch'>
                            NO
                            <label className='switch'>
                                <input onChange={()=> this.props.handleRemoveGoal()} type='checkbox' />
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
                            <button onClick={()=>{ open_description = true; this.props.removeGoal = false; this.displayDescription()}}><img src={back} alt='back arrow'/>Back</button>
                            <button onClick={()=>{ this.props.deleteGoal() }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        this.forceUpdate();
    }

    displayDescription(){
        if(open_description){
        open_description = false;

        pop_up_description = (
            <div>
                <div className='overlay'></div>
                <div className='settings'>
                    <div className='settings_header'>{this.props.name}<button className='close' onClick={()=>this.displayDescription()}><img src={x} alt='x'/></button></div>


                    <div className='all_settings_options'>
                        <div className='settings_option'>Name<div>{this.props.name}</div></div>
                        <div className='settings_option'>Days Per Week<div>{this.props.days}</div></div>
                        <div className='settings_option'>New / Old Habit<div>{this.props.type?'New':'Old'}</div></div>
                        <div className='settings_option'>Shared With<img src={next} alt='next arrow'/></div>
                        <div onClick={()=>this.openDescription()} className='settings_option'>Description<img src={next} alt='next arrow'/></div>
                        <div onClick={()=>this.editRemoveGoal()} className='settings_option'>Remove Goal<img src={next} alt='next arrow'/></div>
                    </div>


                </div>
            </div>
        )

        }else{
        open_description = true;

        pop_up_description = <div></div>

        }

        this.forceUpdate();

    }

    render(){

        return (
            <div>
                <button className='open_description' onClick={()=>this.displayDescription()}>Description<img src={notes} alt='notes' /></button>
                {pop_up_description}
            </div>
        )
    }
}