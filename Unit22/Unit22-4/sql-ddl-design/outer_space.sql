-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE moons
(
  moon_id SERIAL PRIMARY KEY,
  moon_name VARCHAR(25) NOT NULL
);

INSERT INTO moons
  (moon_name)
VALUES
  ('The Moon'),
  ('Phobos'),
  ('Deimons'),
  ('Naiad'),
  ('Thalassa'),
  ('Galatea'),
  ('Larrisa'),
  ('S/204 N 1'),
  ('Proteus'),
  ('Triton');

CREATE TABLE orbits_body
(
  orbits_id SERIAL PRIMARY KEY,
  orbits_name VARCHAR(25) NOT NULL
);

INSERT INTO orbits_body
  (orbits_name)
VALUES
  ('The Sun'),
  ('The Sun'),
  ('The Sun'),
  ('The Sun'),
  ('Proxima Centauri'),
  ('Gliese 876');

CREATE TABLE galaxys
(
  galaxy_id SERIAL PRIMARY KEY,
  galaxy_name VARCHAR(15) NOT NULL
);
INSERT INTO galaxys
  (galaxy_name)
VALUES
  ('Milky Way');

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around INTEGER NOT NULL REFERENCES orbits_body (orbits_id),
  galaxy INTEGER NOT NULL REFERENCES galaxys (galaxy_id),
  moons TEXT[]
);

INSERT INTO planets
  (name, orbital_period_in_years, orbits_around, galaxy, moons)
VALUES
  ('Earth', 1.00, 1, 1, '{"The Moon"}'),
  ('Mars', 1.88, 1, 1, '{"Phobos", "Deimos"}'),
  ('Venus', 0.62, 1, 1, '{}'),
  ('Neptune', 164.8, 1, 1, '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
  ('Proxima Centauri b', 0.03, 2, 1, '{}'),
  ('Gliese 876 b', 0.23, 3, 1, '{}');

CREATE TABLE moons_planets
(
    moonplan_id SERIAL PRIMARY KEY,
    fk_moon INTEGER REFERENCES moons (moon_id),
    fk_planet INTEGER NOT NULL REFERENCES planets (id)
);

INSERT INTO moons_planets
  (fk_planet, fk_moon)
VALUES
  (1,1),
  (2,2),
  (2,3),
  (3,NULL),
  (4,1),
  (4,2),
  (4,3),
  (4,4),
  (4,5),
  (4,6),
  (4,7),
  (5,NULL),
  (6,NULL);