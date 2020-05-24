const assert =require("assert");
exports.insertDocument = (db,document,collection,callback)=>
{
    const coll = db.collection(collection);
    coll.insert(document);
    return coll.insert(document);



};
exports.findDocuments = (db,collection,callback)=>
{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
    

};
exports.removeDocument = (db,document,collection,callback)=>
{
    const coll = db.collection(collection);
    return  coll.deleteOne(document);
        //,(err,result)=>
    // {
    //     assert.equal(err,null);
    //     console.log("Removed the document ",document);

    //     callback(result);


    // });

};
exports.updateDocument = (db,document,update,collection,callback)=>
{
    const coll = db.collection(collection);
     return coll.updateOne(document,{$set:update},null)//,(err,result)=>
    // {
    //     assert.equal(err,null);
    //     console.log("Updatedthe doucment with ",update);
    //     callback(result);



    // });

};