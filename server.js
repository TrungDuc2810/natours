const dotenv = require('dotenv');
const mongoose = require('mongoose');
// // eslint-disable-next-line import/no-extraneous-dependencies
// const WebSocket = require('ws');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Fix websocket error
// const wss = new WebSocket.Server({ server });
// wss.on('connection', (ws) => {
//   const id = setInterval(() => {
//     ws.send(JSON.stringify(process.memoryUsage()), () => {});
//   }, 100);
//   console.log('started client interval');

//   ws.on('close', () => {
//     console.log('stopping client interval');
//     clearInterval(id);
//   });
// });

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
