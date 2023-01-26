const express = require('express')
const app = express()
const wiki = require('./wiki')
const port = 3000

const myLogger = (req, res, next) => {
    console.log(`req IP: ${req.ip}`)
    console.log(`req method: ${req.method}`)
    console.log(`req date: ${new Date()}`)

    next()
}

app.use(myLogger)

app.get("/", (req, res) => {
    res.send("Hello World! built w/ express")
})

app.listen(port, () => {
    console.log(`express example app listening on port ${port}`)
})

app.use("/wiki", wiki)