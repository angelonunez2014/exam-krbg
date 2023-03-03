import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodoItem } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  endpointUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTodoItems<T = ITodoItem[]>(): Observable<T> {
    return this.http.get<T>(`${this.endpointUrl}/tasks`);
  }

  getTodoItem<T = ITodoItem>(todoId: number): Observable<T> {
    return this.http.get<T>(`${this.endpointUrl}/tasks/${todoId}`);
  }

  addTodoItem<T = boolean>(payload: ITodoItem): Observable<T> {
    return this.http.post<T>(`${this.endpointUrl}/tasks`, payload);
  }

  patchTodoItem<T = ITodoItem>( todoId: number, payload: ITodoItem ): Observable<T> {
    return this.http.patch<T>(`${this.endpointUrl}/tasks/${todoId}`, payload);
  }

  deleteTodoItem<T = ITodoItem>( todoId: number ): Observable<T> {
    return this.http.delete<T>(`${this.endpointUrl}/tasks/${todoId}`);
  }
}
