const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url);
connect.then((db)=>
{
    console.log("connected correctly to server");
   Dishes.create({
        name:"pizza",
        description:"text"

    })
    .then((dish)=>
    {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:"updated text"}},{new:true
        }).exec();
    })
    .then((dish)=>
    {
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment:"nice one",
            author:"mark danny"

        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
    

        return Dishes.remove({});

    })
    .then(()=>
    {
        return mongoose.connection.close();
    })
    .catch((err)=>
    {
        console.log(err);
    });
    

});