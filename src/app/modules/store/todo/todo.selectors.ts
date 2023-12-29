import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, TODO_FEATURE_KEY, TodoStatus } from './todo.reducer';

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const getAllTodos = createSelector(getTodoState, (state) => state.todoList);

// Selector factory function for filtering elements by status
export const selectElementsByStatus = (status: TodoStatus) => createSelector(
    getAllTodos,
    (elements: any[]) => elements.filter(element => element.status === status)
);
