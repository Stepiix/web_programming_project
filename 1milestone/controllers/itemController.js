var mongoose = require('mongoose');
var Item = require('../models/item');
var Place = require('../models/place');
var Ticket = require('../models/ticket');
var Type = require('../models/t_type');
var Sale = require('../models/sale');

var itemController = {};

// mostra todos items 
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

// mostra 1 item por id
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

// form para criar 1 item
itemController.formCreate = function(req,res){
    Place.find({}).exec((err, dbplaces)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('items/createForm', {places: dbplaces});
        }
    })
}

// cria 1 item como resposta a um post de um form
itemController.create = function(req,res){
    var item = new Item(req.body);
    item.save((err)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            console.log(item)
            res.redirect('/items');
        }
    })
}

// mostra 1 item para edicao
itemController.formEdit = function(req, res){
    Item.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            Place.find({}).exec((err, dbplaces)=>{
                if (err){
                    console.log('Erro a ler');
                    res.redirect('/error')
                } else {
                    res.render('items/itemEditDetails', {item: dbitem, places: dbplaces});
                }
            })
        }
    })
}

// edita 1 item como resposta a um post de um form editar
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

// elimina 1 item
itemController.delete = function(req, res){
    Sale.remove({event_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Reading error - Sale');
            res.redirect('/error')
        } else {
            Type.remove({event_id:req.params.id}).exec((err)=>{
                if (err){
                    console.log('Reading error - Type');
                    res.redirect('/error')
                } else {
                    Ticket.remove({event_id:req.params.id}).exec((err)=>{
                        if (err){
                            console.log('Reading error - Ticket');
                            res.redirect('/error')
                        } else {
                            Item.remove({_id:req.params.id}).exec((err)=>{
                                if (err){
                                    console.log('Reading error - Event');
                                    res.redirect('/error')
                                } else {
                                    res.redirect('/items')
                                }
                            })
                        }
                    })
                }
            })
        }
    })

}

module.exports = itemController;