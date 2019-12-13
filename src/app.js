import express from 'express';

import userRouter from './routes/user';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', userRouter);

app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to Teamwork, a space that fosters collaboration.' }));

app.listen(PORT, () => {
  console.log('app running on port ', PORT);
});
module.exports = app;
// npm run dev-start

// app.get('/', (req, res) => {
//   res.json({ status: 'success', message: 'Welcome To Testing API' });
// });
//
// app.post('/add', (req, res) => {
//   const { num1, num2 } = req.body;
//   const add = (number1, number2) => number1 + number2;
//   res.json({
//     status: 'success',
//     message: 'Welcome To Testing API',
//     result: add(num1, num2),
//   });
// });
