const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./DB.js');
const serveStatic = require('serve-static');

const opportunityRoute = require('./routes/opportunity.route');
const accountRoute = require('./routes/account.route');
const stageRoute = require('./routes/stage.route');
const quoteRoute = require('./routes/quote.route');
const quoteStateRoute = require('./routes/quoteState.route');



const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => { console.log('MongoDB database connection established successfully'); },
  err =>  console.log('cannot connect to MongoDB database ' + err)
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/opportunities', opportunityRoute);
app.use('/accounts', accountRoute);
app.use('/stages', stageRoute);
app.use('/quotes', quoteRoute);
app.use('/quoteStates', quoteStateRoute);

app.use(serveStatic(__dirname + '/dist'));


const PORT = 4000;
const port = process.env.PORT || PORT;
app.listen(port, () => {
  console.log('Express server running on port ' + port);
});
