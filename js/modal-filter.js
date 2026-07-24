// Filter Modal Functions
btnCloseFilter.addEventListener ( 
	
	'click', (  ) => {

		modalFilter.style.display = 'none';

	} 

);

btnClearFilter.addEventListener (


	'click', (  ) => {

		btnFilter.classList.remove ( 'selected' );
		includedGroups = [  ];
		renderFilter (  );
		renderTasks (  );

	}

)