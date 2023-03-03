import {  HttpClientModule } from '@angular/common/http';
import { TodoFormComponent } from './../../components/todo-form/todo-form.component';
import { CompletedItemsComponent } from './../../components/completed-items/completed-items.component';
import { TodoItemsComponent } from './../../components/todo-items/todo-items.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoItemsComponent,
    CompletedItemsComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}
