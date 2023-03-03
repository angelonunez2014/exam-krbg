import { ITodoItem } from './../../models/todo.model';
import { TodoService } from './../../services/todo.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-completed-items',
  templateUrl: './completed-items.component.html',
  styleUrls: ['./completed-items.component.scss'],
})
export class CompletedItemsComponent {
  completed$: Observable<ITodoItem[]> = this.todo.completedItems$;

  constructor(private todo: TodoService) {}
}
