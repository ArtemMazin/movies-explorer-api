const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
// const { SECRET_KEY = 'some-secret-key' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов с данного IP, повторите попытку позднее',
});

app.use(cors({
  credentials: true,
  origin: [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'http://localhost:3001',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
// express-rate-limit ограничивает количество запросов
app.use(limiter);
// helmet помогает защитить приложения Express, устанавливая заголовки ответа HTTP
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_CONN);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
