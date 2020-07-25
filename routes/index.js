const router = require('express').Router();
var multer  = require('multer')
require('dotenv').config()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".pdf");
  }
})
var upload = multer({ storage: storage });



const eventManager = require('./event-manager')

var authCheck = (req, res, next) => {
  if(!req.session["loggedIn"]){
        res.redirect('/events/login');
    } else {
        next();
    }
};

router.get('/logout', function(req,res,next) {
  req.session["loggedIn"] = false;
  res.redirect('/events/login');
});

router.get('/events/create', authCheck, function(req,res,next) {
  eventManager.checkExpired();
  res.render('events-editor', {event: false});
})

router.post('/login', function(req, res, next) {
  if(req.body.email === process.env.USER && req.body.password === process.env.PASS) {
    req.session["loggedIn"] = true;
    res.redirect('/events/dashboard');
  } else {
    res.redirect('/events/login');
  }
});

router.post('/event/create', function(req, res, next) {
  eventManager.createEvent(req,res);
  eventManager.checkExpired();
  res.redirect('/events/dashboard');
});

router.post('/event/delete/:eventID', function(req, res, next) {
  eventManager.deleteEvent(req,res);
  res.redirect('/events/dashboard');
});

router.post('/event/edit/:eventID', function(req, res, next) {
  eventManager.editEvent(req,res);
  eventManager.checkExpired();
  res.redirect('/events/dashboard');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hill Valley Club' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.get('/events', function(req, res, next) {
  eventManager.checkExpired();
  eventManager.renderEventPage(req,res)
});

router.get('/edit/event/:eventID', authCheck,function(req,res,next) {
  eventManager.renderEventEditor(req,res)
});

router.get('/events/login', function(req, res, next) {
  if(!req.session["loggedIn"]){
    res.render('login', { title: 'Login' });
  } else {
    res.redirect('/events/dashboard');
  }
  
});

router.get('/events/dashboard', authCheck, function (req, res, next) {
  eventManager.checkExpired();
  eventManager.renderEventDashboard(req,res);
});

module.exports = router;
