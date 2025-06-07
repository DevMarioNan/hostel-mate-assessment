const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes/index');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});