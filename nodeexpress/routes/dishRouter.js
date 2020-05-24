const express =require("express");
const bodyParser = require("body-parser");
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route("/")

.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");
    next();
    
})

.get((req,res,next)=>
{
    res.end("will send all the dishes to you!");

})


.post((req,res,next)=>
{
    res.end("will add the dish:"+req.body.name+ "with details: "+req.body.description);


})
.put((req,res,next)=>
{
    res.statusCode=403;
    res.end("put operation not supproted here ");


})



.delete((req,res,next)=>
{
    res.end("deleting all the dishes");

});

dishRouter.route("/:dishId")
.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");
    next();

})
.get((req,res,next)=>
{
    res.end("Will send details of the dishes "+req.params.dishId+" to you!" );

})
.post((req,res,next)=>
{
    res.statusCode=403;
    res.end("POST operation not supported here /dishes/:"+req.params.dishId);

})
.put((req,res,next)=>
{
    res.write("Updating the dishes "+req.params.dishId+"\n");
    res.end("Will update the dieshes "+req.body.name+" with details "+req.body.description);

})
.delete((req,res,next)=>
{
    res.end("Deleting the dieshes "+req.params.dishId);
});
const express = require("express");
const bodyParser = require("body-parser");
const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
promotionRouter.route("/")
.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");
    next();

})
.get((req,res,next)=>
{
    res.end("Will send all the promotions to you !");

})
.post((req,res,next)=>
{
    res.end(" Will add the promotion "+req.body.name+" with details "+req.body.description);



})
.put((req,res,next)=>
{

 res.statusCode=403;
 res.end("PUT operation is not supported on /promotion");   

})
.delete((req,res,next)=>
{
    res.end("Deleting all the Promotions");

});
dishRouter.route("/:dishId")

.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");
    next();

})
.get((req,res,next)=>
{
    res.end("Will send details of the dishes "+req.params.dishId+" to you!" );

})
.post((req,res,next)=>
{
    res.statusCode=403;
    res.end("POST operation not supported here /dishes/:"+req.params.dishId);

})
.put((req,res,next)=>
{
    res.write("Updating the dieshes "+req.params.dishId+"\n");
    res.end("Will update the dishes "+req.body.name+" with details "+req.body.description);

})
.delete((req,res,next)=>
{
    res.end("Deleting the dishes "+req.params.dishId);
});






module.exports = dishRouter;
