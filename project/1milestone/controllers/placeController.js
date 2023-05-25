var mongoose = require('mongoose');
var Place = require('../models/place');
var Sale = require('../models/sale');


var placeController = {};

// Show all the places 
placeController.showAll = function(req, res){
    Place.find({}).exec((err, dbplaces)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            console.log(dbplaces);
            res.render('places/placeList', {places: dbplaces});
        }
    })
}

// Form to create 1 place
placeController.formCreate = function(req,res){
    res.render('places/createForm');
}

// Create 1 place as response of POST of form
placeController.create = function(req,res){
    var place = new Place(req.body);
    place.save((err)=>{
        if (err){
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/places');
        }
    })
}

// Show 1 place to edit
placeController.formEdit = function(req, res){
    Place.findOne({_id:req.params.id}).exec((err, dbplace)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('places/placeEditDetails', {place: dbplace});
        }
    })
}

// Edit 1 place as response of POST edit form
placeController.edit = function(req,res){
    Place.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.redirect('/places');
        }
    } )
}

// Eliminate 1 place
placeController.delete = function(req, res){
    Place.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Reading error');
            
        } else {
            res.redirect('/places')
        }
    })
}

module.exports = placeController;