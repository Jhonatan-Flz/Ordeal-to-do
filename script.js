// Variables
const sidebarView = document.querySelector ( '.sidebar.card' );
const btnCalendar = document.getElementById ( 'toggle-calendar' );
const mainView = document.querySelector ( '.main.card' );
const detailsView = document.querySelector ( '.details.card' );
const calendarView = document.getElementById ( 'calendar' );

const inputList = document.getElementById ( 'Input-list' );
const btnAddList = document.getElementById ( 'Add-list' );
const boardList = document.getElementById ( 'Board-list' );
const currentListTitle = document.getElementById ( 'Current-list-title' );

const btnCreateTask = document.getElementById ( 'create' );
const btnRemoveTask = document.getElementById ( 'remove' );
const boardTask = document.getElementById ( 'Board-task' );
const taskTitleInput = document.getElementById ( 'Title-task' );
const detailTaskInput = document.getElementById ( 'Detail-task' );

// Group Modal Variables
const btnGroup = document.getElementById ( 'group' );
const modalGroup = document.getElementById ( 'Modal-group' );
const btnCloseGroup = document.getElementById ( 'Close-group' );
const inputGroup = document.getElementById ( 'Input-group' );
const btnAddGroup = document.getElementById ( 'Add-group' );
const boardGroup = document.getElementById ( 'Board-group' );

// Date Modal Variables
const btnDate = document.getElementById ( 'date' );
const modalDate = document.getElementById ( 'Modal-date' );
const btnCloseDate = document.getElementById ( 'Close-date' );
const inputDate = document.getElementById ( 'Input-date' );
const btnSaveDate = document.getElementById ( 'Save-date' );
const btnClearDate = document.getElementById ( 'Clear-date' );

// Temporary variables to hold group and date for new tasks
let tempGroupId = null;
let tempDueDate = null;

// Local Storage
// 	state shape:
//   lists:  [{ id, title, tasks: [{ id, title, description, isDone, groupId, dueDate }] }]
//   groups: [{ id, name }]
//   activeListId: id of the list open in the center panel, or null
//   activeTaskId: id of the task loaded in the right-hand editor, or null
let state;
try {
	
	state = JSON.parse ( localStorage.getItem ( 'ordealData' ) ) || {

		lists: [  ],
		groups: [  ],
		activeListId: null,
		activeTaskId: null
	
	};

} catch ( e ) {
    
	console.error ( 'Saved data was corrupted, starting fresh.', e );
	state = {
		
		lists: [  ],
		groups: [  ],
		activeListId: null,
		activeTaskId: null
    
	};

}

// Utility Functions
function saveData (  ) { localStorage.setItem ( 'ordealData', JSON.stringify ( state ) ); }
function generateId (  ) { return Date.now (  ).toString ( 36 ) + Math.random (  ).toString ( 36 ).substring ( 2 ); }
function renderAll (  ) {

	renderLists (  );
	renderTasks (  );
	renderDetails (  );

}

// Rendering Functions
function renderLists (  ) {

	boardList.innerHTML = '';

	state.lists.forEach (
		
		list => {
		
			const listEl = document.createElement ( 'div' );
			listEl.className = 'field task click layout_1';

			if ( list.id === state.activeListId ) {

				listEl.classList.add ( 'selected' );
				currentListTitle.textContent = list.title;
			
			}

			const titleSpan = document.createElement ( 'span' );
			titleSpan.textContent = list.title;

			const deleteBtn = document.createElement ( 'div' );
			deleteBtn.className = 'delete-list-btn';

			deleteBtn.addEventListener ( 
				
				'click', ( e ) => {

					e.stopPropagation (  );
					state.lists = state.lists.filter ( l => l.id !== list.id );
					if ( state.activeListId === list.id ) {

						state.activeListId = null;
						state.activeTaskId = null;
						currentListTitle.textContent = '';
					
					}

					saveData (  );
					renderAll (  );
		
				}
		
			);

			listEl.addEventListener ( 
				
				'click', (  ) => {
					
					if ( state.activeListId === list.id ) { state.activeListId = null; } 
					else { state.activeListId = list.id; }

					state.activeTaskId = null;

					saveData (  );
					renderAll (  );

				} 
			
			);

			listEl.appendChild ( titleSpan );
			listEl.appendChild ( deleteBtn );
			boardList.appendChild ( listEl );
		
		} 

	);

	if ( !state.activeListId ) { currentListTitle.textContent = ''; }

}

function renderTasks (  ) {

	boardTask.innerHTML = '';

	if ( !state.activeListId ) { return; }

	const activeList = state.lists.find ( l => l.id === state.activeListId );
	if ( !activeList ) { return; }

	activeList.tasks.forEach ( 
		
		task => {

			const taskEl = document.createElement ( 'div' );
			taskEl.className = 'task field click';

			if ( task.isDone ) taskEl.classList.add ( 'done' );
			if ( task.id === state.activeTaskId ) taskEl.classList.add ( 'selected' );

			const circleEl = document.createElement ( 'div' );
			circleEl.className = 'circle';

			const nameSpan = document.createElement ( 'span' );
			nameSpan.textContent = task.title;

			circleEl.addEventListener ( 
				
				'click', ( e ) => {

					e.stopPropagation (  );
					task.isDone = !task.isDone;
					saveData (  );
					renderTasks (  );
			
				} 
			
			);

			taskEl.addEventListener ( 
				
				'click', (  ) => {

					state.activeTaskId = ( state.activeTaskId === task.id ) ? null : task.id;

					saveData (  );
					renderAll (  );
			
				} 
			
			);

			taskEl.appendChild ( circleEl );
			taskEl.appendChild ( nameSpan );
			boardTask.appendChild ( taskEl );

		} 

	);

}

function renderDetails (  ) {
	
	if ( state.activeListId && state.activeTaskId ) {

		const activeList = state.lists.find ( l => l.id === state.activeListId );
		if ( activeList ) {

			const activeTask = activeList.tasks.find ( t => t.id === state.activeTaskId );
			if ( activeTask ) {

				taskTitleInput.value = activeTask.title;
				detailTaskInput.value = activeTask.description || '';

				taskTitleInput.style.height = '40px';
				taskTitleInput.style.height = taskTitleInput.scrollHeight + 'px';

				btnCreateTask.textContent = 'Save';

				if ( activeTask.groupId ) {

					const assignedGroup = state.groups.find ( g => g.id === activeTask.groupId );
					if ( assignedGroup ) {

						btnGroup.textContent = assignedGroup.name;
						btnGroup.classList.add ( 'selected' );
					
					} else {

						btnGroup.textContent = 'Group';
						btnGroup.classList.remove ( 'selected' );
					
					}

				} else {

					btnGroup.textContent = 'Group';
					btnGroup.classList.remove ( 'selected' );
				
				}

				if ( activeTask.dueDate ) {
				
					btnDate.textContent = activeTask.dueDate;
					btnDate.classList.add ( 'selected' );
				
				} else {
				
					btnDate.textContent = 'Date';
					btnDate.classList.remove ( 'selected' );
				
				}

				return;

			}

		}

	}

	tempGroupId = null;
	tempDueDate = null;
	
	taskTitleInput.value = '';
	detailTaskInput.value = '';
	taskTitleInput.style.height = '40px';
	btnCreateTask.textContent = 'Create';
	
	btnGroup.textContent = 'Group';
	btnGroup.classList.remove ( 'selected' );
	
	btnDate.textContent = 'Date';
	btnDate.classList.remove ( 'selected' );
}

function renderGroups (  ) {

	boardGroup.innerHTML = '';

	state.groups.forEach ( 
		
		group => {

			const groupEl = document.createElement ( 'div' );
			groupEl.className = 'field task click layout_1';

			const titleSpan = document.createElement ( 'span' );
			titleSpan.textContent = group.name;

			const deleteBtn = document.createElement ( 'div' );
			deleteBtn.className = 'delete-list-btn';

			deleteBtn.addEventListener ( 
				
				'click', ( e ) => {
					
					e.stopPropagation (  );

					state.groups = state.groups.filter ( g => g.id !== group.id );
					state.lists.forEach ( 
						
						list => { list.tasks.forEach ( task => { if ( task.groupId === group.id ) { task.groupId = null; } } ); } 
					
					);

					if ( tempGroupId === group.id ) {

						tempGroupId = null;
						btnGroup.textContent = 'Group';
						btnGroup.classList.remove ( 'selected' );
					
					}

					saveData (  );
					renderGroups (  );
					renderAll (  );
			
				} 
			
			);

			groupEl.addEventListener ( 
				
				'click', (  ) => {
				
					if ( state.activeListId && state.activeTaskId ) {
				
						const activeList = state.lists.find ( l => l.id === state.activeListId );
						if ( activeList ) {

							const activeTask = activeList.tasks.find ( t => t.id === state.activeTaskId );
							if ( activeTask ) {

								activeTask.groupId = group.id;
								saveData (  );
								renderDetails (  );
								modalGroup.style.display = 'none';
							
							}
						}
				
					} else {

						tempGroupId = group.id;
						btnGroup.textContent = group.name;
						btnGroup.classList.add ( 'selected' );
						modalGroup.style.display = 'none';
					
					}
				
				} 
		
			);

			groupEl.appendChild ( titleSpan );
			groupEl.appendChild ( deleteBtn );
			boardGroup.appendChild ( groupEl );
		
		} 

	);

}

// Main page functionalities
btnCalendar.addEventListener ( 
	
	'click', (  ) => {
		
		const isCalendarOpen = calendarView.style.display === 'block';
		const headerElement = sidebarView.querySelector ( 'header' );
		const firstHrElement = headerElement.nextElementSibling;

		if ( isCalendarOpen ) {
		
			calendarView.style.display = 'none';
			mainView.style.display = 'block';
			detailsView.style.display = 'flex';
			btnCalendar.textContent = 'Calendar';

			Array.from ( sidebarView.children ).forEach ( 
				
				child => { if ( child !== headerElement && child !== firstHrElement ) { child.style.visibility = 'visible'; } }

			);

		} else {

			mainView.style.display = 'none';
			detailsView.style.display = 'none';
			calendarView.style.display = 'block';
			btnCalendar.textContent = 'To do';

			Array.from ( sidebarView.children ).forEach ( 
				
				child => { if ( child !== headerElement && child !== firstHrElement ) { child.style.visibility = 'hidden'; } } 
			
			);
		
		}
	
	} 

);

btnCreateTask.addEventListener ( 
	
	'click', (  ) => {
	
		let taskName = taskTitleInput.value.trim (  );
		const taskDesc = detailTaskInput.value.trim (  );

		if ( !state.activeListId ) {

			taskTitleInput.placeholder = 'Please select a list';
			taskTitleInput.classList.add ( 'input-error' );
			taskTitleInput.value = '';
			return;
		
		}

		const activeList = state.lists.find ( l => l.id === state.activeListId );
		if ( activeList ) {

			if ( state.activeTaskId ) {

				const activeTask = activeList.tasks.find ( t => t.id === state.activeTaskId );
				if ( activeTask ) {

					if ( taskName === '' ) { taskName = activeTask.title; }
					activeTask.title = taskName;
					activeTask.description = taskDesc;

				} state.activeTaskId = null;
			
			} else {
			
				if ( taskName === '' ) {
			
					taskTitleInput.placeholder = 'Task title is required';
					taskTitleInput.classList.add ( 'input-error' );
					return;
			
				}

				const newTask = {

					id: generateId (  ),
					title: taskName,
					description: taskDesc,
					isDone: false,
					groupId: tempGroupId,
					dueDate: tempDueDate
				
				};
				
				activeList.tasks.push ( newTask );
				tempGroupId = null;
				tempDueDate = null;

			}

			taskTitleInput.placeholder = 'Task title';
			taskTitleInput.classList.remove ( 'input-error' );

			saveData (  );
			renderAll (  );

		}

	} 

);

btnRemoveTask.addEventListener ( 
	
	'click', (  ) => {
	
		if ( state.activeListId && state.activeTaskId ) {
		
			const activeList = state.lists.find ( l => l.id === state.activeListId );
			if ( activeList ) {
			
				activeList.tasks = activeList.tasks.filter ( t => t.id !== state.activeTaskId );
				state.activeTaskId = null;
				saveData (  );
				renderAll (  ); 
			
			}

		} else {

			tempGroupId = null;
			tempDueDate = null;

			taskTitleInput.value = '';
			detailTaskInput.value = '';
			
			taskTitleInput.style.height = '40px';
			taskTitleInput.placeholder = 'Task title';
			taskTitleInput.classList.remove ( 'input-error' );
			
			if ( btnGroup ) {

				btnGroup.textContent = 'Group';
				btnGroup.classList.remove ( 'selected' );
			
			}
			
			if ( btnDate ) {
			
				btnDate.textContent = 'Date';
				btnDate.classList.remove ( 'selected' );
			
			}
			
			const btnReminder = document.getElementById ( 'reminder' );
			if ( btnReminder ) { btnReminder.textContent = 'R1'; }
			
			const btnRepeat = document.getElementById ( 'repeat' );
			if ( btnRepeat ) { btnRepeat.textContent = 'R2'; }

		}

	} 

);

taskTitleInput.addEventListener ( 
	
	'input', function (  ) {

		this.style.height = '40px';
		this.style.height = this.scrollHeight + 'px';
		this.placeholder = 'Task title';
		this.classList.remove ( 'input-error' );

	} 

);

btnGroup.addEventListener ( 
	
	'click', (  ) => {
	
		modalGroup.style.display = 'flex';
		renderGroups (  );

	} 

);

btnDate.addEventListener ( 
	
	'click', (  ) => {
	
		if ( !state.activeListId ) { return; }

		if ( state.activeTaskId ) { 
			
			const activeList = state.lists.find ( l => l.id === state.activeListId );
			if ( !activeList ) { return; }

			const activeTask = activeList.tasks.find ( t => t.id === state.activeTaskId );
			if ( !activeTask ) { return; }
			
			inputDate.value = activeTask.dueDate || '';
		
		} else { inputDate.value = tempDueDate || ''; }
		modalDate.style.display = 'flex';

	} 

);

// List management functions
btnAddList.addEventListener ( 
	
	'click', (  ) => {

		const listName = inputList.value.trim (  );

		if ( listName === '' ) {
		
			inputList.placeholder = 'List title is required';
			inputList.classList.add ( 'input-error' );
			return;
		
		}

		inputList.placeholder = 'List title';
		inputList.classList.remove ( 'input-error' );

		const newList = {

			id: generateId (  ),
			title: listName,
			tasks: [  ]
		
		};

		state.lists.push ( newList );
		state.activeListId = newList.id;
		state.activeTaskId = null;
		inputList.value = '';

		saveData (  );
		renderAll (  );

	} 

);

currentListTitle.addEventListener ( 
	
	'blur', (  ) => {

		if ( state.activeListId ) {

			const activeList = state.lists.find ( l => l.id === state.activeListId );
			if ( activeList ) { 
				
				const newTitle = currentListTitle.textContent.trim (  );
				if ( newTitle !== '' ) { activeList.title = newTitle; } 
				else { currentListTitle.textContent = activeList.title; }

				saveData (  );
				renderLists (  );
			
			}
		
		}

	} 

);

inputList.addEventListener ( 
	
	'input', (  ) => {
	
		inputList.placeholder = 'List title';
		inputList.classList.remove ( 'input-error' );

	} 

);

// Group Modal Functions
btnCloseGroup.addEventListener ( 
	
	'click', (  ) => {

		modalGroup.style.display = 'none';
		inputGroup.value = '';
		inputGroup.placeholder = 'Group name';
		inputGroup.classList.remove ( 'input-error' );

	} 

);

btnAddGroup.addEventListener ( 
	
	'click', (  ) => {

		const groupName = inputGroup.value.trim (  );

		if ( groupName === '' ) {

			inputGroup.placeholder = 'Group name is required';
			inputGroup.classList.add ( 'input-error' );
			return;
		
		}

		inputGroup.placeholder = 'Group name';
		inputGroup.classList.remove ( 'input-error' );

		const newGroup = {
		
			id: generateId (  ),
			name: groupName
		
		};
		
		state.groups.push ( newGroup );
		inputGroup.value = '';
		saveData (  );
		renderGroups (  );

	} 

);

inputGroup.addEventListener ( 
	
	'input', (  ) => { inputGroup.placeholder = 'Group name'; inputGroup.classList.remove ( 'input-error' ); } 

);

// Date modal functions
btnSaveDate.addEventListener ( 
	
	'click', (  ) => {
		
		if ( state.activeListId && state.activeTaskId ) {

			const activeList = state.lists.find ( l => l.id === state.activeListId );
			if ( activeList ) {

				const activeTask = activeList.tasks.find ( t => t.id === state.activeTaskId );
				if ( activeTask ) {

					activeTask.dueDate = inputDate.value;
					saveData (  );
					renderDetails (  );
					modalDate.style.display = 'none';
				
				}
			}

		} else {
			
			tempDueDate = inputDate.value;
			btnDate.textContent = tempDueDate; 
			btnDate.classList.add ( 'selected' );
			modalDate.style.display = 'none';
		
		}

	} 

);

btnClearDate.addEventListener ( 
	
	'click', (  ) => {
	
		if ( state.activeListId && state.activeTaskId ) {
	
			const activeList = state.lists.find ( l => l.id === state.activeListId );
			if ( activeList ) {
	
				const activeTask = activeList.tasks.find ( t => t.id === state.activeTaskId );
				if ( activeTask ) {
	
					activeTask.dueDate = null;
					saveData (  );
					renderDetails (  );
					modalDate.style.display = 'none';
	
				}
	
			}
	
		} else {
	
			tempDueDate = null;
			inputDate.value = '';
			btnDate.textContent = 'Date'; 
			btnDate.classList.remove ( 'selected' );
			modalDate.style.display = 'none';
	
		}

	} 

);

btnCloseDate.addEventListener ( 
	
	'click', (  ) => { modalDate.style.display = 'none'; } 

);

// Keyboard shortcuts
taskTitleInput.addEventListener ( 
	
	'keydown', ( e ) => { if ( e.key === 'Enter' && !e.shiftKey ) { e.preventDefault (  ); btnCreateTask.click (  ); } } 

);

inputList.addEventListener ( 
	
	'keydown', ( e ) => { if ( e.key === 'Enter' ) { btnAddList.click (  ); } } 

);

currentListTitle.addEventListener ( 
	
	'keydown', function ( e ) { if ( e.key === 'Enter' ) { e.preventDefault (  ); this.blur (  ); } } 

);

inputGroup.addEventListener (

	'keydown', ( e ) => { if ( e.key === 'Enter' ) { e.preventDefault (  ); btnAddGroup.click (  ); } } 

);

// Initial render
renderAll (  );