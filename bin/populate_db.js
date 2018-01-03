var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var Employee = mongoose.model('Employee');
var colors = require('colors');
var Team = mongoose.model('Team');

var data = {
    employee:[{
        id:'12311966',
        name:{
            first:'Bryan',
            last: 'John'
        },
        image: 'image/employees/1000003.png',
        address:{
            lines:['522 Dukeway Dr.','Apt No 2'],
            city:'Universal City ',
            state:'TX',
            zip:'78148'
        }
    },
      {        
    id:'1000021' ,
        name:{     
             first:'Adam',
             last: 'Bretz'
    }, 
    image:'images/employees/1000021.png',      
        address:{
              lines:['46 18th St ','St.210'],
    city:'Pitsburgh',
    state:'PA',
    zip : '15222'
        }
    },
    {
        id:'1000022',
        name:{
            first:'Matt',
            last: 'Liegey'
        },
        image: 'images/emplyoees/1000022',
        address:{
            lines:['2 Sout Market Square',('Market Squire')],
            city: 'Pitsburgh',
            state:'PA',
            zip:15222
        }
    },
    {id:'1000025',
     name:{
         first:'Aleksey',
         last: 'Smolenchuk'
     },
     image: 'images/employees/1000025',
     address:{
         lines:['3803 Forbes Ave'],
         city : 'Pitsburgh',
         state : 'PA',
         zip : 15223
     }
    },
    {          
        id:'1000030',
              name:{
              first: 'Sarah',
              last: 'Gay'
              },
        address:{
        lines:['University Bllvd'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15108
    }
        },
    {id:'1000031',
              name:{
              first:'Dave',
              last:'Beshero'
              },
              address:{
              lines:['1539 Washigton Rd'],
    city:'Mt Lebanon',
    state:'PA',
    zip:15228
    }
     }
    
     ],
teams:[
    {
        name:'Software and Services Group'
    },
    {name:'Project Devlopment'},
    {name : 'Accounting'},
    {name : 'Human Resource'}
]         
        
};

var deleteEmployee = function(callback){
    console.info('Deleting employee'.red);
    Employee.remove({}, function(error , response){
        if(error){
            console.error('Error deleting employee:' .red + error);
        }
        console.info('Done deleting employee'.red);
        callback();
    });
};

var addEmployee = function(callback){
    console.info('Adding employee');
    Employee.create(data.employee , function(error){
        if (error){
            console.error('Error'+ error);
        }
        console.info('Done adding employee'.green);
        callback();
    });
    
};

var deleteTeams = function(callback){
    console.info('Deleting teams'.red);
    Team.remove({},function(error,response){
        if (error){
            console.error('Error deleting teams:'.red+ error);
        }
        console.info('Done deleting team'.red);
        callback();
    });
};
    var addTeams = function(callback){
        console.info('Adding teams'.green);
        Team.create(data.teams,function(error , team1){
            if (error){
                console.error('Error creating Team:'.green + error);
            }else {
                data.team_id = team1._id;
                
            }
        console.info('Done adding Teams'.green);
                callback();
        });
    };
    var updateEmployeeTeams = function(callback){
        console.info('Updating employee teams'.green);
        var team = data.teams[0];
        
        //Set everyone to be on the same team to start
        Employee.update({},{
            team:data.team_id
            
        },
        {
        multi:true
        },
                        
            function(error , numberAffected , response){
                if (error){
                    console.error('Error updating employee team:'.red+ error);
                }
                console.info('Done updating employee teams'.blue);
                callback();
            
        });
    };
async.series([
    deleteEmployee,
    deleteTeams,
    addEmployee,
    addTeams,
    updateEmployeeTeams
],function(error , result){
    if(error){
        console.error('Error: '.red +error);
    }
    mongoose.connection.close();
    console.log('Done!'.green);
});
