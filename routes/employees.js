"use strict";
var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/employees',function(req ,res , next){
    Employee.find().sort('name.last').exec(function(error,results){
        if(error){
            return next(error);
        }
        res.json(results);
    });
});

router.get('employees/:employeeId', function(req,res,next){
    Employee.findOne({
        id:req.params.employeeId
    }).populate('team').exec(function(error , results){
        if(error){
            return next(error);
        }
        res.json(results);
    });
});

router.put('/employees/:employeeId',function(req ,res,next){
    delete req.body._id;
    Employee.update({
        id: req.params.employeeId
    },req.body , function(err , nmberAffeced,response){
        if(err){
            return next(err);
        }
        res.send(200);
    });
});

module.exports = router;