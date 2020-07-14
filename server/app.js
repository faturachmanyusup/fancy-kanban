require('dotenv').config();

const express = require('express');
const router = require('./routes');
const errHandler = require('./middlewares/errHandler');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use('/', router);
app.use(errHandler);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));