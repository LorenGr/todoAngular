import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { Store, StoreModule } from '@ngrx/store';
import { TODO_FEATURE_KEY, reducer } from '../store/todo/todo.reducer';
import { MatDialog } from '@angular/material/dialog';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: Store;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
      .compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
