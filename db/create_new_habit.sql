insert into goals 
(goalname, daysoutofseven, goodhabit, userid, startdate, originalgoal)
values
($1,$2,$3, $4, $5, $6)
-- added a sixth

RETURNING *;