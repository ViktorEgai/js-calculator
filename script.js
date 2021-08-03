'use strict';

let money = +prompt('Ваш месячный доход'),
  income = 'Пассивный доход',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1500000,  
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'), 
  amount2 = +prompt('Во сколько это обойдется?');  
  
const accumulatedMonth = getAccumulateMonth();
let  budgetDay =  accumulatedMonth / 30;  


function getStatusIncome() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600 && budgetDay > 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
}

function getExpensesMonth() {
  return amount1 + amount2;
}

function getAccumulateMonth(a, b) {
  return money - getExpensesMonth();
  // return accumulatedMonth;
}

function getTargetMonth() {
  return mission / accumulatedMonth; 
}

getTargetMonth();
getExpensesMonth();
getStatusIncome();



console.log('Тип данных переменной money: ', typeof money);
console.log('Тип данных переменной income: ', typeof income);
console.log('Тип данных переменной deposit: ', typeof deposit);
console.log('Сумма обязательных расходов в месяц: ', getExpensesMonth());
console.log('Возможные расходы: ', addExpenses);
console.log('period: ', Math.ceil(getTargetMonth()));
console.log('budgetDay: ', Math.floor(budgetDay));
console.log(getStatusIncome());
