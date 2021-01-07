-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  artist_id SERIAL PRIMARY KEY,
  artist_name VARCHAR(25) NOT NULL
);

INSERT INTO artists
  (artist_name)
VALUES
  ('Hanson'),
  ('Queen'),
  ('Mariah Cary'),
  ('Boyz II Men'),
  ('Lady Gaga'),
  ('Bradley Cooper'),
  ('Nickleback'),
  ('Jay Z'),
  ('Alicia Keys'),
  ('Katy Perry'),
  ('Juicy J'),
  ('Maroon 5'),
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destinys Child');

CREATE TABLE producers
(
  producer_id SERIAL PRIMARY KEY,
  producer_name VARCHAR(25) NOT NULL
);

INSERT INTO producers
  (producer_name)
VALUES
  ('Dust Brothers'),
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('Max Martin'),
  ('Cirkut'),
  ('Shellback'),
  ('Benny Bianco'),
  ('The Matrix'),
  ('Darkchild');

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album TEXT NOT NULL
);

INSERT INTO songs
  (title, duration_in_seconds, release_date, album)
VALUES
  ('MMMBop', 238, '04-15-1997',  'Middle of Nowhere'),
  ('Bohemian Rhapsody', 355, '10-31-1975',  'A Night at the Opera'),
  ('One Sweet Day', 282, '11-14-1995',  'Daydream'),
  ('Shallow', 216, '09-27-2018',  'A Star Is Born'),
  ('How You Remind Me', 223, '08-21-2001',  'Silver Side Up'),
  ('New York State of Mind', 276, '10-20-2009', 'The Blueprint 3'),
  ('Dark Horse', 215, '12-17-2013', 'Prism'),
  ('Moves Like Jagger', 201, '06-21-2011', 'Hands All Over'),
  ('Complicated', 244, '05-14-2002', 'Let Go'),
  ('Say My Name', 240, '11-07-1999','The Writing''s on the Wall');

CREATE TABLE songs_artists
(
  sa_id SERIAL PRIMARY KEY,
  sa_song_id INTEGER NOT NULL REFERENCES songs(id),
  sa_artist_id INTEGER NOT NULL REFERENCES artists(artist_id)
);

INSERT INTO songs_artists
  (sa_song_id,sa_artist_id)
VALUES
  (1,1),
  (2,2),
  (3,3),
  (3,4),
  (4,5),
  (4,6),
  (5,7),
  (6,8),
  (6,9),
  (7,10),
  (7,11),
  (8,12),
  (8,13),
  (9,14),
  (10,15);

CREATE TABLE songs_producers
(
  sp_id SERIAL PRIMARY KEY,
  sp_song_id INTEGER NOT NULL REFERENCES songs(id),
  sp_producer_id INTEGER NOT NULL REFERENCES producers(producer_id)
);

INSERT INTO songs_producers
  (sp_song_id,sp_producer_id)
VALUES
  (1,1),
  (1,2),
  (2,3),
  (3,4),
  (4,5),
  (5,6),
  (6,7),
  (7,8),
  (7,9),
  (8,10),
  (8,11),
  (9,12),
  (10,13);