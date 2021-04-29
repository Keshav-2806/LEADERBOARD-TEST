const Express = require("express");
const app = Express();
app.use(Express.json());
const path=require('path');
const db=require('./dbConnection');
app.post('/users', async (req,res)=>{
    if(!req.body.username||!req.body.userEmail||!req.body.userOrganization){
        res.status(400).send("Please Enter valid input ")
        return;
    }
    const user={
        username:req.body.username,
        userEmail:req.body.userEmail,
        userOrganization:req.body.userOrganization
    };
    try{
        const users= await db.insertUser(user);
       
        res.send(users);
    }catch(error){
        res.send(error);
    }
});

app.get('/users/:username',async(req,res)=>{
    const user=req.params.username;
    try{
        const Users=await db.getUserByUsername(user);
        res.send(Users);
    }catch(error){
        res.send(error); 
    }
});
 

db.connect((err)=>{
    if(err){
        console.log("unable to connect to database");
        process.exit(1);
    }else{
        app.listen(3002,()=>{
            console.log("connected to database");
        });
    }
});