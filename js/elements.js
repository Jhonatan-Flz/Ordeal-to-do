// Variables
const sidebarView = document.querySelector ( '.sidebar.card' );
const mainView = document.querySelector ( '.main.card' );
const detailsView = document.querySelector ( '.details.card' );

const inputList = document.getElementById ( 'input-list' );
const btnAddList = document.getElementById ( 'add-list' );
const boardList = document.getElementById ( 'board-list' );
const currentListTitle = document.getElementById ( 'current-list-title' );

const btnCreateTask = document.getElementById ( 'create' );
const btnRemoveTask = document.getElementById ( 'remove' );
const boardTask = document.getElementById ( 'board-task' );
const taskTitleInput = document.getElementById ( 'title-task' );
const detailTaskInput = document.getElementById ( 'detail-task' );

// Group modal variables
const btnGroup = document.getElementById ( 'group' );
const modalGroup = document.getElementById ( 'modal-group' );
const btnCloseGroup = document.getElementById ( 'close-group' );
const inputGroup = document.getElementById ( 'input-group' );
const btnAddGroup = document.getElementById ( 'add-group' );
const boardGroup = document.getElementById ( 'board-group' );

// Date modal variables
const btnDate = document.getElementById ( 'date' );
const modalDate = document.getElementById ( 'modal-date' );
const btnCloseDate = document.getElementById ( 'close-date' );
const inputDate = document.getElementById ( 'input-date' );
const btnSaveDate = document.getElementById ( 'save-date' );
const btnClearDate = document.getElementById ( 'clear-date' );

// Filter modal variables
const btnFilter = document.getElementById ( 'filter' );
const modalFilter = document.getElementById ( 'modal-filter' );
const btnCloseFilter = document.getElementById ( 'close-filter' );
const boardFilter = document.getElementById ( 'board-filter' );

// Sort modal variables
const btnSort = document.getElementById ( 'sort' );

// Reminder modal variables
const btnReminder = document.getElementById ( 'reminder' );

// Repeat modal variables
const btnRepeat = document.getElementById ( 'repeat' );

// Temporary variables to hold group and date for new tasks
let tempGroupId = null;
let tempDueDate = null;