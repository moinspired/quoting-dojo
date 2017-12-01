var express = require('express');
var app = express();
const port = 8000
var mongoose = require('mongoose');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));

var path = require('path');

app.use(express.static(path.join(__dirname, '/static')))



mongoose.connect('mongodb://localhost/quotedb');

var QuoteSchema = new mongoose.Schema({
    name: {type: String},
    quote: {type: String}
   }, {timestamps: true})

   mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
   var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'

mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', function(req, res) {
    res.render('index')
})
app.post('/quotes', function(req, res){
    console.log(req.body)
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a quote!');
        res.redirect('/show');
      }
    })

})
app.get('/show', function(req, res) {
    Quote.find({}, function(err, quotes) {
        console.log(quotes)
        res.render('quotes', {quotes: quotes})
        
    })
  })


app.listen(port,() => console.log(`listening on port ${port}...`));

