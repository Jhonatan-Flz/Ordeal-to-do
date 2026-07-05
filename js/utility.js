// Utility Functions
function saveData (  ) { localStorage.setItem ( 'ordealData', JSON.stringify ( state ) ); }
function generateId (  ) { return Date.now (  ).toString ( 36 ) + Math.random (  ).toString ( 36 ).substring ( 2 ); }
function renderAll (  ) {

	renderLists (  );
	renderTasks (  );
	renderDetails (  );

}
