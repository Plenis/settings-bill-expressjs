const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const SettinngsBillExpress = require("./settings-bill");

const app = express();
const settingsBill = SettinngsBillExpress;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/settings", function(req, res) {
//   settingsBill.setSettings({
//     callCost: req.body.callCost,
//     smsCost: req.body.smsCost,
//     warningLevel: req.body.warningLevel,
//     criticalLevel: req.body.criticalLevel
//   });

  console.log(req.body);

  res.redirect("/");
});

// app.post("/action", function(req, res) {

// });

// app.get("/actions", function(req, res) {

// });

// app.post("/actions/:type", function(req, res) {

// });

const PORT = process.env.PORT || 3011;

app.listen(PORT, function() {
  console.log("App has started");
});
