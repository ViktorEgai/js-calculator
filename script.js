'use strict';
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
const start = function() {
  do {
    money = prompt('Ваш месячный доход');
  } while (
    !isNumber(money)
  );
}

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,    
  mission: 1500000, 
  period: 3,
  budget: 10000,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    let expenses, amount, addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

    if (addExpenses === null) {
      return appData.asking();
    } else {
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }   
    
      for(let i =0; i < 2; i++) {          
        expenses = prompt('Введите обязательную статью расходов?');   

        function askAmount() { 
          amount = prompt('Во сколько это обойдется?');
          if (!isNumber(amount)) {
            return askAmount();
          } else {
            return +amount;
          }
        }          
        
        appData.expenses['"'+ expenses +'"'] = askAmount();
      }
    
    
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },  
  getExpensesMonth: function() {
    let sum = 0;
    for (let key in appData.expenses ) {
    sum += appData.expenses[key];    
    }     
    return sum;
  },
  getBudget: function() {
    appData.budgetMonth = money - appData.getExpensesMonth();    
    appData.budgetDay = appData.budgetMonth / 30; 
  },
  getTargetMonth: function() {
    return appData.mission / appData.budgetMonth; 
  }
};
appData.asking();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expenses);

const targetMonth = Math.ceil(appData.getTargetMonth());
if (targetMonth === 1) {
  console.log('Цель будет достигнута за ' + targetMonth + ' месяц');
} else if (targetMonth >= 2 && targetMonth <= 4) {
  console.log('Цель будет достигнута за ' + targetMonth + ' месяца'); 
} else if (targetMonth >= 6) {
  console.log('Цель будет достигнута за ' + targetMonth + ' месяцев'); 
} else {
  console.log('Цель не будет достигнута');
} 

console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ', );
for (let key in appData) {
  console.log(key , appData[key] );
}