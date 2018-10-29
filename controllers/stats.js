var express = require('express')
  , router = express.Router()


router.get('*', function (req, res) {
    const stats = req.stats
  
    if (req.baseUrl === '/stats.json' || req.headers['accept'] === 'application/json') {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(stats))
    } else if (req.baseUrl === '/stats') {
      res.end('<h1>' + stats.torrents + ' active torrent(s)</h1>\n' +
        '<h2>Connected Peers: ' + stats.peersAll + '</h2>\n' +
        '<h3>Peers Seeding Only: ' + stats.peersSeederOnly + '</h3>\n' +
        '<h3>Peers Leeching Only: ' + stats.peersLeecherOnly + '</h3>\n' +
        '<h3>Peers Seeding & Leeching: ' + stats.peersSeederAndLeecher + '</h3>\n' +
        '<h3>IPv4 Peers: ' + stats.peersIPv4 + '</h3>\n' +
        '<h3>IPv6 Peers: ' + stats.peersIPv6 + '</h3>\n' +
        '<h3>Clients:</h3>\n' +
        printClients(stats.clients)+
        '<small>Running <a href="https://www.npmjs.com/package/uwt">' + stats.server + '</a> v' + stats.serverVersion + '</small>'
      )
    }
})
  
function printClients (clients) {
    let html = '<ul>\n'
    for (const name in clients) {
      if (clients.hasOwnProperty(name)) {
        const client = clients[name]
        for (const version in client) {
          if (client.hasOwnProperty(version)) {
            html += '<li><strong>' + name + '</strong> ' + version + ' : ' + client[version] + '</li>\n'
          }
        }
      }
    }
    html += '</ul>\n'
    return html
}

module.exports = router