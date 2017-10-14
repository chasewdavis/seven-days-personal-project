module.exports = {

    read: (req,res) => {

        console.log('req.user is...',req.user);

        req.app.get('db').get_all_goals([req.user]).then(response=>{
            res.send(response); //should add 200
        })
        // console.log(req.body)
    },

    unique: (req, res) => {
        console.log(req.params.id);
        
        req.app.get('db').get_goal([req.params.id]).then(response=>{
            res.send(response)
        })
    },

    update: (req,res) => {

        //req.user will grab the id of the user

        let goalid = null;
        
        console.log('update funtion is firing')

        let args = [req.body.goalname, req.body.daysoutofseven, req.body.goodHabit, req.user]

        req.app.get('db').create_new_habit(args).then(response=>{
            
            res.send(response);

        })  

    },

    createSuccesses: (req,res) => {

        console.log('createSuccesses function is firing');

        console.log(req.body);

        req.app.get('db').create_success_logs([req.body.id])
        res.sendStatus(200)
    }

}