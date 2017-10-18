SELECT successful from success
WHERE goalid = $1
ORDER BY dayof DESC
LIMIT 7