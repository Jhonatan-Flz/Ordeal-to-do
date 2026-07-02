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
const detailTaskInput = document.getElementById('Detail-task');

let state = JSON.parse(localStorage.getItem('ordealData')) || {
    lists: [],
    activeListId: null,
    activeTaskId: null
};

function saveData() {
    localStorage.setItem('ordealData', JSON.stringify(state));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function renderAll() {
    renderLists();
    renderTasks();
    renderDetails();
}

function renderLists() {
    boardList.innerHTML = '';
    
    state.lists.forEach(list => {
        const listEl = document.createElement('div');
        listEl.className = 'field task click layout_1';
        
        if (list.id === state.activeListId) {
            listEl.classList.add('selected');
            currentListTitle.textContent = list.title;
        }

        const titleSpan = document.createElement('span');
        titleSpan.textContent = list.title;

        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'delete-list-btn';

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.lists = state.lists.filter(l => l.id !== list.id);
            if (state.activeListId === list.id) {
                state.activeListId = null;
                state.activeTaskId = null;
                currentListTitle.textContent = '';
            }
            saveData();
            renderAll();
        });

        listEl.addEventListener('click', () => {
            state.activeListId = list.id;
            state.activeTaskId = null;
            saveData();
            renderAll();
        });

        listEl.appendChild(titleSpan);
        listEl.appendChild(deleteBtn);
        boardList.appendChild(listEl);
    });

    if (!state.activeListId) {
        currentListTitle.textContent = '';
    }
}

function renderTasks() {
    boardTask.innerHTML = '';
    
    if (!state.activeListId) return;

    const activeList = state.lists.find(l => l.id === state.activeListId);
    if (!activeList) return;

    activeList.tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = 'task field click';
        
        if (task.isDone) taskEl.classList.add('done');
        if (task.id === state.activeTaskId) taskEl.classList.add('selected');

        const circleEl = document.createElement('div');
        circleEl.className = 'circle';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = task.title;

        circleEl.addEventListener('click', (e) => {
            e.stopPropagation();
            task.isDone = !task.isDone;
            saveData();
            renderTasks();
        });

        taskEl.addEventListener('click', () => {
            state.activeTaskId = task.id;
            saveData();
            renderAll();
        });

        taskEl.appendChild(circleEl);
        taskEl.appendChild(nameSpan);
        boardTask.appendChild(taskEl);
    });
}

function renderDetails() {
    if (state.activeListId && state.activeTaskId) {
        const activeList = state.lists.find(l => l.id === state.activeListId);
        if (activeList) {
            const activeTask = activeList.tasks.find(t => t.id === state.activeTaskId);
            if (activeTask) {
                titleTaskInput.value = activeTask.title;
                detailTaskInput.value = activeTask.description || '';
                
                titleTaskInput.style.height = '40px';
                titleTaskInput.style.height = titleTaskInput.scrollHeight + 'px';
                
                btnCreateTask.textContent = 'Save';
                return;
            }
        }
    }
    
    titleTaskInput.value = '';
    detailTaskInput.value = '';
    titleTaskInput.style.height = '40px';
    btnCreateTask.textContent = 'Create';
}

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

    const newList = {
        id: generateId(),
        title: listName,
        tasks: []
    };

    state.lists.push(newList);
    state.activeListId = newList.id;
    state.activeTaskId = null;
    inputList.value = '';
    
    saveData();
    renderAll();
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
    const taskDesc = detailTaskInput.value.trim();

    if (taskName === '') {
        titleTaskInput.placeholder = 'Task title is required';
        titleTaskInput.classList.add('input-error');
        return;
    }

    if (!state.activeListId) {
        titleTaskInput.placeholder = 'Please select a list first!';
        titleTaskInput.classList.add('input-error');
        titleTaskInput.value = '';
        return;
    }

    const activeList = state.lists.find(l => l.id === state.activeListId);
    
    if (activeList) {
        if (state.activeTaskId) {
            const activeTask = activeList.tasks.find(t => t.id === state.activeTaskId);
            if (activeTask) {
                activeTask.title = taskName;
                activeTask.description = taskDesc;
            }
            state.activeTaskId = null;
        } else {
            const newTask = {
                id: generateId(),
                title: taskName,
                description: taskDesc,
                isDone: false
            };
            activeList.tasks.push(newTask);
        }
        
        titleTaskInput.placeholder = 'Task title';
        titleTaskInput.classList.remove('input-error');
        
        saveData();
        renderAll(); 
    }
});

btnRemoveTask.addEventListener('click', () => {
    if (state.activeListId && state.activeTaskId) {
        const activeList = state.lists.find(l => l.id === state.activeListId);
        if (activeList) {
            activeList.tasks = activeList.tasks.filter(t => t.id !== state.activeTaskId);
            state.activeTaskId = null;
            saveData();
            renderAll(); 
        }
    } else {
        alert('Please select a task to remove.');
    }
});

titleTaskInput.addEventListener('input', function() {
    this.style.height = '40px';
    this.style.height = this.scrollHeight + 'px';
    this.placeholder = 'Task title';
    this.classList.remove('input-error');

    if (state.activeTaskId && state.activeListId) {
        const activeList = state.lists.find(l => l.id === state.activeListId);
        if (activeList) {
            const activeTask = activeList.tasks.find(t => t.id === state.activeTaskId);
            if (activeTask) {
                activeTask.title = this.value;
                saveData();
                renderTasks();
            }
        }
    }
});

detailTaskInput.addEventListener('input', function() {
    if (state.activeTaskId && state.activeListId) {
        const activeList = state.lists.find(l => l.id === state.activeListId);
        if (activeList) {
            const activeTask = activeList.tasks.find(t => t.id === state.activeTaskId);
            if (activeTask) {
                activeTask.description = this.value;
                saveData();
            }
        }
    }
});

titleTaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        btnCreateTask.click();
    }
});

renderAll();