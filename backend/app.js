const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', employeeRoutes);
app.use('/api', authRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));