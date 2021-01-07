-- in terminal:
-- psql < soccer.sql
-- psql soccer

DROP DATABASE IF EXISTS  soccer;

CREATE DATABASE soccer;

\c soccer

CREATE TABLE teams
(
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(15)
);

INSERT INTO teams
    (team_name)
VALUES
    ('Patriots'),
    ('Saints'),
    ('Eagles'),
    ('Packers'),
    ('Ravens'),
    ('Chargers');
----------------------------------------
CREATE TABLE players
(
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR(15) NOT NULL,
    player_team INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE SET NULL
);

INSERT INTO players
    (player_name,player_team)
VALUES
    ('John Smith',1),
    ('Bill Jones',1),
    ('Jason Stone',1),
    ('Mike Mikelson',2),
    ('Joehn Doe',2),
    ('Ron Brown',3),
    ('Peter Lawrence',3),
    ('Ted Musk',3),
    ('Bob Woods',4);
--------------------------------------
CREATE TABLE referees 
(
    referee_id SERIAL PRIMARY KEY,
    referee_name VARCHAR(15) NOT NULL
);
INSERT INTO referees
    (referee_name)
VALUES
    ('Referee 1'),
    ('Referee 2'),
    ('Referee 3'),
    ('Referee 4'),
    ('Referee 5');
--------------------------------------
CREATE TABLE seasons
(
    season_id SERIAL PRIMARY KEY,
    season_start DATE NOT NULL,
    season_end DATE NOT NULL
);
INSERT INTO seasons
    (season_start,season_end)
VALUES
    ('2019-04-04','2019-11-11'),
    ('2020-04-6','2020-12-12');
--------------------------------------
CREATE TABLE matches
(
    match_id SERIAL PRIMARY KEY,
    match_date DATE NOT NULL,
    -- referee_id INTEGER NOT NULL REFERENCES referees (referee_id) ON DELETE SET NULL,
    season INTEGER NOT NULL REFERENCES seasons(season_id) ON DELETE SET NULL,
    team1 INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE SET NULL,
    team2 INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE SET NULL
);

INSERT INTO matches
    (match_date,season,team1,team2)
VALUES
    ('2019-01-10',1,1,2),
    ('2019-02-20',1,3,4),
    ('2019-03-30',1,5,6),
    ('2019-04-05',1,1,3),
    ('2019-05-15',1,2,5),
    ('2019-06-25',1,4,6);
---------------------------------------------
CREATE TABLE goals
(
    goal_id SERIAL PRIMARY KEY,
    match INTEGER NOT NULL REFERENCES matches (match_id),
    scoring_team INTEGER NOT NULL REFERENCES teams (team_id),
    scoring_player INTEGER NOT NULL REFERENCES players (player_id) 
);
INSERT INTO goals
    (match,scoring_team,scoring_player)
VALUES
    (1,1,1),
    (1,2,3),
    (2,3,4),
    (2,3,4);
--------------------------------------------
CREATE TABLE ranking
(
    ranking_id SERIAL PRIMARY KEY,
    team INTEGER NOT NULL REFERENCES teams(team_id) ,
    won INTEGER NOT NULL
);
INSERT INTO ranking
    (team,won)
VALUES
    (1,3),
    (2,4),
    (3,2),
    (4,3),
    (5,1),
    (6,2);
-------------------------------------------------
CREATE TABLE referees_matches
(
    ref_mat SERIAL PRIMARY KEY,
    match INTEGER REFERENCES matches(match_id) ON DELETE SET NULL,
    referee INTEGER REFERENCES referees(referee_id) ON DELETE SET NULL
);

INSERT INTO referees_matches
    (match,referee)
VALUES
    (1,1),
    (2,1),
    (3,1),
    (2,2),
    (4,2);
    
