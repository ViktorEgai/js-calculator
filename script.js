'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'Пассивный доход',    
    
    mission = 1500000;

let start = function() {
  do {
    money = prompt('Ваш месячный доход');
  } while (
    !isNumber(money)
  );
}

start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?');
    
console.log('Тип данных переменной money: ', typeof money);
console.log('Тип данных переменной income: ', typeof income);
console.log('Тип данных переменной deposit: ', typeof deposit);

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

let expenses1, expenses2, amount;

function getExpensesMonth() {
  let sum = 0;

  for(let i =0; i < 2; i++) {

    if (i === 0) {
      expenses1 = prompt('Введите обязательную статью расходов?');
    } else if (i === 1) {
      expenses2 = prompt('Введите обязательную статью расходов?');
    }

    do {
      amount = prompt('Во сколько это обойдется?');      
    } while (
      !isNumber(amount)
    );
    sum += +amount;    
  } 
  return sum;  
}

let expensesAmount = getExpensesMonth();

function getAccumulateMonth() {
  return money - expensesAmount; 
}

function getTargetMonth() {
  return mission / accumulatedMonth; 
}

const accumulatedMonth = getAccumulateMonth();
let  budgetDay =  accumulatedMonth / 30;  
console.log('budgetDay: ', Math.floor(budgetDay));

getTargetMonth();
getStatusIncome();

if (Math.ceil(getTargetMonth()) > 0) {
  console.log('Цель будет достигнута'); 
} else if (Math.ceil(getTargetMonth()) < 0) {
  console.log('Цель не будет достигнута');
} 

console.log('Возможные расходы: ', addExpenses);
console.log('Сумма обязательных расходов в месяц: ', expensesAmount);
console.log(getStatusIncome());