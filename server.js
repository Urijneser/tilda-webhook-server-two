const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Важно для Tilda!

let leads = [];

// Обработчик для Tilda
app.post('/tilda-webhook', (req, res) => {
  // Данные от Tilda приходят в поле "form" или напрямую в теле
  const formData = req.body.form || req.body;
  const { name, phone, email } = formData;

  if (!name && !phone && !email) {
    console.log('Получены неверные данные:', req.body);
    return res.status(400).send('Не хватает полей (name, phone, email)');
  }

  leads.push({ name, phone, email, date: new Date() });
  console.log('Новая заявка:', { name, phone, email });
  res.status(200).send('OK');
});

app.get('/leads', (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
