const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const leaderRouter = require("./route/leaderRouter");
const morgan = require("morgan");
const hostname ="localhost";
const port =3000;
const app =express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/leader",(req,res,next)=>
{
    res.statusCode=200;
    res.setHeader("content-type","text/plain");
    next();
});
app.use("/leader",leaderRouter);
app.use(express.static(__dirname+"/public"));
app.use((req,res,next)=>
{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader("content-type","text/html");
    res.end("<html><body><h1>Hello</h1></body></html>");
});
const server= http.createServer(app);
server.listen(port,hostname,()=>
{
    console.log(`server is running at http://${hostname}:${port}`);
});