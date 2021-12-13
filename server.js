const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve only the static files form the dist directory

const whitelist = new RegExp(
  '^((https?:\\/\\/)?.*?([\\w\\d-]*\\.[\\w\\d]+))($|\\/.*$)'
);
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (!whitelist.test(origin)) {
      var msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/dist/baguette-store-web'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/baguette-store-web/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
