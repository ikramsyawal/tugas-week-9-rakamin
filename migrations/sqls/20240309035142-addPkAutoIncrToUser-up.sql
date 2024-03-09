CREATE SEQUENCE users_id_seq;

SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users),1), false);

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');

ALTER TABLE users ADD PRIMARY KEY (id);