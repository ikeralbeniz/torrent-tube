var WebTorrentSeeder = require('webtorrent-hybrid')
var chokidar = require('chokidar');

var client = new WebTorrentSeeder()

chokidar.watch('media', {ignored: /(^|[\/\\])\../}).on('add', (path) => 
{
  client.seed(path, { announce: [ 'ws://localhost:8080' ]},
  function (torrent) {
    console.log('Client is seeding "'+path +'" with hash: ' + torrent.infoHash);
  })

});


module.exports = chokidar