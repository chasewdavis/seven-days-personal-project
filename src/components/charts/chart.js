import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'
import './chart.css';
import _ from 'lodash';

import { calcDailyAvgs } from '../../functions/functions.js';

export default ({ allDays }) => {

    let dailyAvgs = [0,0,0,0,0,0,0];

    if(allDays){

        let today = new Date().getDay()

        dailyAvgs = calcDailyAvgs( allDays, today )

    }

    let data = {
        datasets: [{
            data: dailyAvgs,
            backgroundColor: '#829BA5'
        }],
        labels: ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']
    }

    let options = {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }],
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    callback: (val) => {
                        return val+'%';
                    }
                }
            }]
        },
        legend: {
            display: false
        },

        tooltips: {enabled: false},

        hover: {mode: null},
        
    }
    
    return (
        <div className='chart-container'>
            <Bar 
                data={data}
                options={options}
            />
        </div>
    )
    
}