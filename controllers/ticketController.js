var mongoose = require('mongoose');
var Ticket = require('../models/ticket');
var Item = require('../models/item');
var T_types = require('../models/t_type')

var ticketController = {};

// Show all the places 
ticketController.showAll = function(req, res){
    Ticket.find({}).exec((err, dbticket)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            id_e = req.params.id_e
            res.render('tickets/ticketList', {event: id_e, tickets: dbticket});
        }
    })
}

// Form to create many tickets
ticketController.formCreate = function(req,res){
    id_e = req.params.id_e
    
    T_types.find({}).exec((err, dbtypes)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('tickets/createForm', {event: id_e, types: dbtypes});
        }
    })
}


// Create many tickets as response of POST of form
ticketController.create = function(req,res){
    for (var i=0; i<req.body.quantity;i++) {
        var ticket = new Ticket(req.body);
        ticket.save((err)=>{
        if (err){
            console.log('Saving error');
            res.redirect('/error')
        } else {}
        })
    }
    res.redirect('/items/'+req.params.id_e+'/tickets');
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

// Eliminate 1 ticket
ticketController.delete = function(req, res){
    Ticket.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log('ok')
            res.redirect('/items/'+req.params.id_e+'/tickets')
        }
    })
}

module.exports = ticketController;