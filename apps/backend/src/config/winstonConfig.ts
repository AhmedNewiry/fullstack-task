import * as winston from 'winston'

const winstonConfig = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize()),
  transports:[
   new winston.transports.Console({level:'info'}),
    new winston.transports.File({filename:"logs/app.log", level:"error"})
  ]
})

export default winstonConfig;