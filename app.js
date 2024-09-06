const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const { createContact } = require('./controllers/contactController');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());  // Use cors
app.use(bodyParser.json());

// Routes

app.get('/',(req,res)=>{
  res.status(200).json({ message: 'Application is running successfully and port',PORT:process.env.PORT });
})

app.post('/api/contact-us', createContact);

app.use('/api', contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
