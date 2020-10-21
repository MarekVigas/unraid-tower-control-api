const express = require('express')
const app = express()
const port = 4000
const { spawnSync } = require('child_process')
const fetch = require("node-fetch")

app.get('/api/boot', (req, res) => {
    const ls = spawnSync("./wake.sh")
    let respone = ls.stdout.toString()
    res.send(respone)
})

app.get('/api/getIp', (req, res) => {
    const ls = spawnSync("./tower-ip.sh")
    if (ls.stdout && ls.stdout.length > 4) {
        res.send(ls.stdout.toString())
    } else {
        res.send("Server offline.")
    }
})

app.get('/api/status', (req, res) => {
    fetch("http://192.168.88.249/")
        .then(result => {
            if (result.ok) {
                res.send({
                    status: "online"
                })
            }
        })
        .catch(err => {
            res.send({
                status: "offline"
            })
        })
})

app.get('/api/ping', (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Listening on port ${port}`))