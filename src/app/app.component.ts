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
  todoList: any;
  
  constructor(private commonService: CommonService, private groupByPipe: GroupByPipe) {}
  ngOnInit(): void {
    this.todoList = this.groupByPipe.transform(JSON.parse(this.temptodoList), 'Due');
    this.commonService.onToDoDataChange.subscribe(() => {
      this.temptodoList = localStorage.getItem('todolist');
      this.todoList = this.groupByPipe.transform(JSON.parse(this.temptodoList), 'Due');
    });
  }
  
  ngOnDestroy(): void {
    this.commonService.onToDoDataChange.unsubscribe();
  }
}