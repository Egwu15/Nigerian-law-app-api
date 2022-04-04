

const {format, transports,createLogger } = require('winston');
const { combine, timestamp, prettyPrint, } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
// TODO: add conditional logging to db.
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log' }),
        new transports.Console,
    ],
});
module.exports = logger;