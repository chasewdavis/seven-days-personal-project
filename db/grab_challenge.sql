SELECT goals.daysoutofseven, goals.goalname, goals.userid, goals.id
FROM goals
JOIN challenges ON goals.id = challenges.goalid 
WHERE challenges.userid = $1