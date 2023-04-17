const express = require('express');
const connectDb = require('./dailyGross/src/config/dbConnection');
const bodyParser = require('body-parser');

const app = express();
connectDb();
const port = process.env.PORT || 5001 ;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const crptoRoute = require('./Routes/crpto');

app.use('/api/crypto', crptoRoute)

app.listen(port, () => {
    console.log(`server is  running in ${port}`);
});
  