import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() todoData: any;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}

  onToDoEdit(): void {
    this.commonService.todoEdit.emit(this.todoData);
  }

  onToDoDelete(): void {
    let todoList: any = localStorage.getItem('todolist') || '[]';
    todoList = JSON.parse(todoList);
    todoList.forEach((todoData: any, index: number) => {
      if (todoData.Id == this.todoData.Id) {
        todoList.splice(index, 1);
      }
    });
    localStorage.setItem('todolist', JSON.stringify(todoList));
    this.commonService.onToDoDataChange.emit();
  }
  
  onStatusChange(Status: string): void {
    let todoList: any = localStorage.getItem('todolist') || '[]';
    todoList = JSON.parse(todoList);
    todoList.forEach((todoData: any, index: number) => {
      if (todoData.Id == this.todoData.Id) {
        todoList[index].Status = Status;
      }
    });
    localStorage.setItem('todolist', JSON.stringify(todoList));
    this.commonService.onToDoDataChange.emit();
  }
}
