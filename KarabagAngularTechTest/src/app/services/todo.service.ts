import { TodoApiService } from './todo-api.service';
import { ITodoItem } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject,Observable, filter, map, take, tap, withLatestFrom, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  items$: ReplaySubject<ITodoItem[]> = new ReplaySubject();
  editingItems: any[] = [];

  details$: BehaviorSubject<{ [key: number]: ITodoItem }> = new BehaviorSubject({});

  constructor(private api: TodoApiService) {}

  setAsEditing(itemId: number | number): void {
    this.editingItems = this.editingItems.concat([itemId]);
  }

  cancelEditing(itemId: number): void {
    const arr = this.editingItems.filter((item) => item != itemId);
    this.editingItems = arr;
  }

  get todoItems$(): Observable<ITodoItem[]> {
    return this.items$.pipe(
      map((todos) => todos.filter((todo) => todo.done == false))
    );
  }

  get completedItems$(): Observable<ITodoItem[]> {
    return this.items$.pipe(
      map((todos) => todos.filter((todo) => todo.done == true))
    );
  }

  loadItems() {
    this.api.getTodoItems().pipe(take(1), tap(results => {
      this.items$.next(results);
      console.log(results);
    })).subscribe();
  }

  deleteItem(todoId: number) {
    this.api.deleteTodoItem(todoId).pipe(take(1), tap(results => {
      this.loadItems();
    })).subscribe();
  }

  patchItem(id: number ,payload: ITodoItem) {
    this.api.patchTodoItem(id, payload).pipe(take(1), tap(results => {
      this.loadItems();
    })).subscribe();
  }

  getInfo(todoId: number) {
    this.details$.pipe(
      tap(details => {
        console.log({details})
      if (details[todoId]) {
        // data is already loaded, dont call the api anymore
      } else {
        this.getTodo(todoId);
      }
    })).subscribe();
  }

  private getTodo(id: number) {
    this.api.getTodoItem(id).pipe(take(1),
    withLatestFrom(this.details$.pipe(startWith({}))),
    tap(([todo, list]) => {
      const updated = {
        ...list,
        [<number>todo.id]: todo
      }
      this.details$.next(updated);
      console.log(updated);
    })).subscribe();
  }
}
