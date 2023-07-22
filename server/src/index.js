const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.use('/auth', authRoutes);

const port = process.env.PORT || 4000;
const MONGO = process.env.MONGODB_URI;

console.log(MONGO);

mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(app.listen(port, () => console.log(`Server is running on port ${port}`)))
.catch((error) => console.log(error.message));

