var mongoose = require('mongoose');
var Sale = require('../models/sale');
var Event = require('../models/item');
var User = require('../models/person');
var Ticket = require('../models/ticket');
const jwt = require('jsonwebtoken');
const config = require('../jwtsecret/config');

var saleController = {};

// mostra todos items 
saleController.showAll = function(req, res){
    Sale.find({}).exec((err, dbsales)=>{
        if (err){
            console.log('Reading error - Sales');
            res.redirect('/error')
        } else {
            User.find({}).exec((err, dbusers)=>{
                if (err){
                    console.log('Reading error - Users');
                    res.redirect('/error')
                } else {
                    Event.find({}).exec((err, dbevents)=>{
                        if (err){
                            console.log('Reading error - Sales');
                            res.redirect('/error')
                        } else {
                            res.render('sales/salesList', {sales: dbsales, users: dbusers, events: dbevents});
                        }
                    })
                }
            })
        }
    })
}

// Create 1 sale as a response to frontend POST
saleController.save = function(req,res){
    var sale = new Sale(req.body);
    sale.save((err)=>{
        if (err){
            console.log('Saving error');
            res.status(500).json({ error: 'Saving Error' });
        }
    })
}

saleController.getCart = function(req, res){
    var token = req.headers['token'];

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            res.status(500).json({ error: 'Validation Error' });

        Sale.find({ customer_id: decoded.id }).exec((err, dbsales) => {
            if(err)
                res.status(404).json({ error: 'Reading error - Sales' });
            res.status(200).json(dbsales);
        })
    })
}

// Delete 1 sale
saleController.delete = function(req, res){
    Ticket.remove({sale_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Reading error - Ticket');
            
        } else {
            Sale.remove({_id:req.params.id}).exec((err)=>{
                if (err){
                    console.log('Reading error - Sale');
                    
                } else {
                    res.redirect('/sales')
                }
            })
        }
    })
}

module.exports = saleController;