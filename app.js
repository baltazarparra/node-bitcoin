const express = require('express')
const app = express()
const request = require('request')
const bodyParser = require('body-parser')
const bitcore = require('bitcore-lib')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
})

app.post('/wallet', function (req, res) {
    const brainsrc = req.body.brainsrc;
    const input = new Buffer(brainsrc);
    const hash = bitcore.crypto.Hash.sha256(input);
    const bn = bitcore.crypto.BN.fromBuffer(hash);
    const pk = new bitcore.PrivateKey(bn).toWIF();
    const addy = new bitcore.PrivateKey(bn).toAddress();
    res.send(`Wallet of: <strong>${brainsrc}</strong>,<br>
              Address: <strong>${addy}</strong>,<br>
              Key: <strong>${pk}</strong>`);
})

app.listen(8080, () => {
  console.log('Running...')
})
