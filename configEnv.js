const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { SECRET_KEY = 'some-secret-key' } = process.env;

module.exports = { PORT, DB_CONN, SECRET_KEY };
