const express = require("express");
const leaderRouter = require("./routes/leaderRouter");
const http=require("http");
const promotionRouter= require("./routes/promotionRouter");
const dishRouter = require("./routes/dishRouter");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hostname="localhost";
const port =3000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/promotion",(req,res,next)=>
{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");

    next();
});

app.use("/promotion",promotionRouter);
app.use("/leader",leaderRouter);
app.use("/dishes",dishRouter);
app.use(express.static(__dirname+"/public"));
app.use((req,res,next)=>
{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader("content-type","text/html");
    res.end("<html><body><h1>Hello</h1></body></html>")
})

const server = http.createServer(app);
server.listen(port,hostname,()=>
{
    console.log(`server is running at http://${hostname}:${port}`);
});
