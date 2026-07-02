const sidebarView = document.querySelector('.sidebar.card');

const btnCalendar = document.getElementById('toggle-calendar');
const mainView = document.querySelector('.main.card');
const detailsView = document.querySelector('.details.card');
const calendarView = document.getElementById('calendar');

const inputList = document.getElementById('Input-list');
const btnAddList = document.getElementById('Add-list');
const boardList = document.getElementById('Board-list');
const currentListTitle = document.getElementById('Current-list-title');

const btnCreateTask = document.getElementById('create');
const btnRemoveTask = document.getElementById('remove');
const boardTask = document.getElementById('Board-task');
const titleTaskInput = document.getElementById('Title-task');

let activeTaskContainer = null;
let activeTaskElement = null;

btnCalendar.addEventListener('click', () => {
	const isCalendarOpen = calendarView.style.display === 'block';
	const headerElement = sidebarView.querySelector('header');
	const firstHrElement = headerElement.nextElementSibling;

	if (isCalendarOpen) {
		calendarView.style.display = 'none';
		mainView.style.display = 'block';
		detailsView.style.display = 'flex';
		btnCalendar.textContent = 'Calendar';

		Array.from(sidebarView.children).forEach(child => {
			if (child !== headerElement && child !== firstHrElement) {
				child.style.visibility = 'visible';
			}
		});
	} else {
		mainView.style.display = 'none';
		detailsView.style.display = 'none';
		calendarView.style.display = 'block';
		btnCalendar.textContent = 'To do';

		Array.from(sidebarView.children).forEach(child => {
			if (child !== headerElement && child !== firstHrElement) {
				child.style.visibility = 'hidden';
			}
		});
	}
});

btnAddList.addEventListener('click', () => {
	const listName = inputList.value.trim();

	if (listName === '') {
		inputList.placeholder = 'List title is required';
		inputList.classList.add('input-error');
		return;
	}

	inputList.placeholder = 'List title';
	inputList.classList.remove('input-error');

	const listEl = document.createElement('div');
	listEl.className = 'field task click layout_1';

	const titleSpan = document.createElement('span');
	titleSpan.textContent = listName;

	const deleteBtn = document.createElement('div');
	deleteBtn.className = 'delete-list-btn';

	const myTaskContainer = document.createElement('div');
	myTaskContainer.style.display = 'none';
	myTaskContainer.style.flexDirection = 'column';
	myTaskContainer.style.gap = '5.6px';
	boardTask.appendChild(myTaskContainer);

	deleteBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		listEl.remove();
		myTaskContainer.remove();

		if (listEl.classList.contains('selected')) {
			currentListTitle.textContent = 'List Title';
			activeTaskContainer = null;
		}
	});

	listEl.addEventListener('click', () => {
		const allLists = boardList.querySelectorAll('.task');
		allLists.forEach(el => el.classList.remove('selected'));

		listEl.classList.add('selected');
		currentListTitle.textContent = listName;

		Array.from(boardTask.children).forEach(child => child.style.display = 'none');
		myTaskContainer.style.display = 'flex';
		activeTaskContainer = myTaskContainer;
		activeTaskElement = null;
	});

	listEl.appendChild(titleSpan);
	listEl.appendChild(deleteBtn);
	boardList.appendChild(listEl);

	inputList.value = '';
});

inputList.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		btnAddList.click();
	}
});

inputList.addEventListener('input', () => {
	inputList.placeholder = 'List title';
	inputList.classList.remove('input-error');
});

btnCreateTask.addEventListener('click', () => {
	const taskName = titleTaskInput.value.trim();

	if (taskName === '') {
		titleTaskInput.placeholder = 'Task title is required';
		titleTaskInput.classList.add('input-error');
		return;
	}

	if (!activeTaskContainer) {
		titleTaskInput.placeholder = 'Please select a list first!';
		titleTaskInput.classList.add('input-error');
		titleTaskInput.value = '';
		return;
	}

	titleTaskInput.placeholder = 'Task title';
	titleTaskInput.classList.remove('input-error');

	const taskEl = document.createElement('div');
	taskEl.className = 'task field click';

	const circleEl = document.createElement('div');
	circleEl.className = 'circle';

	const nameSpan = document.createElement('span');
	nameSpan.textContent = taskName;

	circleEl.addEventListener('click', (e) => {
		e.stopPropagation();
		taskEl.classList.toggle('done');
	});

	taskEl.addEventListener('click', () => {
		const allTasks = activeTaskContainer.querySelectorAll('.task');
		allTasks.forEach(t => t.classList.remove('selected'));

		taskEl.classList.add('selected');
		activeTaskElement = taskEl;
	});

	taskEl.appendChild(circleEl);
	taskEl.appendChild(nameSpan);
	activeTaskContainer.appendChild(taskEl);

	titleTaskInput.value = '';
	titleTaskInput.style.height = '40px';
});

btnRemoveTask.addEventListener('click', () => {
	if (activeTaskElement) {
		activeTaskElement.remove();
		activeTaskElement = null;
	} else {
		alert('Please select a task to remove.');
	}
});

titleTaskInput.addEventListener('input', function() {
	this.style.height = '40px';
	this.style.height = this.scrollHeight + 'px';

	this.placeholder = 'Task title';
	this.classList.remove('input-error');
});

titleTaskInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' && !e.shiftKey) {
		e.preventDefault();
		btnCreateTask.click();
	}
});