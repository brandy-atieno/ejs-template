const express = require('express');
require('dotenv').config();
const app=express();
const fs=require('fs');
const port=process.env.PORT || 5000
const mongoose=require('mongoose');
const contactModel=require('./model/contactSchema')
const dbURI= 'mongodb+srv://<username>:<password>@cluster-name.26v6e6t.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then(()=>{
    app.listen(port,()=>{

        console.log(`Server running at :http://localhost:${port}`)
    });
    console.log('Db connected');
})
.catch((err)=>{
    console.log(err);
})

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('index',{name:'Brandy', title:'Lonely Bootstrap Template - Index'})
})
app.get('/inner',(req,res)=>{
    res.render('inner-page',{title:'Inner Page - Lonely Bootstrap Template'})
})
app.get('/portfolio-details',(req,res)=>{
    res.render('portfolio-details',{title:'Portfolio Details - Lonely Bootstrap Template'})
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.post('/contact',(req,res)=>{
    const data =req.body
    const message = new contactModel(data)
    message.save()
    .then((result)=>{
        console.log(result);
    })
.catch((err)=>{
    console.log(err);
})
     fs.writeFileSync('contact.txt',JSON.stringify(data))
   console.log(data);


})
