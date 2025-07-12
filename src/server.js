const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

const { PORT } = require('./configs/env');

const conn = require('./database/conn');

const authenticateRoutes = require('./routes/authenticate');
const objectRoutes = require('./routes/object');
const initialData = require('./routes/initialData');

app.use(cors());
app.use('/api', authenticateRoutes);
app.use('/api', objectRoutes);
app.use('/api', initialData);

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
