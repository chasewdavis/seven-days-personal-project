module.exports = {

    read: (req,res) => {

        // -----TEMP-----//
            // req.user=4
        // --------------//

        // console.log('req.user is...',req.user);

        // console.log('req.session is...', req.session);

        req.app.get('db').get_all_goals([req.user]).then(response=>{
            res.send(response); //should add 200
        })
        
    },

    unique: (req, res) => {
        
        // should create a way to prevent random users from accessing anyone's goal

        req.app.get('db').get_goal([req.params.id]).then(response=>{
            res.send(response)
        })
    },

    update: (req,res) => {

        //req.user will grab the id of the user
        // MAKE SURE FUTURE DAY DOES NOT EXTEND INTO NEXT MONTH
        const future = 0; // THIS IF FOR TESTING PURPOSES ONLY, SET BACK TO 0 OTHERWISE
        const d = new Date();
        const startdate = `${d.getFullYear()} ${d.getMonth()+1} ${d.getDate()+future}`;

        let goalid = null;
        
        // console.log('update function is firing');

        let args = [req.body.goalname, req.body.daysoutofseven, req.body.goodHabit, req.user, startdate, null]

        req.app.get('db').create_new_habit(args).then(response=>{
            
            res.send(response);

        })  

    },

    createSuccesses: (req,res) => {

        // console.log('createSuccesses function is firing');

        // console.log(req.body);

        req.app.get('db').create_success_logs([req.body.id])
        // res.sendStatus(200)
        res.status(200).end();
    },

    fillmissingdays: (req,res) => {

        // console.log('fillmissingdays', req.body);

        function days(start,today){
            
            // console.log(start, today);

            const calender = [0,31,28,31,30,31,30,31,31,30,31,30,31];
              
            start = start.split(' ').map(e=>parseInt(e));
            today = today.split(' ').map(e=>parseInt(e));
              
            var days = calender[start[1]];
              
            if(start[0]===today[0] && start[1]===today[1]){
                return today[2] - start[2];
            }else if(start[0]===today[0]){
                return calender.slice(start[1],today[1]).reduce((a,c)=>a+c)-start[2]+today[2];
            }else{
                return calender.slice(start[1]).reduce((a,c)=>a+c)-start[2] + calender.slice(0,today[1]).reduce((a,c)=>a+c)+today[2] + (today[0]-start[0]-1)*365;
            }
        //function will go out of sync on leap day 2020... oh well
        }

        // console.log('fillmissingdays function fired');

        const future = 0; // THIS IF FOR TESTING PURPOSES ONLY, SET BACK TO 0 OTHERWISE
        const goalid = req.params.id;
        let days_since_start = 0;
        d = new Date();
        const today = `${d.getFullYear()} ${d.getMonth()+1} ${d.getDate()+future}`;
        let startdate = null;
        req.app.get('db').get_startdate([goalid]).then( start => {
            startdate = start[0].startdate;
            let index = days(startdate,today);

            req.app.get('db').grab_last_day([goalid]).then(day=>{

                for(var i = day[0].dayof+1; i <= index; i++){
                    // console.log(i);
                    req.app.get('db').fill_missing_days([goalid,i])
                    .then(theResponse=>{
                        res.status(200).end();
                    });
                }

            })

            // console.log('number of days since goal began... ', days(startdate,today))//number of rows to insert into success for this goal
        })
         
        res.status(200).end();
    },

    addPreviousDays : (req, res) => {
        const goalid = req.params.id;
        const daysToAdd = req.body.daysToAdd; // 7
        const db = req.app.get('db');

        // console.log(goalid);
        // console.log(req.body);

        // more to learn in sql to make more efficient
        db.find_earliest_day([goalid]).then( day => {
            // console.log(day[0].dayof); // -6

            for(let i = 1; i <= daysToAdd; i++){
                 
                let val = day[0].dayof - i;


                if(i === daysToAdd ){
                    db.fill_missing_days([goalid, val]).then( res2 => {
                        db.get_all_booleans([goalid]).then( booleans => {
                            res.status(200).send(booleans);
                        })
                    })
                }else {
                    db.fill_missing_days([goalid, val])
                }
            
            }
            
        })
        
    },

    getbools: (req,res) => {
        // console.log('from getbools', req.params.id)
        const goalid = req.params.id;
        const db = req.app.get('db');
        db.get_booleans([goalid]).then(res2=>{
            res.send(res2)
        })
    },

    getallbools: (req,res) => {
        // console.log('from get all bools', req.params.id)
        const goalid = req.params.id;
        const db = req.app.get('db');
        db.get_all_booleans([goalid]).then(res2=>{
            res.send(res2)
        })
    },

    changebool: (req,res) => {
        // console.log('from changebool', req.params.id) //goal id
        const db = req.app.get('db')
        const dayclicked = req.body.day;
        const goalid = req.params.id;
        const weeksBack = req.body.weeksBack;

        // console.log('weeks Back from changebool: ', req.body.weeksBack);
        // console.log('dayclicked: ', dayclicked);

        db.grab_last_day([req.params.id]).then(res2=>{
            // console.log('from changebool', res2[0].dayof)
            const day = res2[0].dayof - dayclicked - 7 * weeksBack;
            db.update_bool([goalid, day]).then(res3=>{

                // console.log('response from update_bool is... ', res3);

                // trying this out
                db.get_all_booleans([req.params.id]).then(updatedBooleans => res.status(200).send(updatedBooleans))

                // res3.sendStatus(200);
            })

            // res2.sendStatus(200);
        })

        // res.sendStatus(200);
    },

    renameGoal: (req, res) => {
        db = req.app.get('db');
        db.rename_goal([req.params.id, req.body.goal])
        .then(newGoalName => res.status(200).send(newGoalName))
    },

    renumberGoal: (req, res) => {
        db = req.app.get('db');
        db.renumber_goal([req.params.id, req.body.number])
        .then(num => res.status(200).send(num))
    },

    resetBoolType: (req, res) => {
        db = req.app.get('db');
        // console.log(req.body);
        db.reset_bool_type([req.params.id, req.body.boolean])
        .then(res2 => res.status(200).send(res2))
    },

    deleteGoal: (req, res) => {
        db = req.app.get('db');
        db.delete_successes([req.params.id]).then(res2 => {
            db.delete_goal([req.params.id])
            .then(gone => res.status(200).send(gone))
            // res2.sendStatus(200)
        })
        
    },

    findFriends: (req, res) => {
        // console.log(req.params.id, req.params.input)
        db = req.app.get('db');
        db.find_friends([req.params.input])
        .then(friends => {
            // console.log('the friends are..', friends)
            ///TEMPPPP////
            // req.user = 4;
            //////////////
            friends = friends.filter(e=>e.id!==req.user)
            res.status(200).send(friends)
        })
    },

    getSetChallenges: (req, res) => {
        // console.log('from getSetChallenges...', req.params.id)
        db = req.app.get('db');
        db.get_set_challenges([req.params.id, req.user])
        .then(challenges=>res.status(200).send(challenges))
    },

    challengeFriend: (req, res) => {
        // console.log('req.user is...', req.user)
        // console.log('req.params.id is...', req.params.id)
        // console.log('req.body.friend is...', req.body.friend)
        db = req.app.get('db');

        db.sent_bool_true([req.params.id])
        // .then(finished=>res.status(200).end())

        db.challenge_friend([req.params.id, req.user, req.body.friend])
        .then(res2=>res.status(200).send(res2))
    },

    grabChallenges: (req, res) => {
        
        db = req.app.get('db');

        db.grab_challenge([req.user])
        .then(challenge => res.status(200).send(challenge))
    },

    acceptChallenge: (req, res) => {
        db = req.app.get('db');

        db.accept_challenge([req.params.id])
        .then(res2=>res.status(200).send(res2))
    },

    copyChallenge: (req, res) => {
        db = req.app.get('db');

        db.get_goal([req.params.id])
        .then(goal=>{
            // console.log(goal[0])
            
            const d = new Date();
            const startdate = `${d.getFullYear()} ${d.getMonth()+1} ${d.getDate()}`; 

            db.create_new_habit([goal[0].goalname, goal[0].daysoutofseven, goal[0].goodhabit, req.user, startdate, goal[0].id ])
            .then(newGoal=>{
                //THIS PART ONLY FIRES ONE TIME. NO BUG HERE
                // console.log('the new goal\'s id is...', newGoal[0].id)
                db.create_success_logs([newGoal[0].id])
                .then(res3=>res.status(200).send(newGoal))
                
            })

        })

    },

    declineChallenge: (req, res) => {
        db = req.app.get('db');

        db.decline_challenge([req.params.id])
        .then(res2=>res.status(200).send(res2))
    },

    getChallengers: (req, res) => {
        db = req.app.get('db');

        // ------TEMP-------//
            // req.user = 4;
        // -----------------//

        db.get_challengers([req.user, req.params.id])
        .then(res2=>{


            db.get_all_booleans([req.params.id])
            .then(booleans=> {
                res2[0].bools = booleans
                res.status(200).send(res2)
            })
        })
    },

    getChallengees: (req, res) => {
        db = req.app.get('db');

        
        // ------TEMP-------//
            // req.user = 4;
        // -----------------//
        // console.log('get challengees function fired params are...', req.user, req.params.id)
        //get challengees info if confirmed is true

        db.get_children_goals([req.params.id])
        .then(res2=>{

            // console.log('res2 from get_children_goals is...', res2)
            
            res.status(200).send(res2)


        })
    },

    addNewDescription: (req, res) => {
        db = req.app.get('db');

        db.add_description([req.params.id, req.body.description])
        .then(res2=>res.status(200).send(res2));
    }

}