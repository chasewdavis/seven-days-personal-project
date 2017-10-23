import React, {Component} from 'react';
// import axios from 'axios';
import './settings.css';
import gear from '../../svg/settings.svg';
// let form = <div></div>;
// let open_form = true;

export default class Settings extends Component {


    // openForm(){
    //     if(open_form){
    //         open_form = false
    //         form = 
    //         <div className='slide_up'>
    //             "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    //         </div>
    //         this.forceUpdate();
    //     }else{
    //         open_form=true
    //         form = <div className='slide_down'></div>
    //         this.forceUpdate();
    //     }
    // }

    render(){
        return (
            <div className='hide_overflow'>
                <div id='form'></div>
                <div className='open_settings'>
                    <a href='#form'>
                    <img src={gear} alt='gear' />
                    Settings
                    </a>
                </div>
            </div>
        )
    }
}