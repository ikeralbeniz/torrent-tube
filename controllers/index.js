var express = require('express')
  , router = express.Router()
//  , Comment = require('../models/comment')


router.use('/videos', require('./videos'))
router.use('/stats*', require('./stats'))

router.get('/', function(req, res) {
  /*Comments.all(function(err, comments) {
    res.render('index', {comments: comments})
  })*/
})

module.exports = router