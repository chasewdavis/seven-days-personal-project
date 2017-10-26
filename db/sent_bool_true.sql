UPDATE goals
SET sent = NOT sent
WHERE id = $1