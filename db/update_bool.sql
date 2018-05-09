-- UPDATE success
-- SET successful = NOT successful
-- WHERE goalid = $1
-- AND dayof = $2

-- no longer should it togel, instead take three options

UPDATE triple_option_success

    SET successful = CASE WHEN (successful = 0) THEN 1
                      WHEN (successful = 1) THEN -1
                      WHEN (successful = -1) THEN 0 END

WHERE goalid = $1
AND dayof = $2

