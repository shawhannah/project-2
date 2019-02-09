DROP DATABASE IF EXISTS ipa_db;
CREATE DATABASE ipa_db;

USE ipa_db;

CREATE TABLE ipa
(
    id int NOT NULL
    AUTO_INCREMENT, 
beer varchar
    (255) NOT NULL, 
brewery varchar
    (255) NOT NULL, 
type varchar
    (255) NOT NULL, 
PRIMARY KEY
    (id)
);