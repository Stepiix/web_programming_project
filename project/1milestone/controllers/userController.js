var mongoose = require('mongoose');
var Person = require('../models/person');

var userController = {};

// Show all users 
userController.showAll = function(req, res){
    Person.find({}).exec((err, dbusers)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('persons/personList', {users: dbusers});
            // res.json(dbusers);
        }
    })
}

// Show 1 user by id
userController.show = function(req, res){
    Person.findOne({_id:req.params.id}).exec((err, dbuser)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('persons/personViewDetails', {user: dbuser});
        }
    })
}

// Form to create 1 user
userController.formCreate = function(req,res){
    res.render('persons/createForm');
}

// Create 1 user as a responde of a POST of a form
userController.create = function(req,res){
    var user = new Person(req.body);
    user.save((err)=>{
        if (err){
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/users');
        }
    })
}

// Show 1 user to edit
userController.formEdit = function(req, res){
    Person.findOne({_id:req.params.id}).exec((err, dbuser)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('persons/personEditDetails', {user: dbuser});
        }
    })
}

// Edit 1 user as a response of a POST of and edit form
userController.edit = function(req,res){
    Person.findByIdAndUpdate(req.body._id, req.body, (err, editedUser)=>{
        if (err){
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/users/show/'+req.body._id);
        }
    } )
}

// Eliminate 1 user
userController.delete = function(req, res){
    Person.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Reading error');
            
        } else {
            res.redirect('/users')
        }
    })
}

module.exports = userController;