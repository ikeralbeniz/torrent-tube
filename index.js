const Server = require('uwt')

const TorrentSeeder = require('./middlewares/torrentseeder')

const server = new Server({
  stats: true, // enable web-based statistics? [default=true]
})

var express = require('express')

server.app.engine('pug', require('pug').__express)
server.app.set('view engine', 'pug')

server.app.use(express.static(__dirname + '/public'))
server.app.use(function (req, res, next) {
  req.stats = server.getStats();
  next();
});
//server.app.use(require('./middlewares/users'))
server.app.use(require('./controllers'))

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, () => {
  if (server.ws) {
    const wsAddr = server.http.address()
    const wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
    const wsPort = wsAddr.port
    console.log('Tracker: ws://' + wsHost + ':' + wsPort)
  }
  if (server.http) {
    const statsAddr = server.http.address()
    const statsHost = statsAddr.address !== '::' ? statsAddr.address : 'localhost'
    const statsPort = statsAddr.port
    console.log('Tracker stats: http://' + statsHost + ':' + statsPort + '/stats')
  }
})


