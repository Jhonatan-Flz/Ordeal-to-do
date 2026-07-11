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

			Array.from(sidebarView.children).forEach(child => {

    if (child !== headerElement && child !== firstHrElement) {

        child.style.visibility = 'hidden';

    }

});

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
	
		const taskName = taskTitleInput.value.trim (  );
		const taskDesc = detailTaskInput.value.trim (  );

		const activeList = state.lists.find ( list => list.id === state.activeListId );
		if ( state.activeTaskId ) {

			const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
			if ( activeTask ) { 

				activeTask.title = taskName || activeTask.title;
				activeTask.description = taskDesc;

			} 
			
			state.activeTaskId = null;

		} else {
		
			if ( !taskName ) { 

				taskTitleInput.placeholder = 'Task title is required'; 
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
		saveData (  );
		renderAll (  );

	} 

);

btnRemoveTask.addEventListener ( 
	
	'click', (  ) => {
	
		if ( state.activeTaskId ) {
		
			const activeList = state.lists.find ( list => list.id === state.activeListId );			
			activeList.tasks = activeList.tasks.filter ( task => task.id !== state.activeTaskId );

			state.activeTaskId = null;
			saveData (  );
			renderAll (  );

		} else {

			tempGroupId = null;
			tempDueDate = null;

			taskTitleInput.value = '';
			detailTaskInput.value = '';
			
			taskTitleInput.style.height = '40px';
			taskTitleInput.placeholder = 'Task title';
			
			btnGroup.textContent = 'Group';
			btnGroup.classList.remove ( 'selected' );
			
			
			btnDate.textContent = 'Date';
			btnDate.classList.remove ( 'selected' );
			
		}

	} 

);

taskTitleInput.addEventListener ( 
	
	'input', (  ) => {

		this.style.height = '40px';
		this.style.height = taskTitleInput.scrollHeight + 'px';
		this.placeholder = 'Task title';

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

		if ( state.activeTaskId ) { 
			
			const activeList = state.lists.find ( list => list.id === state.activeListId );
			const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );

			// We use the actual value for the inputDate before opening it
			inputDate.value = activeTask.dueDate || '';
		
		} else { inputDate.value = tempDueDate || ''; }
		modalDate.style.display = 'flex';

	} 

);