var mongoose = require('mongoose');
var T_type = require('../models/t_type')

var t_TypeController = {};

// Show all the places 
t_TypeController.showAll = function(req, res){
    T_type.find({}).exec((err, dbtype)=>{
        if (err){
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('t_types/typeList', {event: req.params.id_e, types: dbtype});
        }
    })
}

// Form to create 1 type
t_TypeController.formCreate = function(req,res){
    res.render('t_types/createForm', {event: req.params.id_e});
}


// Create 1 type as response of POST of form
t_TypeController.create = function(req,res){
    var type = new T_type(req.body);
    type.save((err)=>{
        if (err){
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/items/'+req.params.id_e+'/tickets/create');
        }
    })  
}

// // Show 1 place to edit
// ticketController.formEdit = function(req, res){
//     Item.findOne({_id:req.params.id}).exec((err, dbitem)=>{
//         if (err){
//             console.log('Erro a ler');
//             res.redirect('/error')
//         } else {
//             res.render('places/placeEditDetails', {item: dbitem});
//         }
//     })
// }

// // Edit 1 place as response of POST edit form
// ticketController.edit = function(req,res){
//     Item.findByIdAndUpdate(req.body._id, req.body, (err, editedItem)=>{
//         if (err){
//             console.log('Erro a gravar');
//             res.redirect('/error')
//         } else {
//             res.redirect('/places/show/'+req.body._id);
//         }
//     } )
// }

// Eliminate 1 type
t_TypeController.delete = function(req, res){
    T_type.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.redirect('/items/'+req.params.id_e+'/tickets/allTypes');
        }
    })
}

module.exports = t_TypeController;