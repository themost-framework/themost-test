import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Test Api Server' });
});

module.exports = router;
