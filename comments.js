// Create web server
// Use express
const express = require('express');
const app = express();
const port = 3000;

// Use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express_comments', {useNewUrlParser: true, useUnifiedTopology: true});

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Create route
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comments);
        }
    });
});

app.post('/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comment);
        }
    });
});

// Listen to port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});