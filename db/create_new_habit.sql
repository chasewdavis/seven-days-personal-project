insert into goals 
(goalname, daysoutofseven, goodhabit, userid, startdate)
values
($1,$2,$3, $4, $5)

RETURNING *;