var mongoose = require('mongoose');
var Item = require('../models/person');
var Place = require('../models/place');
var Person = require('../models/person');
var Admin = require('../models/admin');

var itemController = {};

// mostra todos items 
itemController.showAll = function(req, res){
    Admin.find({}).exec((err, dbitems)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbitems);
            res.render('admins/adminList', {items: dbitems});
        }
    })
}

// mostra 1 item por id
itemController.show = function(req, res){
    Admin.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('admins/adminViewDetails', {item: dbitem});
        }
    })
}

// form para criar 1 item
itemController.formCreate = function(req,res){
    Admin.find({}).exec((err, dbplaces)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('admins/createForm', {places: dbplaces});
        }
    })
}

// cria 1 item como resposta a um post de um form
itemController.create = function(req,res){
    var item = new Admin(req.body);
    item.save((err)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/admins');
        }
    })
}

// mostra 1 item para edicao
itemController.formEdit = function(req, res){
    Admin.findOne({_id:req.params.id}).exec((err, dbitem)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            Person.find({}).exec((err, dbplaces)=>{
                if (err){
                    console.log('Erro a ler');
                    res.redirect('/error')
                } else {
                    res.render('admins/adminEditDetails', {item: dbitem, places: dbplaces});
                }
            })
        }
    })
}

// edita 1 item como resposta a um post de um form editar
itemController.edit = function(req,res){
    Admin.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/admins/show/'+req.body._id);
        }
    } )
}

// elimina 1 item
itemController.delete = function(req, res){
    Admin.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/admins')
        }
    })
}

module.exports = itemController;