import { Component } from '@angular/core';
import { GroupByPipe } from 'ngx-pipes';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GroupByPipe]
})
export class AppComponent {
  title = 'to-do-app';
  temptodoList: any = localStorage.getItem('todolist') || '[]';
  todoList = JSON.parse(this.temptodoList);
  
  constructor(private commonService: CommonService, private groupByPipe: GroupByPipe) {}
  ngOnInit(): void {
    console.log(this.groupByPipe.transform(this.todoList, 'Due'));
    this.commonService.onToDoDataChange.subscribe(() => {
      this.temptodoList = localStorage.getItem('todolist');
      this.todoList = JSON.parse(this.temptodoList);
    });
  }
  
  ngOnDestroy(): void {
    this.commonService.onToDoDataChange.unsubscribe();
  }
}