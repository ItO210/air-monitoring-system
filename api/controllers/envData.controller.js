const pool = require('../helpers/mysql-config.js');
const mysql = require('mysql2');
const moment = require('moment-timezone');
const mexicoCityTimezone = 'America/Mexico_City';

const getEnvData = ('/envData', (req, res) => {
    const sql = "SELECT * FROM envData";
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        res.send(err);
        return;
      }
      connection.query(sql, (error, result, fields) => {

        connection.release();
  
        if (error) {
          console.error('Error executing query:', error);
          res.send(error);
          return;
        }
  
        res.json(result);
      });
    });
  });

  // const getAmountEnvData = ('/envData', (req, res) => {

  //   const n = req.query.n;
  
  //   const sql = `SELECT * FROM envData ORDER BY id DESC LIMIT ${n}`;
  
  //   pool.getConnection((err, connection) => {
  //     if (err) {
  //       console.error('Error getting connection from pool:', err);
  //       res.send(err);
  //       return;
  //     }
  
  //     connection.query(sql, (error, result, fields) => {
  //       connection.release();
  
  //       if (error) {
  //         console.error('Error executing query:', error);
  //         res.send(error);
  //         return;
  //       }
  
  //       res.json(result);
  //     });
  //   });
  // });
  
  const postEnvData = ('/envData', (req, res) => {
    const body = req.body;
    const currentDateTime = moment().tz(mexicoCityTimezone).format('YYYY-MM-DD HH:mm:ss');
    const sql = `INSERT INTO envData(temperature, humidity, airQuality, dateAndTime, idDevice)
                 VALUES(?,?,?,?,?)`;
                 
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        res.send(err);
        return;
      }
  
      connection.query(sql, [body.temperature, body.humidity, body.airQuality, currentDateTime, 1], (error, result, fields) => {
        connection.release();
        if (error) {
          console.error('Error executing query:', error);
          res.send(error);
          return;
        }
        res.json(result);
      });
    });
  });  

module.exports = {getEnvData, postEnvData};