import { distinctUntilChanged, take, tap, Observable, map } from 'rxjs';
import { TodoApiService } from './../../services/todo-api.service';
import { ITodoItem } from './../../models/todo.model';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  showCreateForm: boolean = false;
  todoTemp: ITodoItem = {
    id: 0,
    label: '',
    description: '',
  };
  constructor(private todo: TodoService, private api: TodoApiService) {}

  ngOnInit(): void {
    this.todo.loadItems();
  }

  get completedCount$(): Observable<number> {
    return this.todo.completedItems$.pipe(map(items => items?.length));
  }

  get todoCount$(): Observable<number> {
    return this.todo.todoItems$.pipe(map(items => items?.length));
  }

  showForm() {
    this.showCreateForm = true;
  }

  hideForm() {
    this.showCreateForm = false;
  }
}
