// Local Storage
// 	state shape:
//   lists:  [{ id, title, tasks: [{ id, title, description, isDone, groupId, dueDate }] }]
//   groups: [{ id, name }]
//   activeListId: id of the list open in the center panel, or null
//   activeTaskId: id of the task loaded in the right-hand editor, or null
let state;
try {
	
	state = JSON.parse ( localStorage.getItem ( 'ordealData' ) ) || {

		lists: [  ],
		groups: [  ],
		activeListId: null,
		activeTaskId: null
	
	};

} catch ( e ) {
    
	console.error ( 'Saved data was corrupted, starting fresh.', e );
	state = {
		
		lists: [  ],
		groups: [  ],
		activeListId: null,
		activeTaskId: null
    
	};

}