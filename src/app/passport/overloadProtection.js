const logger = require("hmpo-logger").get();
const router = require("express/lib/router");
const http = require('http')
const protect = require("overload-protection")("http", protectConfig);//is a reference to app here possible?

const protectConfig = {
    production: process.env.NODE_ENV === 'production', // if production is false, detailed error messages are exposed to the client
    clientRetrySecs: 1, // Retry-After header, in seconds (0 to disable) [default 1]
    sampleInterval: 5, // sample rate, milliseconds [default 5]
    maxEventLoopDelay: 400, // maximum detected delay between event loop ticks [default 42]
    maxHeapUsedBytes: 0, // maximum heap used threshold (0 to disable) [default 0]
    maxRssBytes: 0, // maximum rss size threshold (0 to disable) [default 0]
    errorPropagationMode: false, // dictate behavior: take over the response 
                                // or propagate an error to the framework [default false]
    logging: "error", // set to string for log level or function to pass data to
    logStatsOnReq: false // set to true to log stats on every requests
  };

module.exports = function (req, res, next) {
    //how do I set app.use in here, If we set to app in app-setup, this will work but not for all requests
    //If I set 
  try {
    http.createServer(function (req, res) {
        if (protect(req, res) === true) {
            router.use(protect);
            logger.info("Overload protection enabled");
        }
    })

    next();
  } catch (error) {
    return next(error);
  }
};