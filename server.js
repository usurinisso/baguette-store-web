const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve only the static files form the dist directory

app.use(cors());
app.use(express.static(__dirname + '/dist/baguette-store-web'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/baguette-store-web/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
