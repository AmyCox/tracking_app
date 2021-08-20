require ('./models/User');


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();


const mongoUri = "mongodb+srv://admin:passwordpassword@cluster0.hyysy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
})

app.use(express.json());
app.use(authRoutes)

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to db', err)
})

// when someone tries to access a route they must go through the required middleware - in this case requireAuth

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is: ${req.user.email}`)
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})