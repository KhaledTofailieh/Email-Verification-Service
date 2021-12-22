const express=require('express')
const body_parser=require('body-parser')
const session = require('express-session')
const mailer=require('nodemailer')


var transport=mailer.createTransport({
    service:'gmail',
    auth:{
        user:'kh1998to@gmail.com',
        pass:'only_we*_*'
    }
})

const app=express()

 app.use(session({
     secret: 'keyboard cat',
     resave: true,
     saveUninitialized: true,
     cookie: { 
     secure: false,
     signed: false,
     expires: null
     }
 }
 ))

 app.use(body_parser.json()); 
 app.use(body_parser.urlencoded({
     extended: true
 }))

 app.post('/sendMail', async (req,res)=>{
     try{
        var receiver = req.body.receiver
        var message_subject = req.body.subject
        var message_text = req.body.message
        console.log(receiver)
        console.log(message_subject)
        console.log(message_text)

        var mailOptions={
            from:'kh1998to@gmail.com',
            to : receiver,
            subject: message_subject,
            text: message_text
        }
    
        await transport.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`mail send successfully, infos ${info.response}`)
            }
        })
        res.send({
            'send': 'done'
        })
     }catch(e){
         console.log(e)
        res.status(404)
        res.send({
            'send': 'fail'
        })
     }
    
 })

var server = app.listen(9000, '127.0.0.1',  (req, res)=> {
    var host = server.address().address
    var port = server.address().port

    console.log(`Mailer Server://${host}:${port}/`); 
  })