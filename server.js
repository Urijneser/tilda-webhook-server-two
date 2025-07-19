const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let leads = [];

// Обработчик вебхука от Tilda с проверкой домена
app.post('/tilda-webhook', (req, res) => {
  const referer = req.headers.referer || req.headers.origin; // Получаем домен источника
  const domain = referer ? new URL(referer).hostname : null; // Извлекаем имя домена

  // Проверяем, разрешён ли домен
  const allowedDomains = ['performia-seminar.ru']; // Замените на свои домены
  if (!allowedDomains.includes(domain)) {
    console.log('Доступ запрещён для домена:', domain);
    return res.status(403).send('Домен не разрешён');
  }

  // Обработка данных, если домен правильный
  const { Email, Name, Phone } = req.body;
  leads.push({ 
    name: Name, 
    phone: Phone, 
    email: Email,
    domain, // Сохраняем домен для аналитики
    date: new Date() 
  });
  
  console.log('Новая заявка с домена', domain, { name: Name, phone: Phone, email: Email });
  res.status(200).send('OK');
});

// Для просмотра всех заявок
app.get('/leads', (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
