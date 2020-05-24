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
promotionRouter.route("/:proId")

.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");
    next();

})
.get((req,res,next)=>
{
    res.end("Will send details of the promotion "+req.params.proId+" to you!" );

})
.post((req,res,next)=>
{
    res.statusCode=403;
    res.end("POST operation not supported here /promotion/:"+req.params.proId);

})
.put((req,res,next)=>
{
    res.write("Updating the promotion "+req.params.proId+"\n");
    res.end("Will update the promotion "+req.body.name+" with details "+req.body.description);

})
.delete((req,res,next)=>
{
    res.end("Deleting the promotion "+req.params.proId);
});


module.exports = promotionRouter;
