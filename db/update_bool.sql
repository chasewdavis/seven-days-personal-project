UPDATE success
SET successful = NOT successful
WHERE goalid = $1
AND dayof = $2
RETURNING successful
