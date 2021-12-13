const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve only the static files form the dist directory

const allowedOrigins = [
  'http://localhost:3000',
  'https://baguette-store-web.herokuapp.com',
  'https://baguette-store.herokuapp.com',
  'http://localhost:4200'
]; // list of allow domain

app.use(
  cors(
    app.use(
      cors({
        origin: (origin, callback) => {
          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`Origin: ${origin} is now allowed`));
          }
        }
      })
    )
  )
);
app.use(express.static(__dirname + '/dist/baguette-store-web'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/baguette-store-web/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
