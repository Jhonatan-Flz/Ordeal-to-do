# Ordeal To Do

Ordeal To Do is a browser-based task manager built with plain HTML, CSS, and JavaScript. It is designed as a traditional to-do list, but with a more game-like idea behind it: tasks are meant to feel more meaningful by tying them to social points, future calendar tools, friends, reminders, and task organization systems.

At the moment, the project focuses on the core task management loop. You can create lists, add tasks inside each list, mark tasks as done, and remove tasks when needed. The interface also includes placeholders for features that are planned for later, such as calendar integration, task ordering, filtering, task grouping, social interactions, account management, and a points-based system.

## Features currently implemented

- Create multiple task lists.
- Select one list at a time and work inside it.
- Add tasks to the selected list.
- Mark tasks as completed by clicking the circular indicator.
- Remove the selected task.
- Delete entire lists.
- Date assignment for tasks.
- Group assigment for tasks.
- Method to remove the group of a task.

## Planned features

The codebase and UI already suggest several planned features that are not implemented yet:

### Core task & list polish
- Drag-and-drop reordering of tasks, lists and groups
- Tasks automatically move to a separate area when checked and return to the main list when unchecked.
- Task filtering by user added groups/categories.
- Task ordering by alphabetic order or due date.

### Dates & time
- Custom date and time interfaces using Flatpickr.
- Reminders with date and time.
- Repeating tasks that can reset automatically after completion.
- Task details fully editable with reminders and repeating options.

### Cross-cutting polish
- Full responsive design and basic customization.
- A complete keyboard shortcuts list.
- Custom context menu (right-click menu)

### Accounts & social foundation
- Account administration. 
- Friend management and social challenge mechanics.

### Social features
- Task assignment to friends or contacts with adjustable points.
- Social points earning system managed by AI, for now is just a display.
- Social points economy with rewards, penalties, and future shop-like advantages.
- Chat panel for choosing between friends or an AI assistant.
- Functional calendar with categories and shared events.

## Project structure

```text
Ordeal-ToDo/
├── index.html
├── style.css
├── js/
│   ├── elements.js
│   ├── state.js
│   ├── utility.js
│   ├── render.js
│   ├── listeners.js
│   ├── lists.js
│   ├── modalGroup.js
│   ├── modalDate.js
│   ├── shortcuts.js
│   └── app.js
└── assets/
    ├── icons/
    └── illustrations/
```

## Tech stack

- HTML5 for structure.
- CSS3 for layout, cards, spacing, and interaction states.
- Vanilla JavaScript for DOM manipulation and application logic.

## How it works

The application is organized into three main areas:

The left panel is the sidebar. It contains the list board, the input for creating new lists, and the button that switches between the to-do layout and the calendar placeholder.

The center panel is the main task board. It shows the tasks for the currently selected list, along with buttons for ordering and filtering. It also displays the current social points value.

The right panel is the task details area. It contains controls for creating and removing tasks, buttons for grouping and assigning dates, a text field for the task title, a larger field for task details, and buttons for assigning tasks or reminders.

The JavaScript logic is entirely DOM-based. Lists and tasks are created dynamically in the browser, and the selected list controls which task container is visible. Task completion is handled by toggling a class on the task element, and deletion is done directly from the active selection.

## Running the project

This is a front-end project with no build step.

1. Clone or download the repository.
2. Open `index.html` in your browser, or serve the folder with a local development server.
3. Make sure `style.css` and `js/` remain in the same directory as `index.html`.

## Notes

The interface uses a minimal card-based layout and a light visual style. The current version is intentionally simple so the core behavior can be expanded later without rebuilding the whole project.

The project is meant to evolve into a more distinctive productivity app with game-like and social elements, rather than a standard task list.

## Contributing

Contributions are welcome, especially for:

- responsive layout improvements,
- calendar implementation,
- task editing,
- social points logic,
- UI icons and visual polish.