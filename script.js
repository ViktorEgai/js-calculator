'use strict';
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
const start = function() {
  do {
    money = prompt('Ваш месячный доход', 60000);
  } while (
    !isNumber(money)
  );
}

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: '',
  deposit: false,  
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1500000, 
  period: 3,
  budget: 10000,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    if(confirm('Есть ли у вас дополнительный заработок?')) {
      function askAdditionIncome() { 
        let itemIncome = prompt('Какой у вас дополнительный зарабаток?');
        if (isNumber(itemIncome) || itemIncome === null) {
          return askAdditionIncome();
        } else {
          for (let i = 0; i < 3; i++) {
            if ( isNumber(itemIncome[i]) || expenses[i] === ' ') {
              return askAdditionIncome();
            } 
          } 
          return itemIncome;
        }
      }  
      
      function askAdditionCash() { 
        let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
        if (!isNumber(cashIncome)) {
          return askAdditionCash();
        } else {
          return cashIncome;
        }
      }        
      appData.income[askAdditionIncome()] =  askAdditionCash();
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую без пробела');
     if (addExpenses === null) {
      return appData.asking();
    } else {
      appData.addExpenses = addExpenses.split(','); 
      for (let i = 0; i < appData.addExpenses.length; i++) {
        appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].slice(1);        
      }
    }   

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let expenses, amount;
    for(let i = 0; i < 2; i++) {          
      // ДОБАВИТЬ ПРОВЕРКУ НА СТРОКУ!!! СКОПИРОВАТЬ ФУНКЦИЮ
       function askExpenses() { 
        expenses = prompt('Введите обязательную статью расходов?');   
        if (isNumber(expenses) || expenses === null) {
          return askExpenses();
        } else {
          for (let i = 0; i < 3; i++) {
            if ( isNumber(expenses[i]) || expenses[i] === ' ') {
              return askExpenses();
            } 
          } 
          return expenses;
        }
      }  
      
      function askAmount() { 
        amount = prompt('Во сколько это обойдется?');
        if (!isNumber(amount)) {
          return askAmount();
        } else {
          return +amount;
        }
      }             
      appData.expenses['"'+ askExpenses() +'"'] = askAmount();
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
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
      function askPercent() { 
        appData.percentDeposit = prompt('Какой у вас годовой процент по депозиту');
        if (!isNumber(appData.percentDeposit)) {
          return askPercent();
        } else {
          return +appData.percentDeposit;
        }
      }  
      function askDepositAmount() { 
        appData.moneyDeposit = prompt('Какая сумма у вас в депозите?');
        if (!isNumber(appData.moneyDeposit)) {
          return askDepositAmount();
        } else {
          return +appData.moneyDeposit;
        }
      }  
      askPercent();
      askDepositAmount();
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
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


console.log(appData.addExpenses.join(', '));




