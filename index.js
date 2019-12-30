const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/post' , (req,res)=>{
    if(req.body.captcha === undefined || req.body.captcha === ''  || req.body.captcha === null)
    {
        return res.json({'success' : false , 'msg':'please select captcha'})
    }
    const sk = "6LdTBssUAAAAAL7Sm2kxR6Zr988sy4yE7FcN_43w";
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${sk}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
    request(verifyUrl , (err,response,body)=>{
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success){
            return res.json({'success':false, 'msg':'failed captcha'})
        }
        
        return res.json({'success':true, 'msg':' captcha successful'})
    })
})

app.listen(3000 , ()=>{
    console.log('app started at port 3000')
})