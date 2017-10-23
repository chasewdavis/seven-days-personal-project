SELECT * FROM users
WHERE user_name ILIKE '%' || $1 || '%'