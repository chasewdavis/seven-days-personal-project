SELECT goals.daysoutofseven, goals.goalname, goals.startdate, goals.userid, goals.id, users.img, users.user_name, challenges.confirmed, challenges.id AS challengeid
FROM goals
JOIN challenges ON goals.id = challenges.goalid
JOIN users ON users.id = challenges.opid
WHERE challenges.userid = $1 AND challenges.goalid =$2
ORDER BY challenges.id DESC
