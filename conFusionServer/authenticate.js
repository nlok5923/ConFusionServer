// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var User =require("./models/user");
// var JwtStrategy= require("passport-jwt").Strategy;

// var ExtractJwt = require("passport-jwt").ExtractJwt;
// var jwt = require("jsonwebtoken");
// var config = require("./config");



// exports.local = passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// exports.getToken = function(user)
// {
//     return jwt.sign(user,config.secretKey,{
//         expiresIn:3600
//         //it is 1 hr
//         //tell how long json token will be valid
//     });
// };
// var opts = {};//jwt based strategy

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// //extracting information from header using Extract jwt method

// opts.secretOrKey = config.secretKey;
// //supply the secret key to use within sign in

// exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload , done)=> {
//     // done is a callback provided by passport it will pass inf back to passport

//     console.log("JWT payload: ",jwt_payload);
// //it is a verify function
// //there is a id field present in jwt payload
//     User.findOne({_id:jwt_payload._id},(err,user)=>
//     {
//         if(err)
//         {
//             return done(err,false);
//             //false means user do not exist

//         }
//         else if(user)
//         {
//             return done(null,user);
//             //null is passed because no error

//         }
//         else{
//             return done(null,false);
//             // no error and no user
//         }


//     })

// }));

// exports.verifyUser = passport.authenticate("jwt",{session:false});
// // this will verify an incomming user
// //no session created in this case
// // as we are using token based authentication
// //user will be a json object
// making authenticate.js from scratch
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var config =require("./config");
var FacebookTokenStrategy = require("passport-facebook-token");


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);
exports.getToken = (user)=>
{
    return jwt.sign(user,config.secretKey,{
        expiresIn:4000
    });
}
var opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>
{
    console.log("JWT Payload : ", jwt_payload);
    User.findOne({
        _id: jwt_payload._id
    },(err,user)=>
    {
        if(err)
        {
            return done(err,false);
        }
        else if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })

}));

exports.verifyUser = (req,res,next)=>
{
    var token = req.body.token||req.query.token||req.headers['x-access-token'];
    if(token)
    {
        jwt.verify(token,config.secretKey,(err,decoded)=>
        {
            if(err)
            {
                var err = new Error("You are not Authenticated to perform this operation");
                err.status = 403;
                return next(err);
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    }
    else
    {
        var err = new Error("No token provided by you");
        err.status = 401;
        return next(err);

    }
};


exports.verifyAdmin = (req,res,next)=>{
    if(req.user.admin)
    {
        next();
    }
    else
    {
        var err= new Error("You are not authorized to perform this function ");
        err.status=403;
        return next(err);

    }

};



exports.facebookPassport = passport.use(new FacebookTokenStrategy({
clientID:config.facebook.clientID,
clientSecret :config.facebook.clientSecret},
(accessToken,refreshToken,profile,done)=>
{
    User.findOne({facebookId:profile.id},(err,user)=>
    {
        if(err){
            return done(err,false);

        }
        if(!err && user != null){
            return done(null,user);
        }
        else {
            user= new User({username:profile.displayName});
            user.facebookId =profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.fammilyName;
            user.save((err,user)=>{
                if(err)
                {
                    return done(err,false);
                }
                else{
                    return done(null,user);
                }
            })

        }

    });

}

));
