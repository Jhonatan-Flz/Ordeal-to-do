// General purpose functions
function saveData (  ) { localStorage.setItem ( 'ordealData', JSON.stringify ( state ) ); }

function generateId (  ) { return Date.now (  ).toString ( 36 ) + Math.random (  ).toString ( 36 ).substring ( 2 ); }

function renderAll (  ) { renderLists (  ); renderTasks (  ); renderDetails (  ); }

// Dragg and drop functions
function reorderById ( items, draggedId, targetId, callback ) {

	const fromIndex = items.findIndex ( item => item.id === draggedId );
	const toIndex = items.findIndex ( item => item.id === targetId );
	
	// findIndex returns -1 if the element is not found
	if ( fromIndex === -1 || toIndex === -1 || fromIndex === toIndex ) { return; }

	const [ movedItem ] = items.splice ( fromIndex, 1 );
	items.splice ( toIndex, 0, movedItem );

	saveData (  );
	callback (  );

}

function attachDragEvents ( element, id, type, items, render ) {

	// We make the element draggable onto another, regardless of its type
	element.draggable = true;

	// Also, a counter so drag isnt interrupted because of child elements 
	let dragCounter = 0;

	// Creating a blank image to hide the default drag ghost image
	const emptyImage = new Image (  ); emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	
	element.addEventListener ( 
		
		'dragstart', ( e ) => { 
		
			e.dataTransfer.setDragImage ( emptyImage, 0, 0 );
			dragData.type = type; 
			dragData.id = id; 
			e.dataTransfer.setData ( 'text/plain', '' ); 
		
		} 
	
	);
	
	element.addEventListener ( 
		
		'dragover', ( e ) => { 
			
			e.preventDefault (  ); 
		
		} 
	
	);
	
	element.addEventListener ( 
		
		'dragenter', (  ) => { 
			
			dragCounter++;
			element.classList.add ( 'drag-over' ); 
		
		} 
	
	);
	
	element.addEventListener ( 
		
		'dragleave', (  ) => { 
			
			dragCounter--;

			if ( dragCounter <= 0 ) {

				dragCounter = 0;
				element.classList.remove ( 'drag-over' );

			}
		
		} 
	
	);
	
	element.addEventListener ( 
		
		'dragend', (  ) => { 
			
			dragCounter = 0;
			element.classList.remove ( 'drag-over' ); 
			dragData.type = null; 
			dragData.id = null; 
		
		} 
	
	);
	
	element.addEventListener ( 
		
		'drop', ( e ) => { 
			
			e.preventDefault (  );
			dragCounter = 0;
			element.classList.remove ( 'drag-over' );
			if ( dragData.id && dragData.id !== id ) { reorderById ( items, dragData.id, id, render ); }
		
		} 
	
	);

}