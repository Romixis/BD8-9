const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Post = require('./models/post');

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const db = 'mongodb+srv://Roman:585652545243zZ@cluster0.dz7ho.mongodb.net/NodeJS';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Пост';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('post'), { post, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.delete('/posts/:id', (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get('/edit/:id', (req, res) => {
  const title = 'Редактировать';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.put('/edit/:id', (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

// app.get('/posts', (req, res) => {
//     const title = 'Posts';
//     Post
//         .find()
//         .sort({ createdAt: -1 })
//         .then(posts => res.render(createPath('posts'), { posts, title }))
//         .catch((error) => {
//             console.log(error);
//             res.render(createPath('error'), { title: 'Error' });
//         });
// });


app.get('/posts', (req, res) => {
  const title = 'Статьи';
  const search_tag = req.query.find
  const tag_author = req.query.author
  const startdate = req.query.start
  const enddate = req.query.end

  if (search_tag == null && tag_author == null && startdate == null && enddate == null) {
    Post
    .find()
    .sort({ createdAt: -1 })
    .then(posts => res.render(createPath('posts'), { posts, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
  }
  else if (tag_author == null && startdate == null && enddate == null) {
    Post
      .find({ $or: [{title : {$regex: search_tag, $options:"i" }},{ tag : {$regex: search_tag, $options:"i" }}]})
      .sort({ createdAt: -1 })
      .then(posts => res.render(createPath('posts'), { posts, title }))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'), { title: 'Error' });
      });
  }
  else if (search_tag == null && startdate == null && enddate == null) {
    Post
      .find({ author : {$regex: tag_author, $options:"i" }})
      .sort({ createdAt: -1 })
      .then(posts => res.render(createPath('posts'), { posts, title }))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'), { title: 'Error' });
      });
  }
  else if (tag_author == null && search_tag == null) {
    console.log(startdate)
    Post
    .find({ createdAt: { $gte: new Date(startdate), $lte: new Date(enddate)}})
    .then(posts => res.render(createPath('posts'), { posts, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
  }
});


app.get('/add-post', (req, res) => {
  const title = 'Добавить статью';
  res.render(createPath('add-post'), { title });
});

app.post('/add-post', (req, res) => {
  const { title, author, text, review, tag } = req.body;
  const post = new Post({ title, author, text, review, tag });
  console.log(tag)
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.post('/posts/:id', (req, res) => {
  const { name, mark, reviewMessage } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(id, { $push: { review: { name, mark, reviewMessage } } })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});