const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/apis/users');
const posts = require('./routes/apis/posts');
const profile = require('./routes/apis/profile');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys.js').mongoURI;

//connect to MongoDB
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(err);
    });

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//App routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));;