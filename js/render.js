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
					state.lists = state.lists.filter ( otherList => otherList.id !== list.id );
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

	const activeList = state.lists.find ( list => list.id === state.activeListId );
	if ( !activeList ) { return; }

	activeList.tasks.forEach ( 
		
		task => {

			const taskEl = document.createElement ( 'div' );
			taskEl.className = 'task field click';

			if ( task.isDone ) { taskEl.classList.add ( 'done' ); }
			if ( task.id === state.activeTaskId ) { taskEl.classList.add ( 'selected' ); }

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

			
			if ( tempGroupId === group.id && !state.activeTaskId ) { groupEl.classList.add ( 'selected' ); } else
			if ( state.activeTaskId ) {

				const activeList = state.lists.find ( list => list.id === state.activeListId );
				const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
				if ( activeTask.groupId === group.id ) { groupEl.classList.add ( 'selected' ); }

			}

			deleteBtn.addEventListener ( 
				
				'click', ( e ) => {
					
					e.stopPropagation (  );

					state.groups = state.groups.filter ( otherGroup => otherGroup.id !== group.id );
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
				
						const activeList = state.lists.find ( list => list.id === state.activeListId );
						if ( activeList ) {

							const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
							if ( activeTask ) {

								activeTask.groupId = ( activeTask.groupId === group.id )? null : group.id;
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

function renderDetails (  ) {
	
	if ( state.activeListId && state.activeTaskId ) {

		const activeList = state.lists.find ( list => list.id === state.activeListId );
		if ( activeList ) {

			const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
			if ( activeTask ) {

				taskTitleInput.value = activeTask.title;
				detailTaskInput.value = activeTask.description || '';

				taskTitleInput.style.height = '40px';
				taskTitleInput.style.height = taskTitleInput.scrollHeight + 'px';

				btnCreateTask.textContent = 'Save';

				if ( activeTask.groupId ) {

					const assignedGroup = state.groups.find ( group => group.id === activeTask.groupId );
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