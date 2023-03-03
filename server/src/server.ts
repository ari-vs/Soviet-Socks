const express = require("express");
import { Request, Response } from "express";
import { json } from "body-parser";
const cors = require("cors");
const fs = require("fs");
const path = require("path");
import { Sock, Officer, Location_history } from "./interfaces";
const { OPEN_READWRITE } = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/Socks.sqlite3', sqlite3.OPEN_READWRITE, (err: Error) => {
  if (err) {
    console.log('Could not connect to database', err.message);
  } else {
    console.log('Connected to database');
  }
});

const app = express();
app.use(json());
app.use(cors());

async function socks() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`select * from Socks`, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  })
}

async function officers() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`select * from Officers`, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  })
}

async function location_history() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`select * from Location_history`, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  })
}

async function createSQL(sql, table) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      if (table == "socks") {
        let id;
        let model;
        let quantity;
        let size;
        let lat;
        let lon;
        let base;
        let city;
        let manufactured;
        let officer;
        let toExecute = `INSERT INTO socks(id, model, quantity, size, lat, lon, base, city, manufactured, officer) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let commands = sql.split("  ");
        let parameters: string[] = [];
        for (let command of commands) {
          let values = command.split("=");
          if (values[0] == "id") {
            id = values[1];
            parameters.push(id);
          }
          if (values[0] == "model") {
            model = values[1];
            parameters.push(model);
          }
          if (values[0] == "quantity") {
            quantity = values[1];
            parameters.push(quantity);
          }
          if (values[0] == "size") {
            size = values[1];
            parameters.push(size);
          }
          if (values[0] == "lat") {
            lat = values[1];
            parameters.push(lat);
          }
          if (values[0] == "lon") {
            lon = values[1];
            parameters.push(lon);
          }
          if (values[0] == "base") {
            base = values[1];
            parameters.push(base);
          }
          if (values[0] == "city") {
            city = values[1];
            parameters.push(city);
          }
          if (values[0] == "manufactured") {
            manufactured = values[1];
            parameters.push(manufactured);
          }
          if (values[0] == "officer") {
            officer = values[1];
            parameters.push(officer);
          }
        }
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "officers") {
        let id;
        let name;
        let email;
        let phone;
        let toExecute = `INSERT INTO Officers(id, name, email, phone) VALUES(?, ?, ?, ?)`;
        let commands = sql.split("  ");
        let parameters: string[] = [];
        for (let command of commands) {
          let values = command.split("=");
          if (values[0] == "id") {
            id = values[1];
            parameters.push(id);
          }
          if (values[0] == "name") {
            name = values[1];
            parameters.push(name);
          }
          if (values[0] == "email") {
            email = values[1];
            parameters.push(email);
          }
          if (values[0] == "phone") {
            phone = values[1];
            parameters.push(phone);
          }
        }
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "histories") {
        let arrived_departed;
        let date;
        let to_location;
        let socks_id;
        let toExecute = `INSERT INTO Location_history(arrived_departed, date, to_location, socks_id) VALUES(?, ?, ?, ?)`;
        let commands = sql.split("  ");
        let parameters: string[] = [];
        for (let command of commands) {
          let values = command.split("=");
          if (values[0] == "arrived_departed") {
            arrived_departed = values[1];
            parameters.push(arrived_departed);
          }
          if (values[0] == "date") {
            date = values[1];
            parameters.push(date);
          }
          if (values[0] == "to_location") {
            to_location = values[1];
            parameters.push(to_location);
          }
          if (values[0] == "socks_id") {
            socks_id = values[1];
            parameters.push(socks_id);
          }
        }
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
    })
  })
}

async function readSQL(sql, table) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      if (table == "socks") {
        let id;
        let model;
        let quantity;
        let size;
        let lat;
        let lon;
        let base;
        let city;
        let manufactured;
        let officer;
        let commands = sql.split("  ");
        let toExecute = `SELECT * FROM Socks WHERE`;
        let added = 0;
        let parameters: string[] = [];
        for (let command of commands) {
          let values = command.split("=");
          if (values[0] == "id") {
            id = values[1];
            parameters.push(id);
            if (added == 0) { toExecute += ` id=?`; added = 1; }
            else if (added == 1) toExecute += ` AND id=?`
          }
          if (values[0] == "model") {
            model = values[1];
            parameters.push(model);
            if (added == 0) { toExecute += ` model=?`; added = 1; }
            else if (added == 1) toExecute += ` AND model=?`
          }
          if (values[0] == "quantity") {
            quantity = values[1];
            parameters.push(quantity);
            if (added == 0) { toExecute += ` quantity=?`; added = 1; }
            else if (added == 1) toExecute += ` AND quantity=?`
          }
          if (values[0] == "size") {
            size = values[1];
            parameters.push(size);
            if (added == 0) { toExecute += ` size=?`; added = 1; }
            else if (added == 1) toExecute += ` AND size=?`
          }
          if (values[0] == "lat") {
            lat = values[1];
            parameters.push(lat);
            if (added == 0) { toExecute += ` lat=?`; added = 1; }
            else if (added == 1) toExecute += ` AND lat=?`
          }
          if (values[0] == "lon") {
            lon = values[1];
            parameters.push(lon);
            if (added == 0) { toExecute += ` lon=?`; added = 1; }
            else if (added == 1) toExecute += ` AND lon=?`
          }
          if (values[0] == "base") {
            base = values[1];
            parameters.push(base);
            if (added == 0) { toExecute += ` base=?`; added = 1; }
            else if (added == 1) toExecute += ` AND base=?`
          }
          if (values[0] == "city") {
            city = values[1];
            parameters.push(city);
            if (added == 0) { toExecute += ` city=?`; added = 1; }
            else if (added == 1) toExecute += ` AND city=?`
          }
          if (values[0] == "manufactured") {
            manufactured = values[1];
            parameters.push(manufactured);
            if (added == 0) { toExecute += ` manufactured=?`; added = 1; }
            else if (added == 1) toExecute += ` AND manufactured=?`
          }
          if (values[0] == "officer") {
            officer = values[1];
            parameters.push(officer);
            if (added == 0) { toExecute += ` officer=?`; added = 1; }
            else if (added == 1) toExecute += ` AND officer=?`
          }
        }
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "officers") {
        let id;
        let name;
        let email;
        let phone;
        let commands = sql.split("  ");
        let toExecute = `SELECT * FROM Officers WHERE`;
        let added = 0;
        let parameters: string[] = [];
        for (let command of commands) {
          let values = command.split("=");
          if (values[0] == "id") {
            id = values[1];
            parameters.push(id);
            if (added == 0) { toExecute += ` id=?`; added = 1; }
            else if (added == 1) toExecute += ` AND id=?`
          }
          if (values[0] == "id") {
            id = values[1];
            parameters.push(id);
            if (added == 0) { toExecute += ` id=?`; added = 1; }
            else if (added == 1) toExecute += ` AND id=?`
          }
          if (values[0] == "name") {
            name = values[1];
            parameters.push(name);
            if (added == 0) { toExecute += ` name=?`; added = 1; }
            else if (added == 1) toExecute += ` AND name=?`
          }
          if (values[0] == "email") {
            email = values[1];
            parameters.push(email);
            if (added == 0) { toExecute += ` email=?`; added = 1; }
            else if (added == 1) toExecute += ` AND email=?`
          }
          if (values[0] == "phone") {
            phone = values[1];
            parameters.push(phone);
            if (added == 0) { toExecute += ` phone=?`; added = 1; }
            else if (added == 1) toExecute += ` AND phone=?`
          }
        }
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "histories") {
        let arrived_departed;
        let date;
        let to_location;
        let socks_id;
        let commands = sql.split("  ");
        let toExecute = `SELECT * FROM Location_history WHERE`;
        let added = 0;
        let parameters: string[] = [];
        for (let command of commands) {
          let values = command.split("=");
          if (values[0] == "arrived_departed") {
            arrived_departed = values[1];
            parameters.push(arrived_departed);
            if (added == 0) { toExecute += ` arrived_departed=?`; added = 1; }
            else if (added == 1) toExecute += ` AND arrived_departed=?`
          }
          if (values[0] == "date") {
            date = values[1];
            parameters.push(date);
            if (added == 0) { toExecute += ` date=?`; added = 1; }
            else if (added == 1) toExecute += ` AND date=?`
          }
          if (values[0] == "to_location") {
            to_location = values[1];
            parameters.push(to_location);
            if (added == 0) { toExecute += ` to_location=?`; added = 1; }
            else if (added == 1) toExecute += ` AND to_location=?`
          }
          if (values[0] == "socks_id") {
            socks_id = values[1];
            parameters.push(socks_id);
            if (added == 0) { toExecute += ` socks_id=?`; added = 1; }
            else if (added == 1) toExecute += ` AND socks_id=?`
          }
          db.all(toExecute, parameters, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          })
        }
      }
    })
  })
}

async function updateSQL(sql, table) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      if (table == "socks") {
        let toExecute = `UPDATE Socks `;
        let commands = sql.split("  ");
        let parameters: string[] = [];
        let newValues = commands[0].split("=");
        toExecute += "SET " + newValues[0] + "=?";
        parameters.push(newValues[1]);
        let selectors = commands[1].split("=");
        toExecute += "WHERE " + selectors[0] + "=?";
        parameters.push(selectors[1]);
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "officers") {
        let toExecute = `UPDATE Officers `;
        let commands = sql.split("  ");
        let parameters: string[] = [];
        let newValues = commands[0].split("=");
        toExecute += "SET " + newValues[0] + "=?";
        parameters.push(newValues[1]);
        let selectors = commands[1].split("=");
        toExecute += "WHERE " + selectors[0] + "=?";
        parameters.push(selectors[1]);
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "histories") {
        let toExecute = `UPDATE Location_history `;
        let commands = sql.split("  ");
        let parameters: string[] = [];
        let newValues = commands[0].split("=");
        toExecute += "SET " + newValues[0] + "=?";
        parameters.push(newValues[1]);
        let selectors = commands[1].split("=");
        toExecute += "WHERE " + selectors[0] + "=?";
        parameters.push(selectors[1]);
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
    })
  })
}

async function deleteSQL(sql, table) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      if (table == "socks") {
        let toExecute = `DELETE FROM Socks WHERE `
        let commands = sql.split("  ");
        let parameters: string[] = [];
        let values = commands[0].split("=");
        toExecute += values[0] + "=?";
        parameters.push(values[1]);
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "officers") {
        let toExecute = `DELETE FROM Officers WHERE `
        let commands = sql.split("  ");
        let parameters: string[] = [];
        let values = commands[0].split("=");
        toExecute += values[0] + "=?";
        parameters.push(values[1]);
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
      if (table == "histories") {
        let toExecute = `DELETE FROM Location_history WHERE `
        let commands = sql.split("  ");
        let parameters: string[] = [];
        let values = commands[0].split("=");
        toExecute += values[0] + "=?";
        parameters.push(values[1]);
        db.all(toExecute, parameters, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
    })
  })
}

// checks server is running
app.get("/", async (req: Request, res: Response) => {
  res.send("it works");
});

app.get("/socks", async (req: Request, res: Response) => {
  await socks()
    .then((results) => res.send(results))
});

app.get("/officers", async (req: Request, res: Response) => {
  await officers()
    .then((results) => res.send(results))
});

app.get("/location_history", async (req: Request, res: Response) => {
  await location_history()
    .then((results) => res.send(results))
});

app.get("/read", async (req: Request, res: Response) => {
  let sql = req.query.sql;
  let table = req.query.table;
  await readSQL(sql, table)
    .then((results) => { res.send(results) });
});

app.get("/create", async (req: Request, res: Response) => {
  let sql = req.query.sql;
  let table = req.query.table;
  await createSQL(sql, table)
    .then((results) => { res.send(results) });
});

app.get("/update", async (req: Request, res: Response) => {
  let sql = req.query.sql;
  let table = req.query.table;
  await updateSQL(sql, table)
    .then((results) => { res.send(results) });
});

app.get("/delete", async (req: Request, res: Response) => {
  let sql = req.query.sql;
  let table = req.query.table;
  await deleteSQL(sql, table)
    .then((results) => { res.send(results) });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
