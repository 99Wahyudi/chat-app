const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const Chat = require('../models/chats')
const User = require('../models/users')

router.use(cookieParser());

let coba

const authMid = (req,res,next)=>{
    const {token} = req.cookies;
    if (!token) {
        return res.redirect('/')
    }
    try{
        const verify=jwt.verify(token, "jwt_key")
        req.user = verify
        next()
    }catch(err){
        console.log(JSON.stringify(err)) 
        return res.redirect('/')
    }
} 


router.get('/', authMid, async (req,res)=>{
    const chats = await Chat.find()
    const users = await User.find()
    coba=req.user.username
    res.render('chat',{
        layout : 'layouts/chat-layout',
        chats : chats,
        users : users
    })
})

socket.on("connection",socket=>{
    console.log(coba)
})

router.post('/', authMid, (req, res)=>{
    const d = new Date();
    let time = d.getTime();
    const data = new Chat({
        sender : req.user.username,
        message : req.body.message,
        dateSent : time
    })
    data.save()
    socket.emit('received', {message : req.body.message, sender : req.user.username, dateSent : time})
    res.redirect('/chat')
})


module.exports = router