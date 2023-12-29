import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';

export const TODO_FEATURE_KEY = 'todo-store';

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export enum TodoPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
  priority?: TodoPriority
}

export interface TodoState {
  todoList: Todo[];
}

export const initialState: TodoState = {
  todoList: []
}

const todoReducer = createReducer(
  initialState,
  on(actions.getTodosSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
  })),
  on(actions.changeTodoName, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map(el => (el.id === todo.id) ? { ...el, name: todo.name } : el)
  })),

  on(actions.removeTodo, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.filter(item => item.id !== todo.id)
  })),

  on(actions.changeTodoStatus, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map(item =>
      item.id === todo.id ? { ...item, status: TodoStatus.Complete } : item
    )
  })),

  on(actions.addTodo, (state, { name }) => ({
    ...state,
    todoList: [...state.todoList, {
      id: new Date().getTime(),
      name,
      status: TodoStatus.InProgress
    }]
  }))
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
