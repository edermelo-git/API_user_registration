import express from 'express'

const app = express()
app.use(express.json())

const users = []

app.post('/user',(req, res) => {

    users.push(req.body)

    res.send('Ok,post')

})

app.get('/user', (req, res) => {
    res.json(users)
})

app.listen(2501)