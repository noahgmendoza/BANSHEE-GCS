const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const rgsRoutes = require('./routes/rgsRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DATABASE_URI;

app.use(express.json());
app.use(cors({
  origin: 'http://rgs.bansheeuav.tech/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

mongoose.connect(uri)
  .then(() => console.log("Mongodb connected successfully"))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/rgs', rgsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
