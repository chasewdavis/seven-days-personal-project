-- SELECT successful from success
-- WHERE goalid = $1
-- ORDER BY dayof DESC
-- LIMIT 7

SELECT successful from triple_option_success
WHERE goalid = $1
ORDER BY dayof DESC
LIMIT 7