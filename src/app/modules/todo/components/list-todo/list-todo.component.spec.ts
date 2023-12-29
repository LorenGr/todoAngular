import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ListTodoComponent } from './list-todo.component';
import { TODO_FEATURE_KEY, Todo, TodoStatus, reducer } from 'src/app/modules/store/todo/todo.reducer';
import { changeTodoName, changeTodoStatus, removeTodo } from 'src/app/modules/store/todo/todo.actions';
import { of } from 'rxjs';

describe('ListTodoComponent', () => {
    let component: ListTodoComponent;
    let fixture: ComponentFixture<ListTodoComponent>;
    let store: Store;
    let dialog: MatDialog;

    let dialogSpy: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {

        dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            declarations: [ListTodoComponent],
            imports: [
                StoreModule.forRoot({}),
                StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
            ],
            providers: [
                { provide: MatDialog, useValue: dialogSpy }
            ]
        }).compileComponents();

        store = TestBed.inject(Store);
        spyOn(store, 'dispatch').and.callThrough();

        dialog = TestBed.inject(MatDialog);

        fixture = TestBed.createComponent(ListTodoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open the dialog and dispatch changeTodoName action on close', () => {
        const todo: Todo = { id: 1, name: 'foo', status: TodoStatus.InProgress };
        const dialogResponse = 'New Todo Name';
        const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(dialogResponse), close: null });
        dialogSpy.open.and.returnValue(dialogRefSpyObj);

        component.editTodo(todo);
        expect(dialogSpy.open).toHaveBeenCalled();

        dialogRefSpyObj.afterClosed().subscribe(() => {
            expect(store.dispatch).toHaveBeenCalledWith(changeTodoName({
                todo: { ...todo, name: dialogResponse }
            }));
        });
    });

    it('should dispatch changeTodoStatus action on [done] button click', () => {
        const mockTodo: Todo = { id: 1, name: 'Test Todo', status: TodoStatus.InProgress };
        component.items = of([mockTodo]);
        fixture.detectChanges();
        const button = fixture.debugElement.nativeElement.querySelector('button[aria-label="Complete"]');
        button.click();
        expect(store.dispatch).toHaveBeenCalledWith(changeTodoStatus({ todo: mockTodo }));
    });

    it('should dispatch removeTodo action on [delete] button click', () => {
        const mockTodo: Todo = { id: 1, name: 'Test Todo', status: TodoStatus.InProgress };
        component.items = of([mockTodo]);
        fixture.detectChanges();
        const button = fixture.debugElement.nativeElement.querySelector('button[aria-label="Delete"]');
        button.click();
        expect(store.dispatch).toHaveBeenCalledWith(removeTodo({ todo: mockTodo }));
    });

});
