-- in terminal:
-- psql < medical_center.sql
-- psql medical_center

DROP DATABASE IF EXISTS  medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE diseases (
    dis_id SERIAL PRIMARY KEY,
    dis_name TEXT NOT NULL
);

CREATE TABLE doctors (
    doc_id SERIAL PRIMARY KEY,
    doc_fname character varying(15) NOT NULL,
    doc_lname character varying(15) NOT NULL
);

CREATE TABLE patients (
    pat_id SERIAL PRIMARY KEY,
    pat_fname character varying(15) NOT NULL,
    pat_lname character varying(15) NOT NULL
);

CREATE TABLE patients_diseases(
    pd_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE,
    disease_id INTEGER REFERENCES diseases ON DELETE CASCADE
);

CREATE TABLE patients_doctors(
    patdoc_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors ON DELETE RESTRICT
);

INSERT INTO doctors 
(doc_fname,doc_lname)
VALUES
('John','Brown'),
('Jane','Doe'),
('Tom','Harrison'),
('Dick','Steele');

INSERT INTO patients 
(pat_fname ,pat_lname)
VALUES
('Bill','Patient1'),
('Pete','Patient2'),
('Sally','Patient3'),
('Harriet','Patient4');

INSERT INTO diseases
(dis_name)
VALUES
('Diabetes'),
('Jaundice'),
('Scabies'),
('Dandruff');

INSERT INTO patients_diseases
(patient_id, disease_id)
VALUES
(1,1),
(1,2),
(1,4),
(2,3),
(3,2),
(3,3);

INSERT INTO patients_doctors
(patient_id,doctor_id)
VALUES
(1,1),
(1,2),
(1,3),
(2,3),
(3,4);

