import React,{Component} from 'react';

export default ({current, best}) => {

        return(

            <div className='grid'>

                <div className='title'>
                    Streaks
                </div>

                <div className='streak'>
                    <div className='banner'>
                        current
                    </div>
                    <div className='content'>
                        {current}
                    </div>
                </div>

                <div className='streak'>
                    <div className='banner'>
                        best
                    </div>
                    <div className='content'>
                        {best}
                    </div>
                </div>

            </div>

        )
    
}