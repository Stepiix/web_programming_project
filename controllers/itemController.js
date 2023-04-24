var mongoose = require('mongoose');
var Item = require('../models/item');

var itemController = {};

// Shows all the elements
itemController.showAll = function(req, res){
    Item.find({}).exec((err, dbitems)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbitems);
            res.render('items/itemList', {items: dbitems});
        }
    })
}

// Show 1 item by id
itemController.show = function(req, res){
    Item.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('items/itemViewDetails', {item: dbitem});
        }
    })
}

// Form to create 1 item
itemController.formCreate = function(req,res){
    res.render('items/createForm');
}

// Create 1 item as a response to POST of a form
itemController.create = function(req,res){
    var item = new Item(req.body);
    item.save((err)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/items');
        }
    })
}

// Show 1 item to edit
itemController.formEdit = function(req, res){
    Item.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('items/itemEditDetails', {item: dbitem});
        }
    })
}

// Edit 1 item as a response of the edit form
itemController.edit = function(req,res){
    Item.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/items/show/'+req.body._id);
        }
    } )
}

// Eliminate 1 item
itemController.delete = function(req, res){
    Item.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/items')
        }
    })
}

module.exports = itemController;