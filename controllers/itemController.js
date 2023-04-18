var mongoose = require('mongoose');
var Item = require('../models/item');

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
    res.render('items/createForm');
}

// cria 1 item como resposta a um post de um form
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

// mostra 1 item para edicao
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
    Item.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/items')
        }
    })
}

module.exports = itemController;