// Keyboard shortcuts
taskTitleInput.addEventListener ( 
	
	'keydown', ( e ) => { if ( e.key === 'Enter' && !e.shiftKey ) { e.preventDefault (  ); btnCreateTask.click (  ); } } 

);

inputList.addEventListener ( 
	
	'keydown', ( e ) => { if ( e.key === 'Enter' ) { btnAddList.click (  ); } } 

);

currentListTitle.addEventListener ( 
	
	'keydown', ( e ) => { if ( e.key === 'Enter' ) { e.preventDefault (  ); currentListTitle.blur (  ); } } 

);

inputGroup.addEventListener (

	'keydown', ( e ) => { if ( e.key === 'Enter' ) { e.preventDefault (  ); btnAddGroup.click (  ); } } 

);