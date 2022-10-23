const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://Dvora1:Dd123456@nodetuts.93cmp.mongodb.net/node-tuts?retryWrites=true&w=majority';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  }))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');
//app.use(express.static(path.resolve(__dirname, 'public')));
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/patients');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// patient routes
app.use('/patients', patientRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
