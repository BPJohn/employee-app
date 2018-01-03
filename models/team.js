var mongoose = require('mongoose');
var db = mongoose.connection;
var postFind = require('mongoose-post-find');
var async = require('async');
var colors = require('colors');
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://localhost:27017/Humanresources';
var TeamSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    members : {
    type :[Schema.Types.Mixed]
}


});

function _attachMembers (Employee,result , callback){
    Employee.find({
        team:result._id
    },function(error , employees){
        if(error){
            return callback(error);
        }
        result.members = employees;
        callback(null , result);
    });
}

// listem for find and findOne


/*var EmployeeSchema = new Schema({
    name:{
        first : {
            type: String,
            required : true
        },
        last :{
            type : String,
            required : true
        }
    },
    team : {
        type : Schema.Types.ObjectId,
        ref : 'Team'
    },
    image :{
        type : String,
        default:'images/user/.png'
    },
    address:{
        type :[String]
    },
    postal :{
        type :String
    }
});*/

var Team = mongoose.model('Team',TeamSchema);
db.on('error',function(){
    console.log('Ther was an error connect with the Database !');
});
mongoose.createConnection(dbUrl,function(err){
    if(err){
        return console.log('There was an error communicating with the Database'+ err);
    }
    console.log('Connected To MongoDB frome team.js!'.green);

    Team.create([{
        name : 'Product Development'
    },{
        name : 'Dev Ops'
    },{
        name : 'Accounting'
    }
                ]),
        function (error,pd ,devops,acct){
        if(error){
            console.log(error);


        }else{
            console.dir(pd);
            console.dir(devops);
            console.dir(acct);
            db.close();
            process.exit();
        }
    }

    /*var team = new Team({
        name:'Product Development'
    });
    team.save(function(error,data){
        if(error){
            console.log(error);
        }else{
            console.dir(data);
        }
        db.close();
        process.exit();
    });*/
});




TeamSchema.plugin(postFind,{
    find:function(result, callback){
        var Employee = mongoose.model('Employee');
        async.each(result ,function(item,callback){
            _attachMembers(Employee,item,callback);
        },
                  function(error){
            if(error){
                return callback(error);
            }
            callback(nul,result)
        });
    },
    findOne:function(result,callback){
        var Emplyee = mongoose.model('Emplyee');
        _attachMembers(Emplyee,result,callback);
    }
});
mongoose.createConnection(dbUrl,function(){
    console.log('connected To Database form team.js'.blue);


});
module.exports = mongoose.model('Team',TeamSchema);
