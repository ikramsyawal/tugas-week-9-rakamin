CREATE SEQUENCE movies_id_seq;

SELECT setval('movies_id_seq', COALESCE((SELECT MAX(id)+1 FROM movies),1), false);

ALTER TABLE movies ALTER COLUMN id SET DEFAULT nextval('movies_id_seq');

ALTER TABLE movies ADD PRIMARY KEY (id);