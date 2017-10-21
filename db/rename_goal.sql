UPDATE goals
SET goalname = $2
WHERE id = $1
returning goalname