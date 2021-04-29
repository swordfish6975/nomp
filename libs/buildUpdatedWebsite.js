var stats = require('./stats.js');
var logSystem = 'test111111';
var PoolLogger = require('./logUtil.js');
const util = require('util');

var lstats;
var logger;

var send = function()
{
  logger.special(logSystem, 'send', 'start');
  process.send(JSON.stringify({stats: lstats.stats, statHistory: lstats.statHistory, statPoolHistory: lstats.statPoolHistory, statsRes: lstats.statsRes }));
  logger.special(logSystem, 'send', 'end');
}

process.on('message', function(args) {

 if(args.type === 'init')
 {
   var portalConfig = JSON.parse(args.portalConfig);
   var poolConfigs = JSON.parse(args.poolConfigs);

   logger = new PoolLogger({
    logLevel: portalConfig.logLevel,
    logColors: portalConfig.logColors
   });


   logger.special(logSystem, 'onMessage', 'init');
   lstats = new stats(logger, portalConfig, poolConfigs);
   logger.special(logSystem, 'init', 'end');
 }
 else
 {
   logger.special(logSystem, 'onMessage', 'run');
   lstats.getGlobalStats(send);
 }

});


