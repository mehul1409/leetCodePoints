const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DetailModel = require('./Models/Detail.js');
const password = "DS3iFzdHyMhWdgcn";
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mehulbansalswm1234:DS3iFzdHyMhWdgcn@cluster0.hnuor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.post('/addDetail', async (req, res) => {
  try {
    const detailData = {
      easy: req.body.easy,
      medium: req.body.medium,
      hard: req.body.hard,
      questionNumbers: req.body.questionNumbers,
      totalPoints: req.body.totalPoints,
    };

    const detail = new DetailModel(detailData);
    const result = await detail.save(); 
    res.status(201).json({ message: 'Detail added successfully!', detail: result });
  } catch (error) {
    console.error('Error while adding detail:', error);
    res.status(500).json({ message: 'Error adding detail', error });
  }
});

app.get('/details', async (req, res) => {
    try {
      const details = await DetailModel.find();
      res.status(200).json(details);
    } catch (error) {
      console.error('Error while fetching details:', error);
      res.status(500).json({ message: 'Error fetching details', error });
    }
  });

app.listen(8000, () => {
  console.log('Server started on port 8000!');
});
