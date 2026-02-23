document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalSpan = document.getElementById('total');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.description}: $${expense.amount.toFixed(2)}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
            total += expense.amount;
        });
        totalSpan.textContent = total.toFixed(2);
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        if (description && amount > 0) {
            expenses.push({ description, amount });
            saveExpenses();
            renderExpenses();
            expenseForm.reset();
        }
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        }
    });

    renderExpenses();
});