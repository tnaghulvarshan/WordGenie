const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRequest=require('./routes/userRequestroutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
console.log("Loading Auth Routes...");
app.use('/api/auth', authRoutes);
app.use('/api/request', userRequest);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
