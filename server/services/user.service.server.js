var app = require("../../express");
var passport = require("passport");
var userModel = require("../models/user/user.model.server");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.post("/api/user/", registerUser);
app.get("/api/user/", findUserByUserName);
app.post("/api/login/",passport.authenticate('local'), login);
app.get("/api/user/:userId", getUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/checkLogin", checkLogin);

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['profile', 'email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#!/user',
        failureRedirect: '/#!/login'
    }));

var facebookConfig = {
    clientID : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#!/user',
        failureRedirect: '/#!/login'
    }));

var googleConfig = {
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}



function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if(user) {
                return done(null, user)
            } else {
                var email = profile.emails[0].value;
                var emailParts = email.split('@');
                var newFacebookUser = {
                    username : emailParts[0],
                    firstname : profile.name.givenName,
                    lastname : profile.name.familyName,
                    email : email,
                    facebook : {
                        id : profile.id,
                        token: token
                    }
                };
                return userModel.createUser(newFacebookUser);
            }
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(function (user) {
           if(user) {
               return done(null, user)
           } else {
               var email = profile.emails[0].value;
               var emailParts = email.split('@');
               var newGoogleUser = {
                   username : emailParts[0],
                   firstname : profile.name.givenName,
                   lastname : profile.name.familyName,
                   email : email,
                   google : {
                       id : profile.id,
                       token: token
                   }
               };
               return userModel.createUser(newGoogleUser);
           }
        });
}

function localStrategy(username, password, done) {
    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            if(!user) {
                return done(null, false);
            }
            return done(null, user);
        }, function (err) {
            if(err) {
                return done(err);
            }
        });
}

function checkLogin(request, response) {
    response.send(request.isAuthenticated() ? request.user : "0");
}

function getUserById(request, response) {
    var userId = request.params.userId;
    userModel.findUserById(userId)
        .then(function (user) {
           response.json(user);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function login(request, response) {
    var user = request.user;
    return response.json(user);
}

function findUserByUserName(request, response) {
    var username = request.query.username;
    userModel.findUserByUserName(username)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
    return;
}

function registerUser(request, response) {
    var user = request.body;
    userModel.createUser(user)
        .then(function (user) {
            response.json(user);
        });
}

function updateUser(request, response) {
    var userId = request.params.userId;
    var user =  request.body;

    userModel.updateUser(userId, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteUser(request, response){
    var userId = request.params.userId;
    userModel.deleteUser(userId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
           response.send(err);
        });
}