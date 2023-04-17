var mongoose = require("mongoose")
var Product = require("../models/product");

var productController = {};

productController.createProduct = function(req, res, next){
    var product = new Product(req.body);

    product.save()
    .then(function(savedProduct) {
      res.json(savedProduct);
    })
    .catch(function(err) {
      next(err);
    });
};

productController.updateProduct = function (req, res, next){
    Product.findByIdAndUpdate(req.body._id, req.body, {new: true}, function
        (err, product){
            if(err){
                next(err);
            } else{
                res.json(product);
            }
        });
};

productController.deleteProduct = function(req, res, next) {
    req.product.remove(function(err){
        if(err){
            next(err);
        } else {
            res.json(req.product);
        }
    });
};

productController.getAll = function(req, res, next) {
        Product.find().exec()
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                return next(err);
            });
};

productController.getOneProduct = function (req, res) {
    res.json(req.product);
};


productController.getByIdProduct = function (req, res, next, id){
    Product.findOne({_id: id}, function (err, product)  {
        if (err) {
            next(err);
        } else  {
            req.product = product;
            next();
        }
    });
};

module.exports = productController;