const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const bluebird = require('bluebird')

const config = require('./config')
const routes = require('./routes')

const app = express()
const { parseDomain, ParseResultType } = require("parse-domain");

mongoose.Promise = bluebird
mongoose.connect(config.mongo.url)

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use((req, res, next)=>{
  //Middleware to pull out the subdomain and make it the created by user of the incoming request.
  const parseResult = parseDomain(req.hostname);

  console.log(parseResult);

  if(parseResult.type === ParseResultType.Listed) {
    const parsedJoinedSubdomain = parseResult.subDomains.join('');
    //Used with an actual TLD.
    //Add to the entire request so we can use it for queries.
    req.createdBy = parsedJoinedSubdomain;
    req.query.createdBy = parsedJoinedSubdomain;
    //On anything with a body let's 
    if(Object.keys(req.body).length > 0){
      console.log("Got a body");
      req.body.createdBy = parsedJoinedSubdomain;
    }
    next();
    return;
  }
  //Will stop the request here if we cannot figure out how to get the subdomains out.
  next("Didn't get a valid domain. Can't figure out how to parse the domain for host: " + req.hostname);
})

app.use('/', routes)

const httpsServer = https.createServer({
  key: fs.readFileSync('./certs/private.key.pem'),
  cert: fs.readFileSync('./certs/domain.cert.pem'),
},app);

httpsServer.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`)
})

module.exports = app
