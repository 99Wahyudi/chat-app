const express = require('express') 
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 3000
const http = require('http').createServer(app)
const io = require('socket.io')
require('./utils/db.js')

app.set('view engine', 'ejs')
app.use(expressLayout)

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

socket = io(http);



const auth = require('./routes/auth')
const chat = require('./routes/chat')
app.use('/', auth)
app.use('/chat', chat)



app.get('/', (req, res) => res.send('Hello World!'))
http.listen(port, () => console.log(`Listening on http://localhost:${port}`))