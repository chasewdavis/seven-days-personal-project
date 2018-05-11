-- SELECT dayof from success
-- WHERE goalid = $1
-- ORDER BY dayof desc
-- LIMIT 1

SELECT dayof from triple_option_success
WHERE goalid = $1
ORDER BY dayof desc
LIMIT 1