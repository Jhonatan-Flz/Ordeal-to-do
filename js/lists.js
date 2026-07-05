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