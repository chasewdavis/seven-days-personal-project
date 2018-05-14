import React,{Component} from 'react';
import Right from '../../svg/arrow-right';
import Left from '../../svg/arrow-left.js';

export default ({successRate, timeFrame, handleRateChange}) => {
    return(
        <div className='grid'>

            <div className='title'>
                Success Rate
            </div>

            <div className='rate'>
                
                <div className='banner'>
                    {timeFrame ? `PAST ${timeFrame} DAYS` : `OVERALL`}
                </div>
                <div className='content'>
                    <button onClick={() => handleRateChange(-1)}><Left/></button>
                    <div>
                        {successRate}%
                    </div>
                    <button onClick={() => handleRateChange(1)}><Right/></button>
                </div>
            </div>

        </div>
    )
}