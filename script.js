'use strict';
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      incomeAddButton = document.getElementsByTagName('button')[0],
      expensesAddButton = document.getElementsByTagName('button')[1],
      depositCheckbox = document.querySelector('#deposit-check'),
      additionIncomeInput = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      targetAmount = document.querySelector('.target-amount');
      
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    allInput = document.querySelectorAll('input');

class AppData {
  constructor() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;  
    this.percentDeposit = 0;
    this.moneyDeposit = 0; 
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0; 
  }

  checkInput() {   
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
  }
  
  start() {
    this.budget = salaryAmount.value;  
    this.getIncome();
    this.getExpenses();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();  
    this.showResult();
    allInput.forEach((input) => {
      input.setAttribute('disabled','');
      if (input === periodSelect) input.removeAttribute('disabled');
    })
    start.style.display = 'none';
    cancel.style.display = 'block';    
  }

  addIncomeBlock() {   
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    cloneIncomeItem.querySelectorAll('input').forEach((input)=> {
      input.value = '';      
    })

    incomeItems = document.querySelectorAll('.income-items');    
    if (incomeItems.length === 3) incomeAddButton.style.display = 'none';
    this.checkInput();    
  }

  getIncome () {
    incomeItems.forEach((item) => { 
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;           
      if (itemIncome !== '' && cashIncome !=='') {
        this.income[itemIncome] = cashIncome;
      };
    });
  }

  getIncomeMonth() {
    let sum = 0;
    for (let key in this.income ) {
    sum += +this.income[key];    
    }     
    return sum;
  }

  addExpensesBlock() {   
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    cloneExpensesItem.querySelectorAll('input').forEach((input)=> {
      input.value = '';
    })
    expensesItems = document.querySelectorAll('.expenses-items');    
    if (expensesItems.length === 3) expensesAddButton.style.display = 'none';
    this.checkInput();
    
  }

  getExpenses() {
    expensesItems.forEach((item)=> {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !=='') {
        this.expenses[itemExpenses] = cashExpenses;
      };
    });
  }

  getExpensesMonth() {    
    for (let key in this.expenses ) {
    this.expensesMonth += +this.expenses[key];    
    }     
    return this.expensesMonth;
  }

  getAddExpenses() {
    let addExpenses =  additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {      
      item = item.trim();
      if (item != '') {
        this.addExpenses.push(item);        
      }
    });
    
  }

  getAddIncome() {    
    additionIncomeInput.forEach((item) => {      
      let itemValue = item.value.trim();
        if (itemValue != '') {
          this.addIncome.push(itemValue);         
        }
    });
  }

  getBudget() {   
    this.budgetMonth = +this.budget + this.getIncomeMonth() - this.getExpensesMonth();    
    this.budgetDay = this.budgetMonth / 30; 
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth; 
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  showResult() {
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

  reset() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;  
    this.percentDeposit = 0;
    this.moneyDeposit = 0; 
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0; 
    allInput = document.querySelectorAll('input');
    allInput.forEach((input) => {
      input.removeAttribute('disabled');
      input.value = '';
      periodSelect.value = '1';
      periodAmount.textContent = '1';
    })
    incomeItems.forEach((item, index) => {
      if (index !== 0) item.remove();
    });
    expensesItems.forEach((item, index) => {
      if (index !== 0) item.remove();
    });
    start.style.display = 'block';
    cancel.style.display = 'none';    
    start.disabled = true;   
    incomeAddButton.style.display = 'block';
    expensesAddButton.style.display = 'block';
  }

  eventListeners() {
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
    cancel.addEventListener('click', appData.reset.bind(appData));
    incomeAddButton.addEventListener('click', appData.addIncomeBlock.bind(appData));
    expensesAddButton.addEventListener('click', appData.addExpensesBlock.bind(appData));
    periodSelect.addEventListener('input', ()=> {
      periodAmount.textContent = periodSelect.value;  
    })
  }
};



const appData = new AppData();
appData.eventListeners();


