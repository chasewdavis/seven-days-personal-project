SELECT dayof from success
WHERE goalid = $1
ORDER BY dayof desc
LIMIT 1