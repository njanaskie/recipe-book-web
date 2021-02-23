const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config({ path: '.env.development' });
const router = require('./routes/router')
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./middleware/authenticateToken');
const publicPath = path.join(__dirname, '..', '..', 'public');
const port = process.env.PORT || 3000;
const axios = require('axios')
const cheerio = require('cheerio')

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
       console.log('Connected to database');
     })
     .catch((err) => {
       console.log('Error connecting to DB', err.message);
     });

// app.use(express.static(publicPath));
app.use(cors());
app.use(express.json());
app.use(decodeIDToken);

// const getURLData = async (url) => {
//   axios.get(url)
//   .then(response => {
//     if(response.status === 200)
//       {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         console.log($('title').text());
//       }
//     }, (error) => console.log('err') );
// }

// const urlData = getURLData('https://vm.tiktok.com/ZMJ7SwWWb/')

// console.log(urlData)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// });

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});