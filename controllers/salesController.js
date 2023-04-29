var mongoose = require('mongoose');
var Sale = require('../models/sale');

var saleController = {};

// mostra todos items 
saleController.showAll = function(req, res){
    Sale.find({}).exec((err, dbitems)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbitems);
            res.render('sales/salesList', {items: dbitems});
        }
    })
}

// mostra 1 item por id
saleController.show = function(req, res){
    Sale.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('items/itemViewDetails', {item: dbitem});
        }
    })
}

// form para criar 1 item
saleController.formCreate = function(req,res){
    Place.find({}).exec((err, dbplaces)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('sales/createForm', {places: dbplaces});
        }
    })
}

// cria 1 item como resposta a um post de um form
saleController.create = function(req,res){
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
saleController.formEdit = function(req, res){
    Sale.findOne({_id:req.params.id}).exec((err, dbitem)=>{
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
saleController.edit = function(req,res){
    Sale.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/items/show/'+req.body._id);
        }
    } )
}

// elimina 1 item
saleController.delete = function(req, res){
    Sale.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/sales')
        }
    })
}

module.exports = saleController;