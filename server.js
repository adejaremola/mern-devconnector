const express = require('express');

const mongoose = require('mongoose');

const users = require('./routes/apis/users');
const posts = require('./routes/apis/posts');
const profile = require('./routes/apis/profile');

//DB Config

const db = require('./config/keys.js').mongoURI;

//connect to MongoDB
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(err);
    });

const app = express();

app.get('/', (req, res) => res.send("Hello World"));

//App routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));;