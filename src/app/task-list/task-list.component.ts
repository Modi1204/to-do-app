import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() todoDataArray: any;
  @Input() todoDataCurrentDate: any;
  currentDay: any;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.currentDay =  weekday[new Date(this.todoDataCurrentDate).getDay()];
  }

  onToDoEdit(todoData: any): void {
    this.commonService.todoEdit.emit(todoData);
  }

  onToDoDelete(todoData: any): void {
    let todoList: any = localStorage.getItem('todolist') || '[]';
    todoList = JSON.parse(todoList);
    todoList.forEach((todoDetail: any, index: number) => {
      if (todoDetail.Id == todoData.Id) {
        todoList.splice(index, 1);
      }
    });
    localStorage.setItem('todolist', JSON.stringify(todoList));
    this.commonService.onToDoDataChange.emit();
  }
  
  onStatusChange(todoData: any): void {
    let todoList: any = localStorage.getItem('todolist') || '[]';
    todoList = JSON.parse(todoList);
    todoList.forEach((todoDetail: any, index: number) => {
      if (todoDetail.Id == todoData.Id) {
        todoList[index].Status = todoData.Status == 'Completed' ? 'Pending' : 'Completed';
      }
    });
    localStorage.setItem('todolist', JSON.stringify(todoList));
    this.commonService.onToDoDataChange.emit();
  }
}
