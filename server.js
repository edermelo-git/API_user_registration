import express from 'express'

const app = express()

app.get('/user', (req, res) => {
    res.send('ok,deu bom')    
})

app.listen(2501)