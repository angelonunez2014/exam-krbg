import { ITodoItem } from './../../models/todo.model';
import { TodoService } from './../../services/todo.service';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl} from '@angular/forms'
import {tap, distinctUntilChanged, startWith, map, of, Observable, combineLatest} from 'rxjs'

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss'],
})
export class TodoItemsComponent{
  todos$: Observable<ITodoItem[]> = this.todo.todoItems$ as Observable<ITodoItem[]>;
  search: FormControl = new FormControl('');
  details$ = this.todo.details$;

  filtered$: Observable<ITodoItem[]> = combineLatest([
    this.search.valueChanges.pipe( startWith(''), distinctUntilChanged()),
    this.todos$
  ]).pipe(map(([search, todos])=> {
    const tcase = search?.toLowerCase();
    if (!tcase) return todos;

    return todos.filter((t) => t.label?.toLowerCase().includes(tcase));
  }));

  constructor(public todo: TodoService) {
    this.search.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((value) => {
          console.log({ value });
        })
      )
      .subscribe();
  }

  editItem(itemId: any) {
    this.todo.setAsEditing(itemId);
    console.log(this.todo.editingItems);
  }

  clear(){
    this.search.patchValue("")
  }

  checked(evt: any, item: ITodoItem) {
    console.log({value: evt.target.checked})
    const payload = {
      ...item,
      done: true
    }
    this.todo.patchItem(<number>item.id, payload);
  }

  deleteItem(todoId: number | undefined ) {
    this.todo.deleteItem(<number>todoId);
  }

  getDetails(todoId: number | undefined) {
    console.log({todoId})
    this.todo.getInfo(<number>todoId);
  }
}
