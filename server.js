app.post('/tilda-webhook', (req, res) => {
  console.log('Исходные данные:', req.body); // Для отладки
  
  const { formid, tranid, ...formData } = req.body;
  
  if (Object.keys(formData).length === 0) {
    console.error('Пустой запрос', req.body);
    return res.status(400).json({ error: 'Нет данных формы' });
  }

  leads.push({ ...formData, date: new Date() });
  console.log('Сохранённые данные:', formData);
  res.status(200).send('OK');
});
