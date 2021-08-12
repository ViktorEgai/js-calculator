'use strict';

const start = document.getElementById('start');
const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('#deposit-check');
const additionIncomeInput = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const periodSelect = document.querySelector('.period-select');
const targetAmount = document.querySelector('.target-amount');
// console.log('targetAmount: ', targetAmount);
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,  
  percentDeposit: 0,
  moneyDeposit: 0, 
  period: 3,
  budget: 10000,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start: function() {
    appData.budget = salaryAmount.value;  
    appData.getIncome();
    appData.getExpenses();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();    
    appData.showResult();
  }, 
  addIncomeBlock: function() {   
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    incomeItems.value = '';
    incomeItems = document.querySelectorAll('.income-items');    
    if (incomeItems.length === 3) incomeAddButton.style.display = 'none';
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !=='') {
        appData.income[itemIncome] = cashIncome;
      };
    });
  },
  getIncomeMonth: function() {
    let sum = 0;
    for (let key in appData.income ) {
    sum += +appData.income[key];    
    }     
    return sum;
  },  
  addExpensesBlock: function() {   
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');    
    if (expensesItems.length === 3) expensesAddButton.style.display = 'none';

  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !=='') {
        appData.expenses[itemExpenses] = cashExpenses;
      };
    });
  },
  getExpensesMonth: function() {
    let sum = 0;
    for (let key in appData.expenses ) {
    sum += +appData.expenses[key];    
    }     
    return sum;
  },  
  getAddExpenses: function() {
    let addExpenses =  additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item != '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function( ) {
    additionIncomeInput.forEach(function(item) {
      let itemValue = item.value.trim();
        if (itemValue != '') {
          appData.addIncome.push(itemValue);
        }
    });
  },  
  getBudget: function() {
    appData.budgetMonth = +appData.budget + appData.getIncomeMonth() - appData.getExpensesMonth();    
    appData.budgetDay = appData.budgetMonth / 30; 
  },
  getTargetMonth: function() {
    return targetAmount.value / appData.budgetMonth; 
  }, 
  calcSavedMoney: function() {
    return appData.budgetMonth * periodSelect.value;
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', ()=> {      
      incomePeriodValue.value = appData.calcSavedMoney();
    })
  }
};

start.disabled = true;   
salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value !== '') start.disabled = false;  
});

start.addEventListener('click', appData.start);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
const periodAmount = document.querySelector('.period-amount');
periodSelect.addEventListener('input', ()=> {
  periodAmount.textContent = periodSelect.value;  
})
