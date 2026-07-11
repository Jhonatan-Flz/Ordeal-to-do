// Group Modal Functions
btnCloseGroup.addEventListener ( 
	
	'click', (  ) => {

		modalGroup.style.display = 'none';
		inputGroup.value = '';
		inputGroup.placeholder = 'Group name';

	} 

);

btnAddGroup.addEventListener ( 
	
	'click', (  ) => {

		const groupName = inputGroup.value.trim (  );
		if ( !groupName ) {

			inputGroup.placeholder = 'Group name is required';
			return;
		
		}

		inputGroup.placeholder = 'Group name';
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
	
	'input', (  ) => { inputGroup.placeholder = 'Group name'; } 

);
