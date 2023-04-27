var mongoose = require('mongoose');
var Ticket = require('../models/ticket');
var Item = require('../models/item')

var ticketController = {};

// Show all the places 
ticketController.showAll = function(req, res){
    Ticket.find({}).exec((err, dbticket)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            Item.findOne({_id:req.params.id_e}).exec((err, dbitem)=>{
                if (err){
                    console.log('Erro a ler');
                    res.redirect('/error')
                } else {
                    res.render('tickets/ticketList', {item: dbitem, tickets: dbticket});
                }
            })
        }
    })
}

// Form to create 1 place
ticketController.formCreate = function(req,res){
    res.render('places/createForm');
}

// Create 1 place as response of POST of form
ticketController.create = function(req,res){
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
ticketController.formEdit = function(req, res){
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
ticketController.edit = function(req,res){
    Item.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/places/show/'+req.body._id);
        }
    } )
}

// Eliminate 1 place
ticketController.delete = function(req, res){
    Item.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/places')
        }
    })
}

module.exports = ticketController;