const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
const employeeRoutes = require('./routes/employeeRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', employeeRoutes);
app.use('/api', companyRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));