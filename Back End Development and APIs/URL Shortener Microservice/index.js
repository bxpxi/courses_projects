require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const app = express();

let urlDatabase = []; // used for storing the URLs
let idCounter = 1; // counter to generate unique short URLs

// Basic Configuration
const port = process.env.PORT || 3000; 

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST endpoint to shorten a URL
app.post('/api/shorturl', function(req, res) {
  const originalUrl = req.body.url;

  // validate URL
  const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
  if (!urlPattern.test(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  const shortUrl = idCounter++;
  urlDatabase.push({ original_url: originalUrl, short_url: shortUrl }); 
  return res.json({ original_url: originalUrl, short_url: shortUrl });
});

// GET endpoint to redirect from short URL
app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = parseInt(req.params.short_url);

  const urlEntry = urlDatabase.find(entry => entry.short_url === shortUrl);

  if (urlEntry) {
    return res.redirect(urlEntry.original_url);
  } else {
    return res.json({ error: 'No short URL found for the given input' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`); 
});
