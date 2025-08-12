import express from 'express'

const app = express()

const users = []

app.post('/user',(req, res) => {

    console.log(req)
    res.send('Ok post')

})

app.get('/user', (req, res) => {
    res.send('ok,deu bom')
})

app.listen(2501)