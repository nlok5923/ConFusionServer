const MongoClient = require("mongodb").MongoClient;
const dboper = require("./operation");

const assert = require("assert");
const url = "mongodb://localhost:27017/";
const dbname = "confusion";
// MongoClient.connect(url,(err,client)=>
// {
//   assert.equal(err,null);
//   // assert function allows to make variuos check
//  console.log("Connected correctly to the server");
//  const db = client.db(dbname);
// ****** without using then and promisis************
// dboper.insertDocument(db,{name:"hello",description:"test"},"dishes",(result)=>
// {
//     console.log("Insert Document:\n",result.ops);
//     dboper.findDocuments(db,"dishes",(docs)=>
//     {
//         console.log("found documents:\n",docs);
//         dboper.updateDocument(db,{name:"hello"},{description:"test completed"},"dishes",(result)=>
//         {
//             console.log("Updated document:\n",result.result);
//             dboper.findDocuments(db,"dishes",(docs)=>
//             {
//                 console.log("found documents:\n",docs);
//                 db.dropCollection("dishes",(result)=>
//                 {
//                     console.log("droped colelction: ",result);
//                     client.close()

//                 });

//             });

//         });

//     });

// });

// //  const collection = db.collection("dishes");
// //  collection.insertOne({"name":"pizza","define":"hello this is pizza"},(err,result)=>
// //  {
// //      assert.equal(err,null);
// //      console.log("After insert:\n");
// //      console.log(result.ops);
// //      // ops on of operation
// //      collection.find({}).toArray((err,docs)=>
// //      {
// //          assert.equal(err,null);
// //          console.log("found\n");
// //          console.log(docs);
// //          // docs will print all the data
// //          //all will be seen ass no filter applied
// //          // drop collection deletes the db
// //          db.dropCollection("dishes",(err,result)=>
// //          {
// //              assert.equal(err,null);
// //              client.close();



// //          });

// //      });
// //  });

// });
// ********with using then and promises*****************
MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));