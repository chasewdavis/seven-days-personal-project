
SELECT * FROM triple_option_success
WHERE goalid = $1
ORDER BY dayof 
LIMIT 1;