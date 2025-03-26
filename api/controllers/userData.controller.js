const pool = require('../helpers/mysql-config.js');
const mysql = require('mysql2');

const getUserData = ('/userData', (req, res) => {
    const sql = "SELECT * FROM userData";
  
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

  const postUserData = ('/userData', (req, res) => {
    const body = req.body;
    const sql = `INSERT INTO userData(username, password, idDevice)
                 VALUES(?,SHA2(?,224),?)`;
                 
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        res.send(err);
        return;
      }
  
      connection.query(sql, [body.username, body.password, 1], (error, result, fields) => {
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

  const login = ('/userData/login', (req, res) => {
    const body = req.body

    const sql = "SELECT COUNT(*) as count FROM userData WHERE username = ? AND password = SHA2(?, 224)";
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        res.send(err);
        return;
      }
      connection.query(sql, [body.username, body.password], (error, result, fields) => {

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

  const checkUser = ('/userData/checkUser', (req, res) => {
    const body = req.body

    const sql = "SELECT COUNT(*) as count FROM userData WHERE username = ?";
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        res.send(err);
        return;
      }
      connection.query(sql, [body.username], (error, result, fields) => {

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

module.exports = {getUserData, postUserData, login, checkUser};