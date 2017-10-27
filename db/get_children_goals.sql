SELECT goals.userid, goals.id, goals.startdate, users.img, users.user_name
FROM goals
JOIN users ON users.id = goals.userid
WHERE originalgoal = $1