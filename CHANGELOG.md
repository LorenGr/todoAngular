# Changelog

## [Unreleased]

### Added
- Reducers for various actions:
  - Renaming todos.
  - Changing the status of todos.
  - Deletion of todos.
- Selector to select a todo item by its status.
- `app-list-todo` component:
  - Event `todoStatusChanged` callback added to the component.
- Auto-navigation feature to the Completed tab upon changing the status of a todo.

### Changed
- Updated tests to ensure all are now passing.

### Fixed
- Issue in `index.html` where file reques was causing error.
- Tab Status lists are now correctly filtered by the status of the todos.
