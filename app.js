const http = require('http')
const request = require('request')

http.createServer((req, res) => {
  request({
    url: 'https://blockchain.info/stats?format=json',
    json: true
  }, (error, response, body) => {
    console.log(body.market_price_usd)
  })
  console.log(req.url);
  res.end('End here')
}).listen(8080)
