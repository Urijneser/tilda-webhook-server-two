const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let leads = [];

app.post('/tilda-webhook', (req, res) => {
  console.log('Исходные данные:', req.body);
  
  // Получаем домен источника из заголовков
  const referer = req.headers.referer || req.headers.origin;
  let domain = '';
  
  try {
    domain = referer ? new URL(referer).hostname : 'неизвестный домен';
  } catch (e) {
    domain = 'некорректный referer';
  }

  const { formid, tranid, ...formData } = req.body;
  
  if (Object.keys(formData).length === 0) {
    console.error('Пустой запрос', req.body);
    return res.status(400).json({ error: 'Нет данных формы' });
  }

  // Сохраняем данные + домен источника
  leads.push({ 
    ...formData, 
    domain,  // Добавляем домен в данные
    date: new Date(),
    headers: {  // Дополнительно сохраняем заголовки для отладки
      referer: req.headers.referer,
      origin: req.headers.origin,
      ip: req.ip
    }
  });
  
  console.log('Новый лид:', { domain, ...formData });
  res.status(200).send('OK');
});

app.get('/leads', (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
