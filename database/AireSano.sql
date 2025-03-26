CREATE DATABASE aireSano;
-- DROP DATABASE AireSano;

SHOW DATABASES;
USE aireSano;
SHOW TABLES;

-- Table Device
CREATE Table device (
  idDevice INT AUTO_INCREMENT,
  Name VARCHAR(45),
  PRIMARY KEY (idDevice)
);

-- Table User
CREATE TABLE userData (
  idUser INT AUTO_INCREMENT,
  username VARCHAR(45),
  password VARCHAR(45),
  idDevice INT,
  PRIMARY KEY (idUser),
  
  CONSTRAINT fk_user_device1
    FOREIGN KEY (idDevice)
    REFERENCES device (idDevice)
);

-- Table EnvData
CREATE TABLE envData (
  idEnvData INT AUTO_INCREMENT,
  temperature INT,
  humidity INT,
  airQuality INT,
  dateAndTime DATETIME,
  idDevice INT,
  PRIMARY KEY (idEnvData, idDevice),

  CONSTRAINT fk_envData_device1
    FOREIGN KEY (idDevice)
    REFERENCES device (idDevice)
);

INSERT INTO device(name) VALUES ("device1");
INSERT INTO userData(username, password, idDevice) VALUES("carlos","123",1);
INSERT INTO envData(temperature, humidity, airQuality, dateAndTime, idDevice) VALUES(28,50,200,"2023-11-18 20:56:00", 1);

SELECT * FROM device;
SELECT * FROM userData;
SELECT * FROM envData;