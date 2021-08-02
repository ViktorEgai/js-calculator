'use strict';

let money = prompt('Ваш месячный доход'),
  income = 'пассивный доход',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1500000,  
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'), 
  amount2 = prompt('Во сколько это обойдется?'),
  budgetMonth = +money - (+amount1 + +amount2),
  period = mission / budgetMonth,
  budgetDay =  budgetMonth / 30;  

  console.log('Тип данных переменной money: ' + typeof money);
  console.log('Тип данных переменной income: ' + typeof income);
  console.log('Тип данных переменной deposit: ' + typeof deposit);
  console.log('Длина строки addExpenses: ' + addExpenses.length);
  console.log('Период равен '+ period +' месяцев');
  console.log('Цель заработать ' + mission + ' рублей');
  console.log(addExpenses.toLowerCase().split(', '));
  console.log('Дневной бюджет составляет ' + budgetDay + ' руб.');
  console.log('budgetMonth: ', budgetMonth);
  console.log('period: ', Math.ceil(period));
  console.log('budgetDay: ', Math.floor(budgetDay));
  
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что то пошло не так');
  }

 
