'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');

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
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let allInput = document.querySelectorAll('input');


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
  checkInput: function() {   
    let allInput = document.querySelectorAll('input');
    allInput.forEach((item)=>{
      item.addEventListener('input', () => {
        if (item.getAttribute('placeholder') === 'Наименование') {
            item.value = item.value.replace(/[^а-я \s !?,. ]/,'');
        }
        if (item.getAttribute('placeholder') === 'Сумма') {
            item.value = item.value.replace(/[^0-9]/,'');
        }
      })  
    });
  },
  reset: function() {
    allInput = document.querySelectorAll('input');
    allInput.forEach(function(input) {
      input.removeAttribute('disabled');
      input.value = '';
      periodSelect.value = '1';
      periodAmount.textContent = '1';
    })
    start.style.display = 'block';
    cancel.style.display = 'none';     
  },
  start: function() {
    this.budget = salaryAmount.value;  
    this.getIncome();
    this.getExpenses();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();  
    this.showResult();
    allInput.forEach(function(input) {
      input.setAttribute('disabled','');
    })
    start.style.display = 'none';
    cancel.style.display = 'block';    
   }, 
  addIncomeBlock: function() {   
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    cloneIncomeItem.querySelectorAll('input').forEach((input)=> {
      input.value = '';      
    })

    incomeItems = document.querySelectorAll('.income-items');    
    if (incomeItems.length === 3) incomeAddButton.style.display = 'none';
    appData.checkInput();
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
    for (let key in this.income ) {
    sum += +this.income[key];    
    }     
    return sum;
  },  
  addExpensesBlock: function() {   
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    cloneExpensesItem.querySelectorAll('input').forEach((input)=> {
      input.value = '';
    })
    expensesItems = document.querySelectorAll('.expenses-items');    
    if (expensesItems.length === 3) expensesAddButton.style.display = 'none';
    appData.checkInput();
    
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
    for (let key in this.expenses ) {
    this.expensesMonth += +appData.expenses[key];    
    }     
    return this.expensesMonth;
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
    this.budgetMonth = +this.budget + this.getIncomeMonth() - this.getExpensesMonth();    
    this.budgetDay = this.budgetMonth / 30; 
  },
  getTargetMonth: function() {
    return targetAmount.value / this.budgetMonth; 
  }, 
  calcSavedMoney: function() {
    return this.budgetMonth * periodSelect.value;
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', ()=> {      
      incomePeriodValue.value = this.calcSavedMoney();
    })    
  }
};


start.disabled = true;   
salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value !== '') {
    start.disabled = false;
  } else {
    start.disabled = true;
  }
});

appData.checkInput();
start.addEventListener('click',  appData.start.bind(appData));
cancel.addEventListener('click', appData.reset);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
const periodAmount = document.querySelector('.period-amount');
periodSelect.addEventListener('input', ()=> {
  periodAmount.textContent = periodSelect.value;  
})

  
