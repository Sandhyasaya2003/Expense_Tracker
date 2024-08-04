//script.js

document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");
  const filterCategory = document.getElementById("filter-category");
  const dashboardExpenseAmount = document.getElementById("Expense")
  const BalanceDashboard = document.getElementById("Balance")
//   const expenseAmount = document.getElementById("Expense").textContent
//   console.log("expenseAmount",expenseAmount)
//   const incomeAmount = document.getElementById("Income").textContent
//   console.log("incomeAmount",incomeAmount)
 // BalanceDashboard.textContent = incomeAmount- expenseAmount
  let expenses = [];
  getIncomeFromLocalStorage();
  expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("expense-category").value;
      const date = document.getElementById("expense-date").value;
      const name = document.getElementById("expense-name").value;
      const amount = parseFloat(document.getElementById("expense-amount").value);
      
      

      const expense = {
          id: Date.now(),
          category,
          date,
          name,
          amount
      };

      expenses.push(expense);
      displayExpenses(expenses);
      updateTotalAmount();
      balanceAmountDashBoard()
      expenseForm.reset();
  });

  expenseList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
          const id = parseInt(e.target.dataset.id);
          expenses = expenses.filter(expense => expense.id !== id);
          displayExpenses(expenses);
          updateTotalAmount();
      }

      if (e.target.classList.contains("edit-btn")) {
          const id = parseInt(e.target.dataset.id);
          const expense = expenses.find(expense => expense.id === id);
          document.getElementById("expense-category").value = expense.category;
          document.getElementById("expense-date").value = expense.date;
          document.getElementById("expense-name").value = expense.name;
          document.getElementById("expense-amount").value = expense.amount;
          

          expenses = expenses.filter(expense => expense.id !== id);
          displayExpenses(expenses);
          updateTotalAmount();

      }
  });

  filterCategory.addEventListener("change", (e) => {
      const category = e.target.value;
      if (category === "All") {
          displayExpenses(expenses);
      } else {
          const filteredExpenses = expenses.filter(expense => expense.category === category);
          displayExpenses(filteredExpenses);
      }
  });
  function displayExpenses(expenses) {
      expenseList.innerHTML = "";
      expenses.forEach(expense => {
          const row = document.createElement("tr");

          row.innerHTML = `
              <td>${expense.category}</td>
              <td>${expense.date}</td>
              <td>${expense.name}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                  <button class="edit-btn" data-id="${expense.id}">Edit</button>
                  <button class="delete-btn" data-id="${expense.id}">Delete</button>
              </td>
          `;

          expenseList.appendChild(row);
      });
  }

  function updateTotalAmount() {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const formattedTotal = total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
      totalAmount.textContent = total.toFixed(2);
      dashboardExpenseAmount.textContent = total.toFixed(2);
  }

  function balanceAmountDashBoard(){
    // Get the expense and income amounts as text content and remove the '₹' symbol
    const expenseAmountText = document.getElementById("Expense").textContent.replace('₹', '');
    const incomeAmountText = document.getElementById("Income").textContent.replace('₹', '');

    // Convert the text content to integers
    const expenseAmount = parseInt(expenseAmountText, 10);
    const incomeAmount = parseInt(incomeAmountText, 10);

    // Log the amounts for debugging
    console.log("expenseAmount", expenseAmount);
    console.log("incomeAmount", incomeAmount);

    // Calculate the balance
    const balance = incomeAmount - expenseAmount;
console.log("balance",balance)
    // Update the balance on the dashboard
    const BalanceDashboard = document.getElementById("Balance");
    BalanceDashboard.textContent = `${balance}`;
}

  balanceAmountDashBoard();
});

function getIncomeFromLocalStorage(){
    const incomeAmount = localStorage.getItem("income")
    console.log("IncomeAmount",incomeAmount)
    const Income = document.getElementById("Income")
    Income.textContent = incomeAmount

}
function addIncome() {
    const incomeInput = document.getElementById('incomeInput');
    const incomeDisplay = document.getElementById('Income');
  
    let currentIncome = parseFloat(incomeDisplay.textContent.replace('₹', ''));
    let newIncome = parseFloat(incomeInput.value);
  
    currentIncome += newIncome;
    incomeDisplay.textContent =  currentIncome.toFixed(2);
    incomeInput.value = ''; // Clear the input field
  }
// Function to add income
function addIncome() {
    // Get the input value
    const incomeInput = document.getElementById('incomeInput');
    const incomeValue = parseFloat(incomeInput.value);

    // Validate the input
    if (isNaN(incomeValue) || incomeValue <= 0) {
        alert('Please enter a valid amount greater than 0.');
        return;
    }

    // Get the current total income
    const totalIncomeElement = document.getElementById('Income');
    const currentTotalIncome = parseFloat(totalIncomeElement.textContent.replace('₹', ''));

    // Update the total income
    const newTotalIncome = currentTotalIncome + incomeValue;
    totalIncomeElement.textContent = `₹${newTotalIncome.toFixed(2)}`;

    // Clear the input field
    incomeInput.value = '0';
}
// Optional: Add event listener for form submission to prevent page refresh
document.getElementById('incomeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addIncome();
});



