import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var today = true;

var tasksList = {
  today: [],
  title: [],
  event: []
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  today = true;
  res.render(__dirname + "/views/index.ejs", {today: today, todayList: tasksList});
});

app.get("/projects", (req, res) => {
  today = false;
  res.render(__dirname + "/views/projects.ejs", {today: today, projectsList: tasksList});
});

app.post("/submit", (req, res) => {
  res.render(__dirname + "/views/addTask.ejs", {today: today});
});

app.post("/addNewTask", (req, res) => {
  tasksList.today.push(today);
  tasksList.title.push(req.body.title);
  tasksList.event.push(req.body.event);

  res.render(__dirname + "/views/addTask.ejs", {today: today});
});

app.get("/task/details/:id", (req, res) => {
  var task ={
    title: "",
    event: ""
  };

  console.log(req.params.id);

  var index = tasksList.title.indexOf(req.params.id);
  task.title = tasksList.title[index];
  task.event = tasksList.event[index];

  res.render(__dirname + "/views/tasks.ejs", {today: today, task: task});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});