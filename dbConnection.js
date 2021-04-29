 const MongoClient=require("mongodb").MongoClient;
const dbName="organizationDetails";
const url="mongodb://localhost:27017";
const collection="UserDetails";
const state={
    db:null
};
     const connect= (cb)=>{
    if(state.db){
        cb();
    }else{
        MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{
            if(err){
                cb(err);
            }else{
                state.db=client.db(dbName);
                cb();
            }
        });
    }
}
const getDB=()=>{
    return state.db;
}
 async function insertUser(user){
    const findUser= await getDB().collection(collection).find({username:user.username,userEmail:user.userEmail}).toArray();
    if(findUser.length!=0){
       
    return "User already exist"
    }else{
    const result =await getDB().collection(collection).insertOne(user);
    console.log(result);
    return result;
        
    }
}
async function getUserByUsername(user){
    const userDetailss=await getDB().collection(collection).find({username:user}).toArray();
    console.log(userDetailss);
    return userDetailss;
}
module.exports={getDB,connect,insertUser,getUserByUsername}