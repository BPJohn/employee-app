var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/Employees';

mongoose.connect(dbUrl);

//close the Mongoose connection on Contol+c
process.on('SIGINT',function(){
    mongoose.connection.close(function(){
        console.log('Mongoose default connection disconnect');
        process.exit(0);
    });
});
require('../models/employee');
require('../models/team');