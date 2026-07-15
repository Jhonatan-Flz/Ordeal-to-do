// Utility Functions
function saveData (  ) { localStorage.setItem ( 'ordealData', JSON.stringify ( state ) ); }

function generateId (  ) { return Date.now (  ).toString ( 36 ) + Math.random (  ).toString ( 36 ).substring ( 2 ); }

function reorderById ( items, draggedId, targetId, callback ) {

	const fromIndex = items.findIndex ( item => item.id === draggedId );
	const toIndex = items.findIndex ( item => item.id === targetId );

	if ( fromIndex === -1 || toIndex === -1 || fromIndex === toIndex ) { return; }

	const [ movedItem ] = items.splice ( fromIndex, 1 );
	items.splice ( toIndex, 0, movedItem );

	saveData (  );
	callback (  );

}

function attachDragEvents ( element, id, type, items, render ) {

	element.draggable = true;
	element.addEventListener ( 'dragstart', ( e ) => { dragData.type = type; dragData.id = id; e.dataTransfer.setData ( 'text/plain', '' ); } );
	element.addEventListener ( 'dragover', ( e ) => { if ( dragData.type !== type ) { return; } e.preventDefault (  ); } );
	element.addEventListener ( 'dragenter', (  ) => { if ( dragData.type !== type ) { return; } element.classList.add ( 'drag-over' ); } );
	element.addEventListener ( 'dragleave', (  ) => { element.classList.remove ( 'drag-over' ); } );
	element.addEventListener ( 'dragend', (  ) => { element.classList.remove ( 'drag-over' ); dragData.type = null; dragData.id = null; } );
	element.addEventListener ( 'drop', ( e ) => { if ( dragData.type !== type ) { return; } reorderById ( items, dragData.id, id, render ); } );

}

function renderAll (  ) {

	renderLists (  );
	renderTasks (  );
	renderDetails (  );

}