const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const isLogin = (req,res,next)=>{
    const {token} = req.cookies;
    if (token) {
        return res.redirect('/chat')
    }else{
        next()
    }
} 

router.get('/', isLogin, (req, res)=>{
    res.render('login',{
        layout : 'layouts/auth-layout'
    })
})

router.post('/login', async (req,res)=>{
    const data = await User.findOne({username:req.body.username})
    if(data != null){
        bcrypt.compare(req.body.password, data.password, function(err, result){
            if(result){
                token = jwt.sign({id:data._id, username:data.username, type:"user"},"jwt_key",{expiresIn:'2h'})
                res.cookie('token', token, {maxAge:2 * 60 * 60 * 1000, httpOnly: true})
                res.redirect('/chat')
            }else{
                res.send("Password salah")
            }
        })
    }else{
        res.send('username salah')
    }
})

router.get('/reg', isLogin, (req, res)=>{
    res.render('registration',{
        layout : 'layouts/auth-layout'
    })
})

router.post('/reg', (req,res)=>{
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        const data = new User({
            username : req.body.username,
            password : hash
        })
        data.save()
        res.redirect('/')
    })
})

router.get('/logout', (req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router