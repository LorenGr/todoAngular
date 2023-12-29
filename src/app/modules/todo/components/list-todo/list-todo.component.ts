import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { changeTodoName, changeTodoStatus, removeTodo } from "src/app/modules/store/todo/todo.actions";
import { Todo, TodoStatus } from "src/app/modules/store/todo/todo.reducer";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";

@Component({
    selector: 'app-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent {
    @Input() items!: Observable<Todo[]>;
    @Input() showDoneButton: boolean = true;
    @Output() todoStatusChanged = new EventEmitter<Todo>();

    constructor(
        private store: Store,
        public dialog: MatDialog
    ) { }

    changeTodoStatus(todo: Todo) {
        this.store.dispatch(changeTodoStatus({ todo }));
        this.todoStatusChanged.emit(todo);
    }

    removeTodo(todo: Todo) {
        this.store.dispatch(removeTodo({ todo }))
    }
    isInProgress(todo: Todo) {
        return todo.status == TodoStatus.InProgress
    }

    editTodo(todo: Todo) {
        const dialogRef = this.dialog.open(EditTodoDialogComponent, {
            data: todo.name
        });

        dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(changeTodoName({
                todo: {
                    ...todo,
                    name: result
                }
            }))
        });
    }
}