
const { assert, expect } = require('chai');
const { calcDailyAvgs } = require('../src/functions/functions');


describe('calculate daily averages function', () => {

    const testCases = [
        { 
            case: '1 week of no successful days',
            input:  [0,0,0,0,0,0,0], 
            output: [0,0,0,0,0,0,0],
            day: 0
        },

        { 
            case: '2.5 weeks mix with trailing zeros',
            // sun. sat. fri. thur. wed. tue. mon.
            input:  [0,0,1,0,0,0,1,
                     0,0,0,0,0,0,0,
                     1,1,0,0,0],
            // sun. mon. tue. wed. thur. fri. sat.
            output: [33,50,0,0,0,50,33],
            day: 0
        },

        {
            case: '1 week all successful',
            input:  [1,1,1,1,1,1,1],
            output: [100,100,100,100,100,100,100],
            day: 0
        },
        
        {
            case: 'on a Monday',
            // mon. sun. sat. fri. thur. wed. tue.
            input:  [1,0,0,0,0,0,0],
            // sun. mon. tue. wed. thur. fri. sat.
            output: [0,100,0,0,0,0,0],
            day: 1
        },

        {
            case: 'on a Saturday with negatives',
            // sat. fri. thur. wed. tue. mon. sun. 
            input:  [ 1, 0, 0, 0, 0, 0, 0,
                     -1, 0, 1, 0,-1, 0, 0,
                      0  
            ],
            // sun. mon. tue. wed. thur. fri. sat.
            output: [0,0,50,0,50,0,100],
            day: 6
        }
    ]

    describe('2 and a half weeks', () => {

        const arrayOfDays = [
            // sun. sat. fri. thur. wed. tue. mon.
            0,0,1,0,0,0,0,
            0,0,0,0,0,0,1,
            1,1,0
        ];
    
        const today = 0
    
        let dailyAvgs = calcDailyAvgs(arrayOfDays, today);
    
        it('averages should equal 0 for each day', () => {
            // sun. mon. tue. wed. thur. fri. sat.
            assert.deepEqual(dailyAvgs, [33,50,0,0,0,50,33])
        })

    })

    describe('new week, no days logged', () => {

        const arrayOfDays = [
            0,0,0,0,0,0,0
        ];
    
        const today = 0
    
        let dailyAvgs = calcDailyAvgs(arrayOfDays, today);
    
        it('averages should equal 0 for each day', () => {
            assert.deepEqual(dailyAvgs, [0,0,0,0,0,0,0])
        })

    })

    // debatable whether this is best practice?
    describe('rapid fire dry tests', () => {

        testCases.forEach( test => {
            
            it(test.case, () => {

                let output = calcDailyAvgs(test.input, test.day)

                assert.deepEqual( output, test.output );

            })

        })

    })

})