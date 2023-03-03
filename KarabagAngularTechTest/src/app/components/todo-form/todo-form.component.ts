import { TodoApiService } from './../../services/todo-api.service';
import { TodoService } from './../../services/todo.service';
import { ITodoItem } from './../../models/todo.model';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { tap, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges {
  @Input() todoItem: ITodoItem | null = null;
  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  form = new FormGroup({
    label: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    category: new FormControl(""),
  })

  ngOnChanges(changes: any) {
    const { label, description, category } = <ITodoItem>this.todoItem;
    this.form.patchValue({
      label,
      description,
      category
    });
  }

  constructor(private todo: TodoService, private api: TodoApiService, private toastr: ToastrService) {
  }

  cancel(todoId: any) {
    this.todo.cancelEditing(todoId);
    this.closeForm.emit(true);
  }

  submit(){
    const form = this.form.getRawValue();

    // POST = [id=0]; else PATCH
    if (this.todoItem?.id == 0) {
      //create new todo item
      const payload = {
        id: new Date().getTime(), // generate unique id
        done: false,
        endDate: new Date().toISOString(),
        ...form,
      }
      this.api.addTodoItem(<any>payload).pipe(tap(result => {
        this.closeForm.emit(true);
        this.toastr.success('Item successfully added!', "", {
          timeOut: 1000,
        });
        this.todo.loadItems();
      })).subscribe();
    } else {

      // update values from reactive form
      const payload = {
        ...this.todoItem,
        ...form,
      }
      this.api.patchTodoItem(<number>this.todoItem?.id, <any>payload).pipe(tap(result => {
        this.closeForm.emit(true);
        this.toastr.success('Item successfully updated!', "", {
          timeOut: 1000,
        });
        this.todo.loadItems();
        this.todo.cancelEditing(<number>this.todoItem?.id);
      })).subscribe();
    }
  }
}
