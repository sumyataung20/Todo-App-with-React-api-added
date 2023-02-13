//  curl -X POST localhost:8000/tasks -d subject=Subject
// curl -X GET localhost:8000/tasks

const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");

// using express, create App obj
const app = express();

const cors = require("cors");
app.use(cors());

const mongo = new MongoClient("mongodb://localhost");
const db = mongo.db("todo");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/tasks", async (req, res) => {
  const { subject } = req.body;

  const result = await db.collection("tasks").insertOne({
    subject,
    done: false,
  });

  const task = await db
    .collection("tasks")
    .find({
      _id: ObjectId(result.insertedId),
    })
    .toArray();

  res.json(task[0]);
});

app.get("/tasks", async (req, res) => {
  const tasks = await db.collection("tasks").find().toArray();
  console.log(tasks);
  res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { subject } = req.body;

  const result = await db.collection("tasks").updateOne(
    { _id: ObjectId(id) },
    {
      $set: { subject },
    }
  );

  res.json(result);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.collection("tasks").deleteOne({
    _id: ObjectId(id),
  });

  res.json(result);
});

app.put("tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { subject } = req.body;

  const result = await db.collection("tasks").updateOne(
    { _id: ObjectId(id) },
    {
      $set: { subject },
    }
  );

  res.json(result);
});

app.listen(8000, () => {
  console.log("API running at port 8000");
});
