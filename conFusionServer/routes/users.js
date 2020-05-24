// var express = require('express');
// const bodyParser = require("body-parser");
// var passport = require("passport");
// var router = express.Router();
// var User = require("../models/user");
// var authenticate = require("../authenticate");
// router.use(bodyParser.json());

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// router.post("/signup",(req,res,next)=>
// {
 

//   User.register(new User({username:req.body.username}),
//   req.body.password,(err,user)=>{
//     if(err)
//     {
//       res.statusCode = 500;
//       res.setHeader("Content-type","application/json");
//       res.json({err:err});
//     }
//     else{
//       if(req.body.firstname)
//       user.firstname = req.body.firstname;
//       if(req.body.lastname)
//       user.firstname = req.body.lastname;
//       user.save((err,user)=>
//       {
//         if(err)
//         {
//           res.statusCode = 500;
//           res.setHeader("Content-type","application/json");
//           res.json({err:err});
//           return;

//         }
        
//         passport.authenticate("local")(req,res,()=>{
//           res.statusCode = 200;
//           res.setHeader("Content-type","application/json");
//           res.json({success:true, status:"Registration Successful !",user:user});
        
    

//       });
    
//      });

//     }

//   })
// });


//app id 244220200236423 //********** */
//********** app secret 72aa387dcacfd16da698ed49f0c211c8 */

// router.post("/login", passport.authenticate("local"),(req,res,next)=>{

//   var token = authenticate.getToken({_id:req.user._id});
//   //creating token
//   //_id:req.user._id it is a payload
//   // coming here means user is authenticated

//   res.statusCode = 200;
//   res.setHeader("Content-type","application/json");
//   res.json({success:true,token:token, status:"you are logged in Successfully !",user:user});
// //it is the response message token will be sent back to user when user succesfully logged in

// //  if(!req.session.user)
// //   {
    
// //   var authHeader = req.headers.authorization;

// //   if(!authHeader)
// //   {
// //     var err = new Error("you are not authenticated !");
// //     res.setHeader("WWW-Authenticate","Basic");
// //     err.status = 401;
// //       return next(err);

// //   }
// //   var auth = new Buffer.from(authHeader.split(" ")[1],"base64").toString().split(":");

// //   var username = auth[0];
// //   var password = auth[1];
// // User.findOne({username:username})
// // .then((user)=>{

// //   if(user===null)
// //   {
// //     var err = new Error("User "+username+" does not exist ");

    
// //     err.status = 403;
// //       return next(err);
// //   }
// //   else if(user.password!==password)
// //     {
// //       var err = new Error("Your password is incorrect !");
// //       err.status = 403;
// //       return next(err);

// //     }
  
// //   else if(user.username ===username && user.password ===password)
// //   {
// //     req.session.user = "authenticated";
// //      res.statusCode=200;
// //      res.setHeader("content-type","text/plain");
// //      res.end("You are authenticated ");

    

  
 


// // }).catch((err)=>next(err));
  


//   // }
//   // else{
//   //   res.statusCode=200;
//   //   res.setHeader("content-type","text/plain");
//   //   res.end("You are already authenticated!");

//   // }



// });

// router.get("/logout",(req,res)=>{
//   if(req.session)
//   {
//     req.session.destroy();
//     //remove the session inf from the server side
//     res.clearCookie("session-id");
//     res.redirect("/");


//   }
//   else{
//     var err = new Error("Your are not logged in !");
//     err.status=403;
//     next(err);
//   }

// });

// module.exports = router;
var express = require("express");
var bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
var authenticate =require("../authenticate");
var router = express.Router();
const cors=require("./cors");
router.use(bodyParser.json());
router.get("/",cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>
{
  User.find({}),(err,user)=>
  {
    if(err)
    {
      return next(err);
    }
    else{
      res.statusCode=200;
      res.setHeader("Content-type","application/json");
      res.json(users);   
     }
  }
});


router.post("/signup",cors.corsWithOptions,(req,res,next)=>
{
  User.register(new User({
    username:req.body.username
  }),
  req.body.password,(err,user)=>
  {
    if(err)
    {
      res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err});

    }
  
  else{
    
    if(req.body.firstname)
    {
      user.firstname = req.body.firstname;

    }
    if(user.body.lastname)
    {
      user.lastname = req.body.lastname;
    }
    user.save((err,user)=>
    {
      passport.authenticate("local")(req,res,()=>
      {
        if(err)
        {
          res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({
                err: err
              });
              return;
        }
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'Registration Successful!'
        });
      });
    });
  }

  }
  );
});

router.post("/login",cors.corsWithOptions,passport.authenticate("local"),(req,res)=>
{
  var token = authenticate.getToken({
    _id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,status: 'You are successfully logged in!',token: token});
});
router.get("/logout",(req,res,next)=>{
  if(req.session)
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
    
  }
});

router.get("/facebook/token",passport.authenticate("facebook-token-strategy"),(req,res)=>{
  if(req.user){
    var token = authenticate.getToken({_id:req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,status: 'You are successfully logged in!',token: token});


  }
})
module.exports = router;



