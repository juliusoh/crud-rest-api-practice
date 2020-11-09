const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const members = require ('./members')

const logger = require('./middleware/logger')

const app = express();

//handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepage Route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}))
// init middleware
app.use(logger);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))

const PORT = 3000;

app.listen(PORT, () => console.log(`Server starting on ${PORT}`));