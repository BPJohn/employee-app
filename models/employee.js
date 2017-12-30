var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;
//var Employee = mongoose.model('Employee',EmployeeSchema);
var EmployeeSchema = new Schema({
    id:{
        type:String,
        required :true,
        unique : true
    },
    name:{
        first:{
            type:String,
            required:true
        },
        last:{
            type:String,
            required: true
        }
    },
    team: {
        type:Schema.Types.ObjectId,
        ref:'Team'
    },
    image:{
        type:String,
        default:'image/user.png'
    },
    address :{
        lines:{
            type:[String]
        },
        city:{
            type :String
        },
        state:{
            type : String
        },
        zip:{
            type:Number
        }
    }
});
module.exports = mongoose.model('Employee',EmployeeSchema);


