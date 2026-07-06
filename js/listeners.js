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

		const activeList = state.lists.find ( list => list.id === state.activeListId );
		if ( activeList ) {

			if ( state.activeTaskId ) {

				const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
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
		
			const activeList = state.lists.find ( list => list.id === state.activeListId );
			if ( activeList ) {
			
				activeList.tasks = activeList.tasks.filter ( task => task.id !== state.activeTaskId );
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
			
			const activeList = state.lists.find ( list => list.id === state.activeListId );
			if ( !activeList ) { return; }

			const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
			if ( !activeTask ) { return; }
			
			inputDate.value = activeTask.dueDate || '';
		
		} else { inputDate.value = tempDueDate || ''; }
		modalDate.style.display = 'flex';

	} 

);