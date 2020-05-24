const express = require("express");
const cors = require("cors");
const app = express();
const whitelist = ["http://localhost:3000","https://localhost:3443"];

//white list contain all the origin that this server will accept
var corsOptionsDelegate = (req,callback)=>
{
    var corsOptions;
    if(whitelist.indexOf(req.header('origin'))!==-1)
    {
        //checking incoming req origin is in whitelist
        corsOptions={origin:true};
    }
    else{
        corsOptions={origin:false};
    }
    callback(null,corsOptions);
};
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);