let money = 25000,
  income = 'пассивный доход',
  addExpenses = 'Коммунальные услуги, бензин, домашний интернет, курсы',
  deposit = true,
  mission = 150000,
  period = 6, 
  budgetDay = money / 30;

  console.log('Тип данных переменной money: ' + typeof money);
  console.log('Тип данных переменной income: ' + typeof income);
  console.log('Тип данных переменной deposit: ' + typeof deposit);
  console.log('Длина строки addExpenses: ' + addExpenses.length);
  console.log('Период равен '+ period +' месяцев');
  console.log('Цель заработать ' + mission + ' рублей');
  console.log(addExpenses.toLowerCase().split(', '));
  console.log('Дневной бюджет составляет ' + budgetDay + ' руб.');
