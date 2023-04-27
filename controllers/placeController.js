var mongoose = require('mongoose');
var Item = require('../models/place');
var Sale = require('../models/sale');


var itemController = {};

// Show all the places 
itemController.showAll = function(req, res){
    Item.find({}).exec((err, dbitems)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbitems);
            res.render('places/placeList', {items: dbitems});
        }
    })
}

// Form to create 1 place
itemController.formCreate = function(req,res){
    res.render('places/createForm');
}

// Create 1 place as response of POST of form
itemController.create = function(req,res){
    var item = new Item(req.body);
    item.save((err)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/places');
        }
    })
}

// Show 1 place to edit
itemController.formEdit = function(req, res){
    Item.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('places/placeEditDetails', {item: dbitem});
        }
    })
}

// Edit 1 place as response of POST edit form
itemController.edit = function(req,res){
    Item.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/places');
        }
    } )
}

// Eliminate 1 place
itemController.delete = function(req, res){
    Item.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/places')
        }
    })
}

module.exports = itemController;