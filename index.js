const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const SettinngsBillExpress = require("./settings-bill");


const app = express();
const settingsBillExpress = SettinngsBillExpress();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  console.log(req.body);
  const totals = settingsBillExpress.totals();
  const settings = settingsBillExpress.getBillSettings();
  let colorChange = settingsBillExpress.colorChange();
  res.render("index", { settings, totals, colorChange});
});

app.post("/settings", function(req, res) {
  settingsBillExpress.setBillSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });

  console.log(req.body);

  res.redirect("/");
});

app.post("/action", function(req, res) {
  settingsBillExpress.recordOption(req.body.optionType);
  res.redirect("/");
});

app.get("/actions", function(req, res) {
  console.log(settingsBillExpress.options());
  res.render("actions", { actions: settingsBillExpress.options() });
});

app.get("/actions/:actionType", function(req, res) {
  const actionType = req.params.actionType;
  res.render("actions", { actions: settingsBillExpress.optionType(actionType) });
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function() {
  console.log("App has started");
});
