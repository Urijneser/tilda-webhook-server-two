const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let leads = []; 

app.post('/tilda-webhook', (req, res) => {
  console.log('Исходные данные:', req.body); 
  
  const { formid, tranid, ...formData } = req.body; 
  
  if (Object.keys(formData).length === 0) {
    console.error('Пустой запрос', req.body);
    return res.status(400).json({ error: 'Нет данных формы' });
  }

  leads.push({ ...formData, date: new Date() }); // Сохраняем всё
  console.log('Сохранённые данные:', formData);
  res.status(200).send('OK');
});

// Для просмотра всех заявок
app.get('/leads', (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
