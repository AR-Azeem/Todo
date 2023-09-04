import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoName:string=""
  dataStatus:string="Add"
  catId:string=""
  todoId:string=""
  todoData:Array<any>;

  constructor(private todoService:TodoService,private activatedRoute:ActivatedRoute){}
  
  ngOnInit(){
    this.catId=this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.catId)
    this.todoService.loadTodoData(this.catId).subscribe(data=>{
      this.todoData=data;
    })
  }

  onSubmit(form:NgForm){
    if(this.dataStatus == "Add"){
      let todoList = {
        todo:form.value.todoName,
        isCompleted:false
      }
      this.todoService.saveTodo(todoList,this.catId);
    }
    else{
      this.todoService.updateToDoData(this.catId,this.todoId,this.todoName);
    }
    form.resetForm();
    this.dataStatus ="Add"
  }
  onEdit(todoName,todoId){
    this.todoName=todoName;
    this.dataStatus = "Edit";
    this.todoId =todoId
  }

  onDelete(todoId){
    this.todoService.deleteTodo(this.catId,todoId);
  }

  OnMarkComplete(todoId){
    this.todoService.updateToDoDataMarkComplete(this.catId,todoId,true);
  }

  OnMarkInComplete(todoId){
    this.todoService.updateToDoDataMarkComplete(this.catId,todoId,false);
  }
}
