var express = require('express')
  , router = express.Router()
  , Video = require('../models/video')
//  , auth = require('../middlewares/auth')

router.post('/list', function(req, res) {
    Video.all(function (err, videos) {
        //res.render('videos/list', {videos: videos})
        res.end("HOLA")
    })
})

//router.get('/me', auth, function(req, res) {
router.get('/me', function(req, res) {
    Video.allByUser(user = req.user.id, function (err, videos) {
       res.render('videos/list', {videos: videos})
    })
})

router.get('/:id', function(req, res) {
    Video.get(req.params.id, function (err, video) {
        res.render('videos/item', {video: video})
    })
})

module.exports = router