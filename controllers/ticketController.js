var mongoose = require('mongoose');
var Ticket = require('../models/ticket');
var Event = require('../models/item');
var T_types = require('../models/t_type')
var Customer = require('../models/person');
var Sale = require('../models/sale');
const { ObjectID } = require('mongodb');

var ticketController = {};

// Show all the places 
ticketController.showAll = function(req, res){
    Ticket.find({}).exec((err, dbtickets)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            T_types.find({event_id:req.params.id_e}).exec((err, dbtypes)=>{
                if (err){
                    console.log('Reading error - t_type');
                    res.redirect('/error')
                } else {
                    Sale.find({event_id:req.params.id_e}).exec((err, dbsales)=>{
                        if (err){
                            console.log('Reading error - sale');
                            res.redirect('/error')
                        } else {
                            var arrC = new Array()
                            dbsales.forEach((element) => {
                                Customer.find({_id:element.customer_id}).exec((err, dbcustomers)=>{
                                    if (err){
                                        console.log('Reading error - customer');
                                        res.redirect('/error')
                                    } else {
                                        arrC.push(dbcustomers[0])
                                    }

                                })
                            })

                            Event.findOne({_id:req.params.id_e}).exec((err, dbevent)=>{
                                if (err){
                                    console.log('Reading error - event');
                                    res.redirect('/error')
                                } else {
                                    res.render('tickets/ticketList', {event: dbevent, sales: dbsales, types: dbtypes, tickets: dbtickets, customers: arrC});
                                }
                            })        
                        }
                    })
                }
            })
        }
    })
}

// Form to create many tickets
ticketController.formCreate = function(req,res){ 
    Customer.find({}).exec((err, dbcustomers)=>{
        if (err){
            console.log('Reading error - customer');
            res.redirect('/error')
        } else {
            Event.findOne({_id:req.params.id_e}).exec((err, dbevent)=>{
                if (err){
                    console.log('Reading error - event');
                    res.redirect('/error')
                } else {
                    Ticket.find({event_id:dbevent._id}).exec((err, dbtickets)=>{
                        if (err){
                            console.log('Reading error - ticket');
                            res.redirect('/error')
                        } else {
                            T_types.find({event_id:dbevent._id}).exec((err, dbtypes)=>{
                                if (err){
                                    console.log('Reading error - type');
                                    res.redirect('/error')
                                } else {
                                    res.render('tickets/createForm', {event: dbevent, types: dbtypes, tickets: dbtickets, customers: dbcustomers});      
                                }
                            })
                        }
                    })
                }
            })    
        }
    })

    
}

// Create many tickets as response of POST of form
ticketController.create = function(req,res){
    for (var i=0; i<req.body.quantity;i++) {
        var ticket = new Ticket(req.body);
        
        var sale = new Sale()
        sale.customer_id = req.body.customer_id
        sale.ticket_id = ticket._id
        sale.event_id = req.params.id_e
        sale.save((err)=>{
            if (err){
                console.log('Saving error - Sale');
                res.redirect('/error')
            } else {}       
        })

        ticket.sale_id = sale._id
        ticket.save((err)=>{
            if (err){
                console.log('Saving error - Ticket');
                res.redirect('/error')
            } else {}
        })
    }

    res.redirect('/items/'+req.params.id_e+'/tickets');
}

// Show 1 ticket to edit
ticketController.formEdit = function(req, res){
    Ticket.find({_id:req.params.id}).exec((err, dbticket)=>{
        if (err){
            console.log('Reading error - ticket');
            res.redirect('/error')
        } else {
            T_types.find({}).exec((err, dbtypes)=>{
                if (err){
                    console.log('Reading error - type');
                    res.redirect('/error')
                } else {
                    res.render('tickets/ticketEditDetails', {ticket: dbticket[0], types: dbtypes});
                }
            })
        }
    })   
}

// Edit 1 place as response of POST edit form
ticketController.edit = function(req,res){
    Ticket.findByIdAndUpdate(req.body._id, req.body, (err, editedEvent)=>{
        if (err){
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/items/'+req.params.id_e+'/tickets');
        }
    } )
}

// Eliminate 1 ticket
ticketController.delete = function(req, res){
    Sale.remove({ticket_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Reading error - Sale');
            res.redirect('/error')
        } else {
            Ticket.remove({_id:req.params.id}).exec((err)=>{
                if (err){
                    console.log('Reading error - Ticket');
                    res.redirect('/error')
                } else {
                    res.redirect('/items/'+req.params.id_e+'/tickets')
                }
            })
        }
    })
}

module.exports = ticketController;