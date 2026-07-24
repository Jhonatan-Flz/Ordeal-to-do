// Rendering Functions
function renderLists (  ) {

     boardList.innerHTML = '';
     state.lists.forEach (
          
          list => {
          
               const listEl = Object.assign ( 
				
				document.createElement ( 'div' ), 
				{ className: `field task click layout_1 ${ list.id === state.activeListId ? 'selected' : '' }` } 
			
			);

               if ( list.id === state.activeListId ) { currentListTitle.textContent = list.title; }
               const titleSpan = Object.assign ( document.createElement ( 'span' ), { textContent: list.title } );
               const deleteBtn = Object.assign ( document.createElement ( 'div' ), { className: 'delete-list-btn' } );

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
                         
                         state.activeListId = ( state.activeListId === list.id )? null : list.id;
                         state.activeTaskId = null;

                         saveData (  );
                         renderAll (  );

                    } 
               
               );

               attachDragEvents ( listEl, list.id, 'list', state.lists, renderAll );
               listEl.append ( titleSpan, deleteBtn );
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

	const tasksToRender = !includedGroups.length? activeList.tasks : activeList.tasks.filter ( task => includedGroups.includes ( task.groupId ) );
	tasksToRender.forEach ( 
		
		task => {

			const taskEl = document.createElement('div');
			taskEl.className = `task field click ${ task.id === state.activeTaskId ? 'selected' : '' } ${ task.isDone ? 'done' : '' }`;
			const circleEl = Object.assign ( document.createElement ( 'div' ), { className: 'circle' } );
			const nameSpan = Object.assign ( document.createElement ( 'span' ), { textContent: task.title } );

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

			attachDragEvents ( taskEl, task.id, 'task', activeList.tasks, renderTasks );
			taskEl.append ( circleEl, nameSpan );
			boardTask.appendChild ( taskEl );

		}

	);

}

function renderGroups (  ) {

     boardGroup.innerHTML = '';
     state.groups.forEach ( 
          
          group => {

               const groupEl = Object.assign ( document.createElement ( 'div' ), { className: 'field task click layout_1' } );
               if ( tempGroupId === group.id && !state.activeTaskId ) { groupEl.classList.add ( 'selected' ); } else
               if ( state.activeTaskId ) {

                    const activeList = state.lists.find ( list => list.id === state.activeListId );
                    const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
                    if ( activeTask && activeTask.groupId === group.id ) { groupEl.classList.add ( 'selected' ); }

               }

               const titleSpan = Object.assign ( document.createElement ( 'span' ), { textContent: group.name } );
               const deleteBtn = Object.assign ( document.createElement ( 'div' ), { className: 'delete-list-btn' } );

			deleteBtn.addEventListener ( 
				
				'click', ( e ) => {
					
					e.stopPropagation (  );
					state.lists.forEach ( 
						
						list => { 
						
							const activeTask = list.tasks.find ( task => task.id === state.activeTaskId );
							if ( activeTask && activeTask.groupId === group.id ) { state.activeTaskId = null; }

							list.tasks = list.tasks.filter ( task => task.groupId !== group.id ); 
						
						}
						
					)

					state.groups = state.groups.filter ( otherGroup => otherGroup.id !== group.id  );
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
				
					if ( state.activeTaskId ) {
				
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

						if ( tempGroupId === group.id ) {  

							tempGroupId = null;
							btnGroup.textContent = 'Group'; 
							btnGroup.classList.remove ( 'selected' );
						
						} else {  

							tempGroupId = group.id;
							btnGroup.textContent = group.name;
							btnGroup.classList.add ( 'selected' );

						}

						modalGroup.style.display = 'none';
					
					}
				
				} 
			
			);

			attachDragEvents ( groupEl, group.id, 'group', state.groups, renderGroups );
			groupEl.append ( titleSpan, deleteBtn );
			boardGroup.appendChild ( groupEl );
          
          } 

     );

}

function renderDetails (  ) {
	
	if ( state.activeTaskId ) {

		const activeList = state.lists.find ( list => list.id === state.activeListId );
		if ( activeList ) {

			const activeTask = activeList.tasks.find ( task => task.id === state.activeTaskId );
			if ( activeTask ) {

				taskTitleInput.value = activeTask.title;
				detailTaskInput.value = activeTask.description;

				taskTitleInput.style.height = '40px';
				taskTitleInput.style.height = taskTitleInput.scrollHeight + 2 + 'px';

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

	const disabled = !state.activeListId;
	btnGroup.disabled = disabled;
	btnDate.disabled = disabled;
	btnCreateTask.disabled = disabled;
	btnRemoveTask.disabled = disabled;
	detailTaskInput.disabled = disabled;
	btnFilter.disabled = disabled;
	btnOrder.disabled = true;
	taskTitleInput.disabled = disabled;
	currentListTitle.contentEditable = !disabled;
	
	tempGroupId = null;
	tempDueDate = null;
	
	taskTitleInput.value = '';
	detailTaskInput.value = '';

	taskTitleInput.placeholder = ( !state.activeListId )? 
	'Select a list' : 'Task title';

	taskTitleInput.style.height = '40px';
	btnCreateTask.textContent = 'Create';
	
	btnGroup.textContent = 'Group';
	btnGroup.classList.remove ( 'selected' );
	
	btnDate.textContent = 'Date';
	btnDate.classList.remove ( 'selected' );
	
}

function renderFilter (  ) {

     boardFilter.innerHTML = '';
     state.groups.forEach ( 
          
          group => {

               const groupEl = Object.assign ( document.createElement ( 'div' ), { className: 'field task click layout_1' } );
               const titleSpan = Object.assign ( document.createElement ( 'span' ), { textContent: group.name } );
               const deleteBtn = Object.assign ( document.createElement ( 'div' ), { className: 'delete-list-btn' } );
               if ( includedGroups.includes ( group.id ) ) { groupEl.classList.add ( 'included' ); }

			deleteBtn.addEventListener ( 
				
				'click', ( e ) => {
					
					e.stopPropagation (  );
					state.lists.forEach ( 
						
						list => { 
						
							const activeTask = list.tasks.find ( task => task.id === state.activeTaskId );
							if ( activeTask && activeTask.groupId === group.id ) { state.activeTaskId = null; }

							list.tasks = list.tasks.filter ( task => task.groupId !== group.id ); 
						
						}
						
					)

					state.groups = state.groups.filter ( otherGroup => otherGroup.id !== group.id  );
					if ( tempGroupId === group.id ) {

						tempGroupId = null;
						btnGroup.textContent = 'Group';
						btnGroup.classList.remove ( 'selected' );
					
					}

					includedGroups = includedGroups.filter ( id => id !== group.id );
					saveData (  );
					renderFilter (  );
					renderAll (  );
			
				} 
			
			);

			groupEl.addEventListener ( 
					
				'click', (  ) => {
				
					if ( includedGroups.includes ( group.id ) ) { 
						
						groupEl.classList.remove ( 'included' );
						includedGroups = includedGroups.filter ( id => id !== group.id );
					
					} else { 
						
						groupEl.classList.add ( 'included' );
						includedGroups.push ( group.id );
					
					}

					if ( !includedGroups.length ) { btnFilter.classList.remove ( 'selected' ); } else { btnFilter.classList.add ( 'selected' ); }
					renderFilter (  );
					renderTasks (  );

				}
			
			);

			attachDragEvents ( groupEl, group.id, 'group', state.groups, renderFilter );
			groupEl.append ( titleSpan, deleteBtn );
			boardFilter.appendChild ( groupEl );
          
          } 

     );

}