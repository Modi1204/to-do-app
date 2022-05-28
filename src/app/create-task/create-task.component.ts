import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  todoForm: any;
  minDate: Date = new Date(2021, 10, 1);
  maxDate: Date = new Date(2021, 10, 7);
  constructor(private fb: FormBuilder, private commonService: CommonService) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      Id: ['', []],
      TaskName: ['', [Validators.required, Validators.maxLength(20)]],
      Description: ['', [Validators.required, Validators.maxLength(50)]],
      Due: ['', [Validators.required]],
      Status: ['Pending', []],
    });
    this.commonService.todoEdit.subscribe((todoData) => {
      this.todoForm.patchValue(todoData);
    });
  }

  onSubmit(): void {
    let todoList: any = localStorage.getItem('todolist') || '[]';
    todoList = JSON.parse(todoList);
    if (!!this.todoForm.value.Id) {
      todoList.forEach((todoData: any, index: number) => {
        if(todoData.Id == this.todoForm.value.Id) {
          todoList[index] = this.todoForm.value;
        }
      });
    } else {
      this.todoForm.patchValue({ Id: new Date().getTime() });
      todoList.push(this.todoForm.value);
    }
    localStorage.setItem('todolist', JSON.stringify(todoList));
    this.todoForm.reset();
    this.todoForm.patchValue({Status: 'Pending'});
    this.commonService.onToDoDataChange.emit();
  }
  ngOnDestroy(): void {
    this.commonService.todoEdit.unsubscribe();
  }
}
