var mongoose = require('mongoose');
var Person = require('../models/person');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../jwtsecret/config');


var userController = {};

// Show all users 
userController.showAll = function (req, res) {
    Person.find({}).exec((err, dbusers) => {
        if (err) {
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('persons/personList', { users: dbusers });
            // res.json(dbusers);
        }
    })
}

// Show 1 user by id
userController.show = function (req, res) {
    Person.findOne({ _id: req.params.id }).exec((err, dbuser) => {
        if (err) {
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('persons/personViewDetails', { user: dbuser });
        }
    })
}

// Login
userController.check = function(req, res){
    Person.findOne({ email: req.body.e }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.pw, user.password);
        
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
  });
}

// Register
userController.register = function(req, res){
    console.log("ahoj");
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("cau");
    Person.create({
        name : req.body.name || '',
        email : req.body.email,
        password : hashedPassword,
        role: req.body.email || "USER",
        phonenumber:  req.body.phonenumber,
        points: 0,
    }, 
    function (err, user) {
        console.log("kde ses");
        if (err) return res.status(500).json(err);
    
        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
}

userController.verifyToken = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
  
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  
  }

  userController.verifyTokenAdmin = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err || decoded.role !== 'ADMIN') 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token or not Admin' });    
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  
  }


// Form to create 1 user
userController.formCreate = function (req, res) {
    res.render('persons/createForm');
}

// Create 1 user as a responde of a POST of a form
userController.create = function (req, res) {
    var user = new Person(req.body);
    user.save((err) => {
        if (err) {
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/users');
        }
    })
}

userController.create2 = function (req, res) {
    var user = new Person(req.body);
    user.save((err) => {
        if (err) {
            console.log('Saving error');
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(user);
        }
    })
}

// Show 1 user to edit
userController.formEdit = function (req, res) {
    Person.findOne({ _id: req.params.id }).exec((err, dbuser) => {
        if (err) {
            console.log('Reading error');
            res.redirect('/error')
        } else {
            res.render('persons/personEditDetails', { user: dbuser });
        }
    })
}

// Edit 1 user as a response of a POST of and edit form
userController.edit = function (req, res) {
    Person.findByIdAndUpdate(req.body._id, req.body, (err, editedUser) => {
        if (err) {
            console.log('Saving error');
            res.redirect('/error')
        } else {
            res.redirect('/users/show/' + req.body._id);
        }
    })
}

// Eliminate 1 user
userController.delete = function (req, res) {
    Person.remove({ _id: req.params.id }).exec((err) => {
        if (err) {
            console.log('Reading error');

        } else {
            res.redirect('/users')
        }
    })
}

// Get profile infos
userController.profile = function (req, res) {
    var token = req.headers['token'];
    const userId = "";

    jwt.verify(token, config.secret, function(err, decoded) {  //with token finds user
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Validation Error' });
        }
        Person.findById(decoded.id, function (err, user) {
            if (err)    // Handle the error appropriately
              res.status(505).json({ error: 'Internal Server Error' });
            if (user == null)  // User not found
              res.status(404).json({ error: 'User not found' });
            
            res.status(200).json(user)
        });
      });
};

module.exports = userController;