const express = require("express");
require('dotenv').config();

const database = require("./config/database"); 
database.connect();

const app = express();
const port = process.env.PORT;
const router = require("./routes/client/index.route");


app.set("views", "./views");
app.set("view engine", "pug")
app.use(express.static("public"));

router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})