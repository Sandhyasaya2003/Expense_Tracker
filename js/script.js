//script.js

document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");
  const filterCategory = document.getElementById("filter-category");

  let expenses = [];

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
  }
});



function addIncome() {
    const incomeInput = document.getElementById('incomeInput');
    const incomeDisplay = document.getElementById('Income');
  
    let currentIncome = parseFloat(incomeDisplay.textContent.replace('₹', ''));
    let newIncome = parseFloat(incomeInput.value);
  
    currentIncome += newIncome;
    incomeDisplay.textContent = '₹' + currentIncome.toFixed(2);
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

