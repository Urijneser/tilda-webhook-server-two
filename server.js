const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let leads = []; // Храним заявки в памяти

// Принимаем данные от Tilda
app.post('/tilda-webhook', (req, res) => {
  const { name, phone, email } = req.body;
  leads.push({ name, phone, email, date: new Date() });
  console.log('Новая заявка:', { name, phone, email });
  res.status(200).send('Данные получены!');
});

// Просмотр всех заявок (для проверки)
app.get('/leads', (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
