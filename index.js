const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const router = require('./routes/router.js');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());


app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
