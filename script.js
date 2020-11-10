class Expense {
	constructor(category, name, date, price) {             //parameterized constructor
		this.category = category;
		this.name = name;
		this.date = date;
		this.price = price;
	}
}

//performing task on button like adding, deleting, creating etc.

class UI{
	static showExpense(){
		const expenseTable = document.getElementById('expenseTable');
		expenseTable.innerHTML='';
		//console.log(expenseTable.appendChild(expenses));
		if(expenses.length>0){
			for(let i=0; i<expenses.length; i++){
				expenseTable.appendChild(this.createDataRow(expenses[i]));
			}
		}else{
			expenseTable.appendChild(this.emptyRow());
		}
	}


	static emptyRow(){
		const expenseRow = document.createElement('tr');
		const expenseForCategory = document.createElement('td');
		expenseForCategory.setAttribute('colspan',5);
		expenseForCategory.textContent='No expense items yet! Please add one up top...';
		expenseRow.appendChild(expenseForCategory);
		return expenseRow
	}
	static createDataRow(expense){
		//console.log(expense);
		const expenseRow = document.createElement('tr');
		

		const expenseForCategory = document.createElement('td');

		expenseForCategory.textContent=expense.category;
		expenseRow.appendChild(expenseForCategory);

		const expenseName = document.createElement('td');
		expenseName.textContent=expense.name;
		expenseRow.appendChild(expenseName);

		const expenseDate= document.createElement('td');
		expenseDate.textContent= expense.date;
		expenseRow.appendChild(expenseDate);

		const expensePrice = document.createElement('td');
		expensePrice.textContent= expense.price;
		expenseRow.appendChild(expensePrice);

		const expenseOption = document.createElement('td');
		const delAnchor = document.createElement('a');
		delAnchor.className= 'deleteButton';
		delAnchor.onclick= (e)=>{
			StoreExpense.clearExpense(expenses.id);
			localStorage.setItem('expenses' ,JSON.stringify(expenses));
		}
		//console.log(StoreExpense.clearExpense(expenses.id));
		delAnchor.textContent='delete';
		expenseRow.appendChild(delAnchor);

		return expenseRow;
	}

	static totalPrice() {
		const totalPrice = document.getElementById('totalPrice');
		let totalExpense = 0;
		let expenses = JSON.parse(localStorage.getItem('expenses'));
		expenses.map((expenses) => (totalExpense += expenses.price));
		if (totalExpense) totalPrice.innerText = totalExpense;
		totalExpense += parseInt(price);
				//console.log(totalPrice);


	}
}


class StoreExpense{
	static getExpense(){
		let expenses = localStorage.getItem('expenses');
		return expenses = null ? []:JSON.parse(expenses);
	}

	static addExpense(expense){
		let expenses = StoreExpense.getExpense();
		expenses.push(expense);
		localStorage.setItem('expenses',JSON.stringify(expenses));
	}

	static clearExpense(id){
		//let expenses = StoreExpense.getExpense();
		let totalExpense = 0;

		for (let i = 0; i < expenses.length; i++) {
			if (expenses[i].id == id) {
				totalExpense-=parseInt(expenses[i].price);
				totalPrice.innerText = totalExpense;
				expenses.splice(0, i);
			}
		}
		//console.error();

		//totalPrice =

	}
}

const expenses = JSON.parse(localStorage.getItem('expenses')) ||[];

//addEventListener on add expense button
document.getElementById('expense-Form').addEventListener('submit', (e)=>{
	e.preventDefault();

	

	let category = document.getElementById('category').value;
	//console.log(category);
	let name = document.getElementById('name').value;
	//console.log(typeof name);
	let date = document.getElementById('dateTime').value;
	//console.log(typeof date);
	let price = document.getElementById('price').value;
	//console.log(typeof price);

	if(category=="choose_one" || name =='' || date=='' || price==''){
		document.getElementById('empty').innerHTML='Please enter the value of the expense'; 
		return;
	}
	else{
		document.getElementById('empty').innerHTML=''; 
	}

	const expense = new Expense(category, name, date, price);

	console.log(expense);

	expenses.push(expense);
	localStorage.setItem('expenses', JSON.stringify(expenses));

	document.getElementById('expense-Form').reset();
	//StoreExpense.addExpense(expenses);


})

const showExpense = new UI();
///console.log(showExpense);

document.addEventListener('DOMContentLoaded', () => {
	UI.showExpense();
	UI.totalPrice();
	//let expenses = JSON.parse(localStorage.getItem('expenses'));

	//const addExpenses = new StoreExpense(expenses);
	//console.log(addExpenses(expense));
});