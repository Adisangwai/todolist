const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const date = require(__dirname + "/date.js");

let items = ["Buy food", "Cook food", "Eat food"];
let workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workList });
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.post("/", function (req, res) {
  item = req.body.newItem;

  if (req.body.list === "Work") {
    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(process.env.PORT ||3000, function () {
  console.log("Server has started on port 3000");
});
