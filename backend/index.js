const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')


//DATABASE CONNECTION:-
connectToMongo();

const app = express();
const port = 5000;
app.use(cors())
//tO SEND JSON DATA
app.use(express.json());

//ROUTES
app.use("/api/user", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
