const express = require("express");
require('dotenv').config();

const database = require("./config/database"); 
database.connect();

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
const router = require("./routes/client/index.route");
const adminRouter = require("./routes/admin/index.route");
const systemConfig = require("./config/system");
const methodOverride = require('method-override')

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

router(app);
adminRouter(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    //console.log(`${__dirname}`);
})