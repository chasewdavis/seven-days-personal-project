const _ = require('lodash');

module.exports = {

    calcDailyAvgs( allDays, today ) { 

        let dailyAvgs = [[],[],[],[],[],[],[]]
        
        allDays = _.dropRightWhile( allDays, day => !day);
        
        while(allDays.length < 7){
            allDays.push(0);
        }

        allDays.forEach( (day, i) => {
            let place = i % 7;
            dailyAvgs[place].push(Math.abs(day));
        })

        dailyAvgs = dailyAvgs.map( dayArray =>  _.round( _.sum(dayArray)/dayArray.length * 100 ) )

        let first = dailyAvgs.slice(0, today + 1).reverse();
        let second = dailyAvgs.slice(today + 1).reverse();

        console.log('today: ', today)
        console.log('first: ', first)
        console.log('second: ', second)
        

        dailyAvgs = [...first, ...second]; // index 0 will now be Sunday

        return dailyAvgs;
    }

}