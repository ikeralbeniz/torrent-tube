var db = require('../db')

// Create new comment in your database and return its id
exports.create = function(user, title, description, md5, cb) {
  var video = {
    user: user,
    title: title,
    description: description,
    md5: md5,
    hash: '',
    date: new Date().toString()
  }

  db.save(video, cb)
}

exports.updateHash = function(md5, hash, cb) {
  db.update({md5:md5}, {hash: hash}, function(err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
}

// Get a particular comment
exports.get = function(id, cb) {
  db.fetch({id:id}, function(err, docs) {
    if (err) return cb(err)
    cb(null, docs[0])
  })
}

exports.getbyMd5 = function(md5, cb) {
    db.fetch({md5:md5}, function(err, docs) {
      if (err) return cb(err)
      cb(null, docs[0])
    })
  }

// Get all comments
exports.all = function(cb) {
  db.fetch({}, cb)
}

// Get all comments by a particular user
exports.allByUser = function(user, cb) {
  db.fetch({user: user}, cb)
}