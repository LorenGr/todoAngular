import { Component, OnInit } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { getTodos, addTodo, changeTodoName } from '../store/todo/todo.actions';
import { select, Store } from '@ngrx/store';
import { getAllTodos, selectElementsByStatus } from '../store/todo/todo.selectors';
import { TodoStatus, Todo } from '../store/todo/todo.reducer';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  statusEnum = TodoStatus;

  newTodo = new FormControl('', [Validators.required]);
  selectedIndex = 0;

  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));

  completeTodos$: Observable<Todo[]> = this.store.pipe(select(selectElementsByStatus(TodoStatus.Complete)));
  inprogressTodos$: Observable<Todo[]> = this.store.pipe(select(selectElementsByStatus(TodoStatus.InProgress)));


  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  addNewTodo() {
    if (!this.newTodo.value) return;
    this.store.dispatch(addTodo({ name: this.newTodo.value }))
  }

  changeTodoName(todo: Todo) {
    this.store.dispatch(changeTodoName({ todo }))
  }

  onTodoStatusChange(todo: Todo) {
    if (todo.status === TodoStatus.InProgress) {
      this.selectedIndex = 2;
    }
  }

}
