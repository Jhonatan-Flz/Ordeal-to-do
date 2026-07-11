// Date modal functions
btnSaveDate.addEventListener ( 
	
	'click', (  ) => {
		
		if ( state.activeTaskId ) {

			const activeList = state.lists.find ( list => list.id === state.activeListId );
			if ( activeList ) {

				const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
				if ( activeTask ) {

					activeTask.dueDate = inputDate.value;
					saveData (  );
					renderDetails (  );
					modalDate.style.display = 'none';
				
				}
			}

		} else {
			
			tempDueDate = inputDate.value;
			if ( tempDueDate ) { 
				
				btnDate.textContent = tempDueDate; 
				btnDate.classList.add ( 'selected' );
			
			}
			
			modalDate.style.display = 'none';
		
		}

	} 

);

btnClearDate.addEventListener ( 
	
	'click', (  ) => {
	
		if ( state.activeTaskId ) {
	
			const activeList = state.lists.find ( list => list.id === state.activeListId );
			if ( activeList ) {
	
				const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
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