/*requirements*/
const express = require('express');
const bodyParser = require('body-parser');  /*to handle HTTP POST request*/

const app = express();  /*creating an express app*/

const port = 3000;  /*setting the listening port at port 3000*/

/*parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))
/*parse requests of content-type - application/json*/
app.use(bodyParser.json());

/*configuring the database*/
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');   /*ODM library*/

/*connecting to the database*/
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true   /*to fix deprecation warnings*/
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/*defining a simple route*/
app.get('/', (req, res) => {
    res.send('Chance Beauty');
});

/*defining other product routes*/
require('./app/routes/product.routes.js')(app);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
});