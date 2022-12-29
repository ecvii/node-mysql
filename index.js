const express = require('express')
const mysql = require('mysql')

//? Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//? Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connected")
})

const app = express()

//? Create Database
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE nodemysql"
    db.query(sql, (err) => {
        if (err) {
            throw err
        }
    })
    res.send("Database Created")
})

//? Create Table
app.get('/createemployee', (req, res) => {
    let sql = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))"
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("Employee table created")
    })
})

//? Insert employee
app.get('/employee', (req, res) => {
    let post = { name: 'Edwin II Villanueva', designation: 'Student' }
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send("Employee added")
    })
})

//? Select employee
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        console.log(results)
        res.send("Employee details fetched")
    })
})

//? Update employee
app.get('/updateemployee/:id', (req, res) => {
    //let newName = 'Update name'
    let newName = 'Update EDWIN II'
    let sql = 'UPDATE employee SET name = ? WHERE id = ?'
    let query = db.query(sql, [newName, req.params.id], err => {
        if (err) {
            throw err
        }
        res.send('Employee updated')
    })
    
})

//? Delete employee
app.get('/deleteemployee/:id', (req, res) => {
    let sql = 'DELETE FROM employee WHERE id = ?'
    let query = db.query(sql, [req.params.id], err => {
        if (err) {
            throw err
        }
        res.send('Employee deleted')
    })
})

app.listen('3000', () => {
    console.log("Server Stated on port 3000")
})
