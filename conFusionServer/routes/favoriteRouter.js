const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favourites = require('../models/favorite');
const  favouriteRouter = expres.ROuter();
favouriteRouter.use(bodyParser.json());
favouriteRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Favourites.find({})
    .populate('user')
    .populate('dishes')
    .then((favourites)=>{
        if(favourites)
        {
            user_fav = fav.filter(fav=>fav.user._id.toString === req.user.id.toString())[0];
            if(!user_fav)
            {
                var err = new Error("You have no favourite dishes");
                err.status = 404;
                return next(err);
            }
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json");
            res.json(user_fav);

        }
        else{
            var err = new Error("There are no favourites");
            err.status=404;
            return next(err);
        }
    
    },(err)=>next(err)).catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favourites.find({})
    .populate('user')
    .populate('dishes')
    .then((favourites)=>{
        var users;
        if(favourites)
        {
            users = favourites.filter(fav=>fav.user._id.toString()=== req.user.id.toString())[0];

        }
        if(!users)
        {
            users = new Favourites({user:req.user.id});
            
        }
        if(!user.dishes.find((data_id)=>
        {
            if(data_id._id)
            {
                return data_id._id.toString() === req.params.dishId.toString();
            }


        })
        user.dishes.push(req.params.dishId);
        user.save()
        .then((userFav)=>{
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(userFavs);
            console.log("Favourites Created");
        }, (err) => next(err))
        .catch((err) => next(err));

        })
        .catch((err)=>next(err));
    })
    .catch((err)=>next(err));


})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favourites/:dishId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.find({})
        .populate('user')
        .populate('dishes')
        .then((favourites) => {
            var user;
            if(favourites)
                user = favourites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            if(user){
                user.dishes = user.dishes.filter((dishid) => dishid._id.toString() !== req.params.dishId);
                user.save()
                    .then((result) => {
                        res.statusCode = 200;
                        res.setHeader("content-type", "application/json");
                        res.json(result);
                    }, (err) => next(err));
                
            } else {
                var err = new Error('You do not have any favourites dishes');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = favouriteRouter;