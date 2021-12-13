const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve only the static files form the dist directory

const allowedOrigins = [
  'http://localhost:3000',
  'https://baguette-store-web.herokuapp.com',
  'https://baguette-store.herokuapp.com'
]; // list of allow domain

app.use(
  cors(
    app.use(
      cors({
        credentials: true,
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
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
