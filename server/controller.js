module.exports = {

    read: (req,res) => {

        console.log('req.user is...',req.user);

        req.app.get('db').get_all_goals([req.user]).then(response=>{
            res.send(response); //should add 200
        })
        // console.log(req.body)
    },

    update: (req,res) => {

        //req.user will grab the id of the user
        
        let args = [req.body.habitName, req.body.days, req.body.goodHabit, req.user]

        req.app.get('db').create_new_habit(args).then(response=>{
            res.json(response)
            console.log(response)
        })

    }
}