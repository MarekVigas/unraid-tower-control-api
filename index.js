const express = require('express')
const basicAuth = require('express-basic-auth')
const app = express()
const port = 3000
const users = require('./users')
const { spawnSync } = require('child_process')

const staticAuth = basicAuth({
    users: users,
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
})

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

app.get('/auth', staticAuth, (req, res) => {
    res.sendStatus(200)
})

app.get('/boot', staticAuth, (req, res) => {
    const ls = spawnSync('ssh', ["root@vpn.marek-vigas.sk", "./python.py"])
    // res.send(ls.stdout.toString())
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Listening on port ${port}`))