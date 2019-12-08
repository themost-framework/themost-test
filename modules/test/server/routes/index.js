import express from 'express';
let indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Test Api Server' });
});

export {indexRouter};
