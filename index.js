/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const volunteers = require("./routes/volunteers");
const leaders = require("./routes/leaders");
const board = require("./routes/boardmembers").default;
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const app = express();

app.use(express.json());
// to make request body as json object
app.use(express.urlencoded({ extended: true })); //to understand url parameters
app.use(express.static("public"));

//using a templating engine
app.set("view engine", "pug");
app.use("/volunteers/", volunteers);
app.use("/leaders/", leaders);
app.use("/board/", board);

//config
console.log("App name : " + config.get("name"));
//console.log('Mail password : ' + config.get('mail.password'));

// only cmd work to change Node environment variable
if (app.get("env") === "development") {
  app.use(morgan("short"));
  startupDebugger("morgan enabled ... ");
}

//enbale debug for database
dbDebugger("Database is running ...");

// eslint-disable-next-line no-undef
let port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port} ... `)
});
