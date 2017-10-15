UPDATE success
SET success = NOT success
WHERE goalid = $1
AND dayof = $2
