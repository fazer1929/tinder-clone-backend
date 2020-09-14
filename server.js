const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Cards = require("./dbCards");
//App Config
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:vdnKXNv2zh8Pp6Of@tinderclone.kaxyu.gcp.mongodb.net/userdb?retryWrites=true&w=majority";

//MiddleWares
app.use(express.json());
app.use(cors());

//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//Listener

app.listen(PORT, () => console.log(`App Started on PORT: ${PORT}`));
